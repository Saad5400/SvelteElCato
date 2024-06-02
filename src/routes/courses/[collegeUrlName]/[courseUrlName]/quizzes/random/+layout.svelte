<script lang="ts">
  import type { LayoutData } from "./$types";
  import navStore, { type NavItem } from "$lib/stores/navStore";
  import { onDestroy, onMount } from "svelte";
  import { persisted } from "svelte-persisted-store";
  import { page } from "$app/stores";

  const solvedStore = persisted("solvedQuestions", [] as string[]);
  const markedStore = persisted("markedQuestions", [] as string[]);

  export let data: LayoutData;

  $: navStore.set({
    title: "جميع الأسئلة عشوائيا",
    items: data.questions.map((question_id, index) => {
      return {
        title: index + 1 + "",
        href: `/courses/${data.course.college.urlName}/${data.course.urlName}/quizzes/random/${question_id}`,
        class:
          ($solvedStore.includes(question_id) ? "correct " : " ") +
          ($markedStore.includes(question_id) ? "marked" : ""),
      };
    }),
  });

  onDestroy(() => {
    navStore.set({ title: "", items: [] });
  });
</script>

<div id="quizLayout" class="flex flex-1 flex-row overflow-x-clip">
  <slot />
</div>
