<script lang="ts">
  import type { LayoutData } from "./$types";
  import { onDestroy, onMount } from "svelte";
  import menu from "$lib/stores/menu";
  // @ts-ignore
  import * as Sheet from "$lib/components/ui/sheet";
  import TrackStepsMenu from "./TrackStepsMenu.svelte";

  export let data: LayoutData;

  onMount(() => {
    if (data.track.steps.length > 0) {
      menu.set({ open: false });
    }
  });

  onDestroy(() => {
    menu.set(null);
  });

  const largeWidth = "30rem";
</script>

<Sheet.Root open={$menu?.open} openFocus=".scroll-active">
  <Sheet.Content class="flex flex-col items-center gap-2 overflow-y-auto">
    <TrackStepsMenu activeClass="scroll-active" {data} class="flex w-full flex-wrap justify-start" />
  </Sheet.Content>
</Sheet.Root>
<div class="flex flex-row">
  <div class="hidden min-w-[30rem] pe-4 lg:block">
    <nav
      class="fixed flex max-h-[calc(100dvh-5rem)] w-[30rem] flex-col items-center gap-2 overflow-y-auto overflow-x-clip border-e-2"
    >
      <TrackStepsMenu {data} class="flex w-[27rem] flex-wrap justify-start" />
      <br />
    </nav>
  </div>
  <slot />
</div>
