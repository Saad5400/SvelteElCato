<script lang="ts">
  import { mode } from "mode-watcher";

  export let content: string;
  export let prefix: string = "";
  export let prefixClass: string = "";
  let classes = "";

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
  dir="ltr"
  class={"h-full max-w-full break-words text-start " + classes}
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
    @apply !bg-inherit font-light h-full;
  }

  :global(article pre) {
    @apply max-w-[calc(100dvw-1rem)] overflow-x-auto h-full;
  }

  :global(article p:not(:first-child)) {
    @apply !mt-0;
  }
</style>
