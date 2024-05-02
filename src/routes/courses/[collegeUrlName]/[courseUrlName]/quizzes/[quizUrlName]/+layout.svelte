<script lang="ts">
  import type { LayoutData } from "./$types";
  import navStore, { type NavItem } from "$lib/stores/navStore";
  import { onDestroy } from "svelte";
  import { page } from "$app/stores";
  import { persisted } from "svelte-persisted-store";

  const solvedStore = persisted("solvedQuestions", [] as string[]);
  const markedStore = persisted("markedQuestions", [] as string[]);

  export let data: LayoutData;

  $: route = $page.route.id;
  $: if (
    route?.startsWith(
      "/courses/[collegeUrlName]/[courseUrlName]/quizzes/[quizUrlName]",
    )
  ) {
    const navItems: NavItem[] = data.quiz.questions.map((question, index) => {
      return {
        title: index + "",
        href: `/courses/${data.course.college.urlName}/${data.course.urlName}/quizzes/${data.quiz.urlName}/${question.id}`,
        class:
          ($solvedStore.includes(question.id) ? "correct " : " ") +
          ($markedStore.includes(question.id) ? "marked" : ""),
      };
    });
    navStore.set({
      title: data.quiz.displayName,
      items: navItems,
    });
  }

  onDestroy(() => {
    navStore.set({ title: "", items: [] });
  });
</script>

<div id="quizLayout" class="flex flex-1 flex-row overflow-x-clip">
  <slot />
</div>
