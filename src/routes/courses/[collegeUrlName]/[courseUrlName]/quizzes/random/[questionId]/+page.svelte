<script lang="ts">
  import type { PageData } from "./$types";
  import Question from "../../Question.svelte";

  export let data: PageData;
</script>

<Question
  question={data.question}
  next={data.next}
  prev={data.prev}
  courseDisplayName={data.course.displayName}
  quizDisplayName='جميع الأسئلة عشوائيا'
  questionIndex={data.questionIndex}
  totalQuestions={data.questions.length}
/>
