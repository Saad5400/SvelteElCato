<script lang="ts">
  import type { LayoutData } from "./$types";
  import { Button } from "$lib/components/ui/button";
  import BetweenLines from "$lib/components/BetweenLines.svelte";
  import { onDestroy, onMount } from "svelte";
  import menu from "$lib/stores/menu";
  // @ts-ignore
  import * as Sheet from "$lib/components/ui/sheet";
  import useClass from "$lib/hooks/useClass";
  import { page } from "$app/stores";
  import user from "$lib/stores/user";

  export let data: LayoutData;

  onMount(() => {
    if (data.track.steps.length > 0) {
      menu.set({ open: false });
    }
  });

  onDestroy(() => {
    menu.set(null);
  });
</script>

<Sheet.Root
  open={$menu?.open}
  onOpenChange={(e) => {
    menu.set({ open: e });
  }}
>
  <Sheet.Content class="flex flex-col items-center gap-2 overflow-y-auto">
    <h3 class="mb-2">
      {data.track.displayName}
    </h3>
    {#each data.track.steps as step}
      {#if step.type === "section"}
        <BetweenLines class="mx-2 text-lg">
          {step.displayName}
        </BetweenLines>
      {:else}
        <Button
          href={step.url(data.course, data.track)}
          on:click={() => {
            menu.set({ open: false });
          }}
          class={useClass(
            $page.params.stepId === step.id,
            "active",
            useClass(
              !step.isFree &&
                !$user?.registeredCourses.includes(data.course.id),
              "disabled",
              "flex w-full flex-wrap justify-start",
            ),
          )}
        >
          {step.displayName}
        </Button>
      {/if}
    {/each}
  </Sheet.Content>
</Sheet.Root>
<div class="flex flex-row">
  <div class="hidden min-w-[25rem] pe-4 md:block">
    <nav
      class="fixed flex max-h-[calc(100dvh-5rem)] w-[25rem] flex-col items-center gap-2 overflow-y-auto overflow-x-clip border-e-2"
    >
      <h3 class="mb-2">{data.track.displayName}</h3>
      {#each data.track.steps as step}
        {#if step.type === "section"}
          <BetweenLines class="mx-2 text-lg">
            {step.displayName}
          </BetweenLines>
        {:else}
          <Button
            class={useClass(
              $page.params.stepId === step.id,
              "active",
              useClass(
                !step.isFree &&
                  !$user?.registeredCourses.includes(data.course.id),
                "disabled",
                "flex w-[23rem] flex-wrap justify-start",
              ),
            )}
            href={step.url(data.course, data.track)}
          >
            {step.displayName}
          </Button>
        {/if}
      {/each}
    </nav>
  </div>
  <slot />
</div>
