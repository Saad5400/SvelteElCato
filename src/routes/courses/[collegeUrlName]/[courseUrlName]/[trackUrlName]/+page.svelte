<script lang="ts">
  import type { PageData } from "./$types";
  import Menu from "virtual:icons/line-md/Menu";

  export let data: PageData;
</script>

<svelte:head>
  <title>
    {data.course.displayName}
    {data.track.displayName}
  </title>
</svelte:head>

<div
  class="min-h-screen-without-navbar mx-auto flex items-center justify-center"
>
  {#if data.track.steps && data.track.steps.length > 0}
    <span class="hidden md:contents"> اختر احد الدروس من القائمة باليمين </span>
    <span class="contents md:hidden">
      افتح قائمة الدروس من اعلى يمين الصفحة بالضغط على
      <Menu class="mx-2 h-3 w-3" />
    </span>
  {:else}
    لا يوجد دروس حاليا في هذا المسار
  {/if}
</div>
