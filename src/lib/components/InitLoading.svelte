<script lang="ts">
  import { onMount } from "svelte";

  const count = 50;
  let div: HTMLDivElement;

  onMount(async () => {
    div.style.scale = "0";
    div.style.pointerEvents = "none";
    await new Promise((resolve) => setTimeout(resolve, 150));
    document.body.style.overflowY = "auto";
    div.remove();
  });
</script>

<div
  class="fixed z-[999] flex flex-col min-h-[100dvh] min-w-[100dvw] scale-100 flex-row flex-wrap items-center justify-center bg-destructive text-center !font-mono text-6xl text-destructive-foreground transition-all duration-500"
  dir="ltr"
  bind:this={div}
>
  Getting Hacked
  <span class="text-sm">Just kidding, please wait for loading.</span>
</div>
