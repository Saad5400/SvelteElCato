<script lang="ts">
  import type { PageData } from "./$types";

  let quiz: HTMLTextAreaElement;
  let questions: HTMLTextAreaElement;
  export let data: PageData;

  async function submit() {
    const pb = data.pb;
    const quizText = quiz.value;
    const questionsText = questions.value;
    const formData = JSON.parse(questionsText) as any[];
    const records = [];
    for (let i = 0; i < formData.length; i++) {
      const record = await pb.collection("questions").create(formData[i]);
      records.push(record.id);
    }
    const quizData = {
      questions: records,
    };
    await pb.collection("quizzes").update(quizText, quizData);
  }
</script>

<main class="flex h-full w-full flex-col items-center justify-center">
  <textarea
    dir="ltr"
    class="w-full max-w-screen-md font-sans"
    bind:this={quiz}
  />
  <textarea
    dir="ltr"
    class="w-full max-w-screen-md font-sans"
    bind:this={questions}
  />
  <button on:click={submit}> Submit</button>
</main>
