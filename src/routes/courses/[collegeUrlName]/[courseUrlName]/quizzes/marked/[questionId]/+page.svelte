<script lang="ts">
  import QuestionComponent from "../../Question.svelte";
  import type { PageData } from "./$types";
  import { persisted } from "svelte-persisted-store";

  export let data: PageData;
  const markedStore = persisted("markedQuestions", [] as string[]);

  $: question = data.question;
  $: markedQuestions = $markedStore.filter((id) => data.questions.includes(id));
  $: questionIndex = markedQuestions.indexOf(data.question.id);
  $: next = markedQuestions.length > questionIndex + 1 ? markedQuestions[questionIndex + 1] : null;
  $: prev = questionIndex > 0 ? markedQuestions[questionIndex - 1] : null;
</script>

<QuestionComponent
  courseDisplayName={data.course.displayName}
  quizDisplayName="الأسئلة المعلمة"
  {question}
  {next}
  {prev}
  {questionIndex}
  totalQuestions={markedQuestions.length}
/>
