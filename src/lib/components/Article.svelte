<script lang="ts">
    import {onMount} from "svelte";

    $: isDark = true;
    onMount(() => {
        isDark = document.documentElement.classList.contains('dark');
    });

    export let content: string;
</script>

<style lang="postcss">
    :global(article a) {
        @apply transition-all underline underline-offset-4 hover:underline-offset-8;
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
        @apply whitespace-pre-wrap;
    }
</style>

<svelte:head>
    {#if isDark}
        <link rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/base16/bright.min.css"/>
    {:else}
        <link rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/base16/classic-light.min.css"/>
    {/if}
</svelte:head>

<article dir="ltr">
    {@html content}
</article>