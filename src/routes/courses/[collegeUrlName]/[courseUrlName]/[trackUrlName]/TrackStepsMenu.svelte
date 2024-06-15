<script lang="ts">
  import { page } from "$app/stores";
  import { stepUrl } from "$lib/models/Step";
  import BetweenLines from "$lib/components/BetweenLines.svelte";
  import { Button } from "$lib/components/ui/button";
  import type { LayoutData } from "./$types";

  export let data: LayoutData;
  let className: string;

  export { className as class };
</script>

<h3 class="mb-2">{data.track.displayName}</h3>
{#each data.track.expand.steps as step}
  {@const active = $page.params.stepId === step.id}
  {@const hasAccess =
    !step.isFree && !data.user?.registeredCourses.includes(data.course.id)}
  {#if step.type === "section"}
    <BetweenLines class="mx-2 text-lg">
      {step.displayName}
    </BetweenLines>
  {:else}
    <Button
      class="{className} {hasAccess && 'disabled'} {active && 'active'}
          "
      href={stepUrl(step, data.course, data.track)}
    >
      {step.displayName}
    </Button>
  {/if}
{/each}
