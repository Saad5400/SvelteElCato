<script lang="ts">
  import { onMount } from "svelte";
  import Loading from "$lib/components/icons/Loading.svelte";

  const count = 50;
  let div: HTMLDivElement;

  onMount(async () => {
    div.style.opacity = "0";
    div.style.pointerEvents = "none";
    await new Promise((resolve) => setTimeout(resolve, 500));
    div.remove();
  });
</script>

<div
  id="init-loading"
  class="fixed z-[999] flex min-h-[100dvh] min-w-[100dvw] scale-100 flex-col flex-wrap items-center justify-center bg-background text-center duration-500"
  dir="ltr"
  bind:this={div}
>
  <Loading />
</div>
