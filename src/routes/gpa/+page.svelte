<script lang="ts">
  import { persisted } from "svelte-persisted-store";
  import { Input } from "$lib/components/ui/input";
  import { Button } from "$lib/components/ui/button";
  import * as Select from "$lib/components/ui/select";
  import { fade } from "svelte/transition";
  import { toast } from "svelte-sonner";
  import autoAnimate from "@formkit/auto-animate";
  import CopyText from "$lib/components/CopyText.svelte";

  // Utility function to convert Arabic-Indic digits to Latin digits (with trimming)
  function convertArabicToLatinDigits(arabicNumber: string) {
    return arabicNumber
      .trim()
      .replace(/[٠١٢٣٤٥٦٧٨٩]/g, (d: string) => "٠١٢٣٤٥٦٧٨٩".indexOf(d).toString())
      .replace(/٫/g, ".")  // Replace Arabic decimal separator with "."
      .replace(/،/g, ".") // Replace Arabic decimal separator with "."
      .replace(/,/g, "."); // Replace Arabic decimal separator with "."
  }

  // Use parseFloat to capture any decimals (after trimming)
  function parseArabicFloat(arabicNumber: string) {
    const latinNumber = convertArabicToLatinDigits(arabicNumber);
    return parseFloat(latinNumber);
  }

  const grades = {
    "A+": 4.0,
    "A": 3.75,
    "B+": 3.5,
    "B": 3.0,
    "C+": 2.5,
    "C": 2.0,
    "D+": 1.5,
    "D": 1.0,
    "F": 0.0
  };

  const marks = {
    95: "A+",
    90: "A",
    85: "B+",
    80: "B",
    75: "C+",
    70: "C",
    65: "D+",
    60: "D",
    0: "F"
  };

  interface Course {
    name?: string;
    grade?: {
      disabled?: boolean;
      label: string;
      value: string;
    };
    credits?: string;
  }

  const courses = persisted<Course[]>("courses", [
    {}
  ]);

  let gpa: number = 0;
  let approximateGpa: number = 0;
  let totalCredits: number = 0;
  let totalWeightedGrade: number = 0;
  // Calculate weighted GPA using floating-point parsing for credits
  $: {
    totalCredits = 0;
    totalWeightedGrade = 0;
    for (const course of $courses) {
      if (course.grade && course.grade.value && course.credits) {
        // Use parseArabicFloat to handle potential decimals and extra spaces
        const credits = parseArabicFloat(course.credits);
        totalCredits += credits;
        const grade = course.grade.value as keyof typeof grades;
        totalWeightedGrade += grades[grade] * credits;
      }
    }

    // Use toFixed to round the result to 2 decimal places
    gpa = Number((totalWeightedGrade / totalCredits).toFixed(5));
    approximateGpa = Number((totalWeightedGrade / totalCredits).toFixed(2));
  }

  const chatGptPrompt = `You are given a student's academic history, which includes details about the courses they have taken, the number of credits for each course, and the grades they received. Your task is to convert this information into JSON data that strictly follows the structure below:

{
  "courses": [
    {
      "name": "Course Name",
      "credits": "Course Credits",
      "grade": {
        "value": "Grade Value",
      }
    },
    ...
  ]
}

Requirements:

Each course should be represented as an object within the "courses" array.
The first course must be the latest course taken by the student.
The last course must be the earliest course taken by the student.
For every course:
name: Use the first two words in Arabic and the course order (e.g., "برمجة 1", برمجة 2")
credits: Use the credit value of the course as a string.
grade: Represent the grade as an object with:
value: The grade received (e.g., "A+", "A", "B+", "B", "C+", "C", "D+", "D", "F"). If the course doesn't have a grade received, you should skip it entirely.
Do not include any additional keys or fields.
Output must be valid JSON.`;
</script>


<svelte:head>
  <title>
    حاسبة المعدل لأم القرى
  </title>
</svelte:head>

