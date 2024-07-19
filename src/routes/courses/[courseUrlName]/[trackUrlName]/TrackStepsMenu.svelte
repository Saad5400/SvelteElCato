<script lang="ts">
  import { page } from "$app/stores";
  import { stepUrl } from "$lib/models/Step";
  import BetweenLines from "$lib/components/BetweenLines.svelte";
  import { Button } from "$lib/components/ui/button";
  import type { LayoutData } from "./$types";
  import Clock from "virtual:icons/f7/Clock";
  import menu from "$lib/stores/menu";

  export let data: LayoutData;
  export let activeClass: string = "";
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
        'disabled'} {active && `active ${activeClass}`}
          "
      href={stepUrl(step, data.course, data.track)}
      on:click={menu.close}
    >
      <span>
        {step.displayName}
      </span>
      {#if step.length > 0}
        <span class="roboto-mono flex items-center justify-center gap-1">
          {step.length}
          <Clock class="h-4 w-4" />
        </span>
      {/if}
    </Button>
  {/if}
{/each}
