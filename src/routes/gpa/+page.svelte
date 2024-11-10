<script lang="ts">
  import { persisted } from "svelte-persisted-store";
  import { Input } from "$lib/components/ui/input";
  import { Button } from "$lib/components/ui/button";
  import * as Select from "$lib/components/ui/select";

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
    85: "A",
    80: "B+",
    75: "B",
    70: "B",
    65: "C+",
    60: "C",
    0: "F"
  };

  interface Course {
    name?: string;
    grade?: {
      disabled?: boolean;
      label: string;
      value: string;
    };
    credits?: number;
  }

  const courses = persisted<Course[]>("courses", [
    {
      name: "التفكير الحاسوبي",
      grade: {
        disabled: false,
        label: " A+",
        value: "A+"
      },
      credits: 3
    }
  ]);

  // use weighted mean to calculate GPA, if the course is not graded yet, ignore it
  $: gpa = $courses.reduce((acc, course) => {
    if (course.grade && course.grade.value in grades) {
      const grade = course.grade.value as keyof typeof grades;
      return acc + grades[grade] * (course.credits || 1);
    }
    return acc;
  }, 0) / $courses.reduce((acc, course) => {
    if (course.grade) {
      return acc + (course.credits || 1);
    }
    return acc;
  }, 0);

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

<div class="container max-w-screen-md">
  <main class="flex flex-col gap-4">
    <h1 class="mb-8">
      حاسبة المعدل لأم القرى
    </h1>
    <h2>
      معدلك: {gpa} / 4.0
    </h2>
    {#each $courses as course}
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
    <Button class="w-full" variant="outline3DFilled"
            on:click={() => $courses = [...$courses, { }]}>
      إضافة مقرر
    </Button>

    <hr>

    <h2>
      تحويل الدرجة إلى التقدير
    </h2>
    <div class="flex flex-col">
      <Input class="w-full" bind:value={grade} placeholder="الدرجة" />
      {#if (mark)}
        <h3>
          تقديرك هو {mark}
        </h3>
      {/if}
    </div>
  </main>
</div>
