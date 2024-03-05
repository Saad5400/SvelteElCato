<script lang="ts">
    import type {PageData} from './$types';
    import {Button} from "$lib/components/ui/button";
    import { Menu } from 'lucide-svelte';

    export let data: PageData;
</script>

<svelte:head>
    <title>
        {data.course.displayName} {data.track.displayName}
    </title>
</svelte:head>

<div class="flex items-center justify-center mx-auto min-h-screen-without-navbar">
    {#if data.track.steps && data.track.steps.length > 0}
        <span class="hidden lg:contents">
            اختر احد الدروس من القائمة باليمين
        </span>
        <span class="contents lg:hidden">
            افتح قائمة الدروس من اعلى يمين الصفحة بالضغط على
            <Menu class="w-3 h-3 mx-2" />
        </span>
    {:else}
        لا يوجد دروس حاليا في هذا المسار
    {/if}
</div>
