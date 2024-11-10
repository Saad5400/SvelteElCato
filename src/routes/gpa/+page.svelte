<script lang="ts">
  import { persisted } from "svelte-persisted-store";
  import { Input } from "$lib/components/ui/input";
  import { Button } from "$lib/components/ui/button";
  import * as Select from "$lib/components/ui/select";
  import { fade } from "svelte/transition";
  import { toast } from "svelte-sonner";

  // Utility function to convert Arabic-Indic digits to Latin digits
  function convertArabicToLatinDigits(arabicNumber: string) {
    return arabicNumber
      .replace(/[٠١٢٣٤٥٦٧٨٩]/g, (d: string) => "٠١٢٣٤٥٦٧٨٩".indexOf(d).toString())
      .replace(/٫/g, "."); // Replace Arabic decimal separator with "."
  }

  // Function to parse Arabic integer
  function parseArabicInt(arabicNumber: string) {
    const latinNumber = convertArabicToLatinDigits(arabicNumber);
    return parseInt(latinNumber, 10);
  }

  // Function to parse Arabic float
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
  const prevGpa = persisted("prevGpa", "");
  const prevCredits = persisted("prevCredits", "");

  let gpa: number = 0;
  // use weighted mean to calculate GPA, if the course is not graded yet, ignore it
  $: {
    let totalCredits = 0;
    let totalWeightedGrade = 0;
    for (const course of $courses) {
      if (course.grade && course.grade.value && course.credits) {
        totalCredits += parseArabicInt(course.credits);
        const grade = course.grade.value as keyof typeof grades;
        totalWeightedGrade += grades[grade] * parseArabicInt(course.credits);
      }
    }
    if ($prevGpa && $prevCredits) {
      totalCredits += parseArabicInt($prevCredits);
      totalWeightedGrade += parseArabicFloat($prevGpa) * parseArabicInt($prevCredits);
    }
    // round to 2 decimal places
    gpa = Math.round((totalWeightedGrade / totalCredits) * 100) / 100;
  }

  let grade: number | null = null;
  let mark: string | null = null;
  $: {
    if (!grade) {
      mark = null;
    }
    for (const [m, g] of Object.entries(marks)) {
      if (grade && grade >= Number(m)) {
        mark = g;
      }
    }
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
    {#if (gpa)}
      <h2 transition:fade>
        معدلك: {gpa} / 4
      </h2>
    {/if}
    <!-- prev gpa and prev credits -->
    <div class="flex flex-col gap-4">
      <h5>
        لحساب المعدل التراكمي:
      </h5>
      <div class="flex gap-4">
        <Input bind:value={$prevGpa} class="w-1/2" placeholder="المعدل الحالي (اختياري)" />
        <Input bind:value={$prevCredits} class="w-1/2" placeholder="الساعات المجتازة (اختياري)" />
      </div>
    </div>
    <hr />
    {#each $courses as course}
      <div class="flex" transition:fade>
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
    <Button class="w-full" variant="outline3DFilled"
            on:click={() => $courses = [...$courses, { }]}>
      إضافة مقرر
    </Button>
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
                      prevGpa: $prevGpa,
                      prevCredits: $prevCredits
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
                          $prevGpa = data.prevGpa;
                          $prevCredits = data.prevCredits;
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

    <hr>

    <h2>
      تحويل الدرجة إلى التقدير
    </h2>
    <div class="flex flex-col">
      <Input class="w-full" bind:value={grade} placeholder="الدرجة" />
      {#if (mark)}
        <h3 transition:fade>
          تقديرك هو {mark}
        </h3>
      {/if}
    </div>
  </main>
</div>
