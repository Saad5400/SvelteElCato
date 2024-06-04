<script lang="ts">
  import type { LayoutData } from "./$types";
  import { onDestroy } from "svelte";
  import { persisted } from "svelte-persisted-store";
  import updateNavStore, { restoreNavStore } from "../updateNavStore";

  const solvedStore = persisted("solvedQuestions", [] as string[]);
  const markedStore = persisted("markedQuestions", [] as string[]);

  export let data: LayoutData;

  $: updateNavStore(
    data.quiz.questions_ids,
    `/courses/${data.course.college.urlName}/${data.course.urlName}/quizzes/${data.quiz.urlName}/`,
    $solvedStore,
    $markedStore,
    data.quiz.displayName
  );

  onDestroy(() => restoreNavStore());
</script>

<slot />
