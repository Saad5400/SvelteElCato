<script lang="ts">
  import type { PageServerData } from "./$types";
  import Question from "../../Question.svelte";

  export let data: PageServerData;
</script>

<Question
  question={data.question}
  next={data.next}
  prev={data.prev}
  courseDisplayName={data.course.displayName}
  quizDisplayName={data.quiz.displayName}
  questionIndex={data.questionIndex}
  totalQuestions={data.quiz.questions.length}
/>
