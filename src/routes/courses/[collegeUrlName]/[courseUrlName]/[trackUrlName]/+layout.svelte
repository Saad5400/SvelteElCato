<script lang="ts">
    import type {LayoutData} from './$types';
    import navStore from "$lib/stores/navStore";
    import {onDestroy} from "svelte";

    export let data: LayoutData;

    onDestroy(() => {
        navStore.set({title: '', items: []});
    });
</script>

<div class="flex-1 flex flex-row">
    <slot/>
</div>