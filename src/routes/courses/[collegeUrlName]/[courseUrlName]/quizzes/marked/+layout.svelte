<script lang="ts">
  import type { LayoutData } from "./$types";
  import navStore, { type NavItem } from "$lib/stores/navStore";
  import { onDestroy, onMount } from "svelte";
  import { page } from "$app/stores";
  import { persisted } from "svelte-persisted-store";

  const solvedStore = persisted("solvedQuestions", [] as string[]);
  const markedStore = persisted("markedQuestions", [] as string[]);

  export let data: LayoutData;

  $: navStore.set({
    title: "الأسئلة المعلمة",
    items: $markedStore.map((question_id, index) => {
      return {
        title: index + 1 + "",
        href: `/courses/${data.course.college.urlName}/${data.course.urlName}/quizzes/marked/${question_id}`,
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
