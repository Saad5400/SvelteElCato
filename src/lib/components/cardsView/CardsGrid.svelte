<script lang="ts">
    export let id = '';
    export let title = '';
</script>

<section {id} class="mt-40 scroll-m-20 flex flex-col gap-2">
    {#if title}
        <h3 class="text-2xl font-semibold">
            {title}
        </h3>
    {/if}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 lg:gap-6 justify-center items-center">
        <slot/>
    </div>
</section>