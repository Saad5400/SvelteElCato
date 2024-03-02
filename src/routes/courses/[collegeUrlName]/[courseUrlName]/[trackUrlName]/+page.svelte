<script lang="ts">
    import type {PageData} from './$types';

    export let data: PageData;
</script>

<svelte:head>
    <title>
        {data.course.displayName} {data.track.displayName}
    </title>
</svelte:head>

<div class="flex items-center justify-center mx-auto min-h-screen-without-navbar">
    اختر اجد الدروس من القائمة باليمين
</div>