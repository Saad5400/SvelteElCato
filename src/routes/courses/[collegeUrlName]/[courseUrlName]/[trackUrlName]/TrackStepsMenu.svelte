<script lang="ts">
  import { page } from "$app/stores";
  import { stepUrl } from "$lib/models/Step";
  import BetweenLines from "$lib/components/BetweenLines.svelte";
  import { Button } from "$lib/components/ui/button";
  import type { LayoutData } from "./$types";
  import Clock from "virtual:icons/f7/Clock";

  export let data: LayoutData;
  let className: string;

  export { className as class };
</script>

<h3 class="mb-2">{data.track.displayName}</h3>
{#each data.track.expand.steps as step}
  {@const active = $page.params.stepId === step.id}
  {@const hasAccess =
    step.isFree || data.user?.registeredCourses.includes(data.course.id)}
  {#if step.type === "section"}
    <BetweenLines class="mx-2 text-lg">
      {step.displayName}
    </BetweenLines>
  {:else}
    <Button
      class="{className} flex justify-between {hasAccess ||
        'disabled'} {active && 'active'}
          "
      href={stepUrl(step, data.course, data.track)}
    >
      <span>
        {step.displayName}
      </span>
      <span class="flex items-center justify-center gap-1 roboto-mono">
        {step.length}
        <Clock class="h-4 w-4" />
      </span>
    </Button>
  {/if}
{/each}
