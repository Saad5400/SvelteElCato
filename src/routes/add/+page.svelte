<script lang="ts">
  // @ts-ignore
  import * as Select from "$lib/components/ui/select";
  import type { PageData } from "./$types";
  import { Textarea } from "$lib/components/ui/textarea/index.js";
  import { Label } from "$lib/components/ui/label";
  import { cn } from "$lib/utils";
  import type Quiz from "$lib/models/Quiz";
  import { Button } from "$lib/components/ui/button";
  import type Question from "$lib/models/Question";

  let quizId: string;
  let questions: string;

  function isValid(value: string) {
    // make sure that the value is a valid JSON and that it's an array with objects, each object has a content, a, b, and correct properties
    try {
      const parsed = JSON.parse(value);
      if (!Array.isArray(parsed)) return false;
      for (const item of parsed) {
        if (
          typeof item !== "object" ||
          !item.content ||
          !item.a ||
          !item.b ||
          !item.correct
        ) {
          return false;
        }
      }
      return true;
    } catch (e) {
      return false;
    }
  }

  async function submit() {
    const questionsArray = JSON.parse(questions);
    const created: Question[] = [];

    for (const question of questionsArray) {
      const newQ = await data.pb.collection('questions').create(question);
      created.push(newQ);
      console.log('created', newQ);
    }

    const quiz = await data.pb.collection('quizzes').update(quizId, {
      'questions+': created.map((q) => q.id),
    });

    console.log('quiz', quiz);
  }

  export let data: PageData;
</script>

<form class="max-w-screen-md mx-auto my-16 flex flex-col gap-4">
  <Select.Root
    onSelectedChange={(v) => quizId = v.value}
  >
    <Select.Trigger>
      <Select.Value placeholder="Quiz" />
    </Select.Trigger>
    <Select.Content class="max-h-[20rem] overflow-y-auto">
      {#each data.quizzes as quiz}
        <Select.Item value={quiz.id}>{quiz.displayName}</Select.Item>
      {/each}
    </Select.Content>
  </Select.Root>
  <div>
    <Label>
      Questions JSON
    </Label>
    <Textarea
      dir="ltr"
      rows={15}
      placeholder={`[
  {
      "content": "test",
      "a": "test",
      "b": "test",
      "c": "test",
      "d": "test",
      "e": "test",
      "correct": "a",
  },
  ...
]`}
      bind:value={questions} class="{cn(
      isValid(questions) ? 'border-success' : 'border-destructive',
    )}">
    </Textarea>
  </div>
  <Button type="submit" on:click={submit}>
    Add
  </Button>
</form>