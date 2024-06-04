<script lang="ts">
  import type { LayoutData } from "./$types";
  import { onDestroy } from "svelte";
  import { persisted } from "svelte-persisted-store";
  import updateNavStore, { restoreNavStore } from "../updateNavStore";

  const solvedStore = persisted("solvedQuestions", [] as string[]);
  const markedStore = persisted("markedQuestions", [] as string[]);

  export let data: LayoutData;

  $: updateNavStore(
    $markedStore.filter((q) => data.questions.includes(q)),
    `/courses/${data.course.college.urlName}/${data.course.urlName}/quizzes/marked/`,
    $solvedStore,
    $markedStore,
    "الأسئلة المعلمة",
  );

  onDestroy(() => restoreNavStore());
</script>

<slot />
