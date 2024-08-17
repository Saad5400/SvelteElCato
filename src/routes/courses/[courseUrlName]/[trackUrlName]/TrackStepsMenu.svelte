<script lang="ts">
  import { page } from "$app/stores";
  import { stepUrl } from "$lib/models/Step";
  import type Step from "$lib/models/Step";
  import BetweenLines from "$lib/components/BetweenLines.svelte";
  import { Button } from "$lib/components/ui/button";
  import type { LayoutData } from "./$types";
  import Clock from "virtual:icons/f7/Clock";
  import menu from "$lib/stores/menu";
  import { Checkbox } from "$lib/components/ui/checkbox";
  import completedSteps from "$lib/stores/completedSteps";

  export let data: LayoutData;
  export let activeClass: string = "";
  let className: string;

  export { className as class };

  function stepChecked(value: any, step: Step) {
    if (!data.pb.authStore.isValid || !data.user) return;
    value ? completedSteps.add(step.id) : completedSteps.remove(step.id);
    const updatedData = value ? "completedSteps+" : "completedSteps-";
    data.pb.collection("users").update(data.user.id, {
      [updatedData]: step.id
    });
  }
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
      class="{className} flex justify-between px-2 {hasAccess ||
        'disabled'} {active && `active ${activeClass}`}
          "
    >
      <div class="flex-1 h-full flex items-center gap-2">
        {#if data.pb.authStore.isValid && data.user}
          <Checkbox
            class="z-10 w-4 h-auto aspect-square"
            onCheckedChange={(v) => stepChecked(v, step)}
            checked={$completedSteps.includes(step.id)}
          />
        {/if}
        <a
          href={stepUrl(step, data.course, data.track)}
          on:click={menu.close}
          class="flex-1 h-full text-start flex items-center"
        >
          {step.displayName}
        </a>
      </div>
      {#if step.length > 0}
        <span class="roboto-mono flex items-center justify-center gap-1">
          {step.length}
          <Clock class="h-4 w-4" />
        </span>
      {/if}
    </Button>
  {/if}
{/each}
