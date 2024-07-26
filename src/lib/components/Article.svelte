<script lang="ts">
  import { mode } from "mode-watcher";
  import { onMount } from "svelte";

  export let content: string;
  export let prefix: string = "";
  export let prefixClass: string = "";
  let classes = "";

  onMount(() => {
    if (content.includes("<script>")) {
      // save the scripts and their contents
      const scripts = content.match(/<script>[\s\S]*?<\/script>/g);
    }
  });

  export { classes as class };
</script>

<svelte:head>
  {#if $mode === "dark"}
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/base16/bright.min.css"
    />
  {:else}
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/base16/classic-light.min.css"
    />
  {/if}
</svelte:head>

<article
  dir="auto"
  class={"h-full w-full max-w-full break-words text-start " + classes}
>
  <span class={"block " + prefixClass}>
    {prefix}
  </span>
  {@html content}
</article>

<style lang="postcss">
  :global(article a) {
    @apply underline underline-offset-4 !transition-all hover:underline-offset-8;
  }

  :global(
      article h1,
      article h2,
      article h3,
      article h4,
      article h5,
      article h6
    ) {
    @apply my-4;
  }

  :global(article code) {
    @apply !bg-inherit font-light;
  }

  :global(article pre) {
    @apply max-w-[calc(100dvw-1rem)] overflow-x-auto;
  }

  :global(article p:not(:first-child)) {
    @apply !mt-0;
  }

  :global(article img) {
    @apply mx-auto max-w-[max(50rem,50%)];
  }

  :global(article ul) {
    @apply list-disc list-inside;
  }

  :global(article ol) {
    @apply list-decimal list-inside;
  }
</style>
