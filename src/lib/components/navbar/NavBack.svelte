<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import ArrowRight from "virtual:icons/line-md/ArrowRight";
  import { page } from "$app/stores";
  import IconButton from "$lib/components/IconButton.svelte";

  function getBackUrl(route: string): string {
    switch (route) {
      case "/":
        return "";
      case "/courses/[courseUrlName]/[trackUrlName]":
      case "/courses/[courseUrlName]/[trackUrlName]/[stepId]":
      case "/courses/[courseUrlName]/quizzes/[quizUrlName]":
      case "/courses/[courseUrlName]/quizzes/[quizUrlName]/[questionId]":
      case "/courses/[courseUrlName]/quizzes/marked/[questionId]":
      case "/courses/[courseUrlName]/quizzes/random/[questionId]":
      case "/courses/[courseUrlName]/subscribe":
        return `/courses/${$page.params.courseUrlName}`;
      default:
        return "/";
    }
  }

  $: url = getBackUrl($page.route.id!);
</script>

{#if url}
  <IconButton text="الرجوع">
    <Button
      href={url}
      class="mr-4 flex items-center space-x-2 font-bold"
      size="icon"
      variant="ghost"
      aria-label="Go back"
    >
      <ArrowRight />
    </Button>
  </IconButton>
{/if}
