<script lang="ts">
  import { onMount } from "svelte";
  import Loading from "./icons/Loading.svelte";

  const count = 50;
  let div: HTMLDivElement;

  onMount(async () => {
    div.style.scale = "0";
    div.style.pointerEvents = "none";
    await new Promise((resolve) => setTimeout(resolve, 500));
    document.body.style.overflowY = "auto";
    div.remove();
  });
</script>

<div
  id="init-loading"
  class="fixed z-[999] flex min-h-[100dvh] min-w-[100dvw] scale-100 flex-col flex-wrap items-center justify-center bg-background text-center duration-500"
  dir="ltr"
  bind:this={div}
>
  <Loading class="w-24" />
</div>

<style lang="postcss">
  #init-loading {
    @apply transition-none;
    transition: scale 0.1s ease-in-out;
  }
</style>
