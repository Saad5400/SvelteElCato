<script lang="ts">
  import { persisted } from "svelte-persisted-store";
  import { Input } from "$lib/components/ui/input";
  import { Button } from "$lib/components/ui/button";
  import * as Select from "$lib/components/ui/select";
  import { fade } from "svelte/transition";
  import { toast } from "svelte-sonner";
  import autoAnimate from "@formkit/auto-animate";

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
  // Calculate weighted GPA using floating-point parsing for credits
  $: {
    let totalCredits = 0;
    let totalWeightedGrade = 0;
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
    gpa = Number((totalWeightedGrade / totalCredits).toFixed(2));
  }
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
    <h2 use:autoAnimate>
      معدلك:
      {#if (gpa)}
        <span>
          {gpa} / 4
        </span>
      {:else}
        <span>
          املأ البيانات لحساب المعدل
        </span>
      {/if}
    </h2>
    <hr />
    <div class="bg-primary w-full p-4 rounded">
      <h4>
        ميزة تجريبية: ارفع السجل الأكاديمي وسيتم ملء البيانات تلقائيا
      </h4>
      <Input type="file" accept=".pdf" />
    </div>
    <Button class="w-full" variant="outline3DFilled"
            on:click={() => $courses = [...$courses, { }]}>
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
              {#each Object.keys(grades) as grade}
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
                          $courses = data.courses;
                          toast.success("تم استيراد البيانات بنجاح");
                      } catch (e) {
                          toast.error("خطأ في استيراد البيانات");
                      }
                  });
              }}>
          استيراد البيانات
        </Button>
      </div>
    </div>
  </main>
</div>
