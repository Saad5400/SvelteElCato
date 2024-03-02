<script lang="ts">
    import type {PageData} from './$types';
    import {Button} from "$lib/components/ui/button";

    export let data: PageData;
</script>

<svelte:head>
    <title>
        {data.course.displayName} {data.track.displayName}
    </title>
</svelte:head>

<div class="flex items-center justify-center mx-auto min-h-screen-without-navbar">
    {#if data.track.steps && data.track.steps.length > 0}
        اختر احد الدروس من القائمة باليمين
    {:else}
        لا يوجد دروس حاليا في هذا المسار
    {/if}
</div>
