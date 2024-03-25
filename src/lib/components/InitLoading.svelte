<script lang="ts">
    import Loading from "$lib/components/icons/Loading.svelte";
    import { onMount } from "svelte";

    const count = 50;
    let div: HTMLDivElement;

    onMount(async () => {
        div.style.scale = "0";
        div.style.pointerEvents = "none";
        document.body.style.overflowY = "auto";
        await new Promise((resolve) => setTimeout(resolve, 500));
        div.remove();
    });
</script>

<div class="fixed min-h-[100dvh] min-w-[100dvw] z-[999] bg-black flex flex-row flex-wrap items-center justify-center !font-mono transition-all" dir="ltr" bind:this={div}>
    {#each Array.from({ length: count }) as _, i}
        Getting Hacked <Loading />
    {/each}
</div>