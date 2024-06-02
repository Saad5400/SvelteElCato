<script lang="ts">
  import QuestionComponent from "../../Question.svelte";
  import type { PageData } from "./$types";
  import { persisted } from "svelte-persisted-store";

  export let data: PageData;
  const markedStore = persisted("markedQuestions", [] as string[]);

  $: question = data.question;
  $: questionIndex = $markedStore.indexOf(data.question.id);
  $: next = $markedStore.length > questionIndex + 1 ? $markedStore[questionIndex + 1] : null;
  $: prev = questionIndex > 0 ? $markedStore[questionIndex - 1] : null;
</script>

<QuestionComponent
  courseDisplayName={data.course.displayName}
  quizDisplayName="الأسئلة المعلمة"
  {question}
  {next}
  {prev}
  {questionIndex}
  totalQuestions={$markedStore.length}
/>
