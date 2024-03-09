<script lang="ts">
    import type {PageData} from './$types';
    import Menu from 'virtual:icons/f7/Menu';

    export let data: PageData;
</script>

<svelte:head>
    <title>
        {data.course.displayName} {data.quiz.displayName}
    </title>
</svelte:head>

<div class="flex items-center justify-center mx-auto min-h-screen-without-navbar">
    <span class="hidden lg:contents">
        اختر احد الأسئلة من القائمة باليمين
    </span>
    <span class="contents lg:hidden">
        افتح قائمة الأسئلة من اعلى يمين الصفحة بالضغط على
        <Menu class="w-3 h-3 mx-2" />
    </span>
</div>
