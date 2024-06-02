<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import SkipBack from "virtual:icons/f7/BackwardEnd";
  import { page } from "$app/stores";

  function getBackUrl(route: string): string {
    switch (route) {
      case "/":
        return "";
      case "/courses/[collegeUrlName]/[courseUrlName]/[trackUrlName]":
      case "/courses/[collegeUrlName]/[courseUrlName]/[trackUrlName]/[stepId]":
      case "/courses/[collegeUrlName]/[courseUrlName]/quizzes/[quizUrlName]":
      case "/courses/[collegeUrlName]/[courseUrlName]/quizzes/[quizUrlName]/[questionId]":
      case "/courses/[collegeUrlName]/[courseUrlName]/quizzes/marked/[questionId]":
        return `/courses/${$page.params.collegeUrlName}/${$page.params.courseUrlName}`;
      default:
        return "/";
    }
  }

  $: url = getBackUrl($page.route.id!);
</script>

{#if url}
  <Button
    href={url}
    class="mr-4 flex items-center space-x-2 font-bold"
    size="icon"
    variant="ghost"
    aria-label="Go back"
  >
    <SkipBack class="rotate-180" />
  </Button>
{/if}
