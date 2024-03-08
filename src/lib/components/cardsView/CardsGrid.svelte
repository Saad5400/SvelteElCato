<script lang="ts">
    import BetweenLines from "$lib/components/BetweenLines.svelte";

    export let id = '';
    export let title = '';
</script>

<section {id} class="scroll-m-20 flex flex-col gap-2">
    {#if title}
        <BetweenLines>
            {title}
        </BetweenLines>
    {/if}
    <div class="flex flex-row flex-wrap gap-2 md:gap-4 lg:gap-6 items-center">
        <slot/>
    </div>
</section>