<div class="container max-w-screen-md mb-8">
  <main class="flex flex-col gap-4">
    <h1 class="mb-8">
      حاسبة المعدل لأم القرى
    </h1>
    <h3 use:autoAnimate>
      {#if (gpa)}
        <ul class="list-none list-inside w-full">
          <li class="flex justify-between border-b-[1px]">
            <span>
              معدلك الحقيقي:
            </span>
            <span>
              {gpa}
            </span>
          </li>
          <li class="flex justify-between border-b-[1px]">
            <span>
              معدلك التقريبي:
            </span>
            <span>
              {approximateGpa}
            </span>
          </li>
          <li class="flex justify-between border-b-[1px]">
            <span>
              الساعات المجتازة:
            </span>
            <span>
              {totalCredits}
            </span>
          </li>
          <li class="flex justify-between">
            <span>
              إجمالي النقاط:
            </span>
            <span>
              {totalWeightedGrade}
            </span>
          </li>
        </ul>
      {:else}
        <span>
          املأ البيانات لحساب المعدل
        </span>
      {/if}
    </h3>
    <hr />
    <Button class="w-full" variant="outline3DFilled"
            on:click={() => $courses = [{ }, ...$courses]}>
      إضافة مقرر
    </Button>
    <main class="flex flex-col gap-2" use:autoAnimate>
      {#each $courses as course (course)}
        <div class="flex">
          <Button class="w-fit rounded-e-none" variant="destructive3D"
                  on:click={() => $courses = $courses.filter(c => c !== course)}>
            حذف
          </Button>
          <Input class="w-full rounded-e-none rounded-s-none border-e-0 border-s-0" bind:value={course.name}
                 placeholder="اسم المقرر" />
          <Input class="w-fit min-w-0 rounded-s-none rounded-e-none" bind:value={course.credits}
                 placeholder="الساعات" />
          <Select.Root
            selected={course.grade}
            onSelectedChange={grade => course.grade = grade}
          >
            <Select.Trigger class="w-fit min-w-18 rounded-s-none border-s-0">
              <Select.Value placeholder="التقدير" />
            </Select.Trigger>
            <Select.Content>
              {#each Object.keys(grades) as grade (grade)}
                <Select.Item value={grade}>{grade}</Select.Item>
              {/each}
            </Select.Content>
          </Select.Root>
        </div>
      {/each}
    </main>
    <!--    export/import courses -->
    <div class="flex flex-col gap-2">
      <p>
        يمكنك تصدير واستيراد البيانات لنقلها بين الأجهزة أو الاحتفاظ بها، هذه الخاصية منفصلة عن الحفظ التلقائي
      </p>
      <div class="flex gap-4">
        <Button class="w-full" variant="outline3D"
                on:click={() => {
                  const data = {
                      courses: $courses,
                  };
                  navigator.clipboard.writeText(JSON.stringify(data));
                  toast.success("تم نسخ البيانات للحافظة");
              }}>
          تصدير البيانات
        </Button>
        <Button class="w-full" variant="outline3D"
                on:click={() => {
                  navigator.clipboard.readText().then(text => {
                      try {
                          const data = JSON.parse(text);

                          // copy the courses grade value to the label
                          data.courses.forEach((course) => {
                              if (course.grade && course.grade.value) {
                                  course.grade['label'] = course.grade.value;
                                  course.grade['disabled'] = false;
                              }
                          });

                          $courses = data.courses;
                          toast.success("تم استيراد البيانات بنجاح");
                      } catch (e) {
                          console.error(e);
                          toast.error("خطأ في استيراد البيانات");
                      }
                  });
              }}>
          استيراد البيانات
        </Button>
      </div>
    </div>
    <div class="bg-primary/70 w-full p-4 rounded">
      <h4>
        معلومة 1: إدخال كل المقررات لجميع الفصول الدراسية يعطيك نتيجة أدق
      </h4>
      <hr class="my-2" />
      <h4>
        معلومة 2: تقدر تستعمل
        <Button variant="link" class="text-primary-foreground text-base w-fit h-fit p-0 m-0" href="https://chatgpt.com/">ChatGPT
        </Button>
        لتسهيل حساب المعدل
      </h4>
      <ol class="list-decimal list-inside">
        <li>
          ادخل موقع الجامعة > بوابتي الأكاديمية > شخصي > الوثائق > السجل الأكاديمي
        </li>
        <li>
          ارفع الملف (او الصق كل محتوياته كنص) ل ChatGPT وقوله:
          <CopyText variant="default" class="text-primary bg-primary-foreground/80 hover:bg-primary-foreground" copyText={chatGptPrompt} />
        </li>
        <li>
          انسخ كود البيانات من ChatGPT واضغط على استيراد البيانات هنا
        </li>
      </ol>
    </div>
  </main>
</div>
