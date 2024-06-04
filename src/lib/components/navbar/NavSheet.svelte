<script lang="ts">
  import NavItems from "$lib/components/navbar/NavItems.svelte";
  import SkipBack from "virtual:icons/f7/BackwardEnd";
  import navStore from "$lib/stores/navStore";

  let largeNavMenu: HTMLElement;
</script>

{#if $navStore.title && $navStore.items.length > 0}
  <div class="contents" id="navMenuDiv">
    <nav
      class="min-h-screen-without-navbar ms-4 hidden w-80 max-w-80 !overflow-x-hidden transition-all ease-in-out lg:block"
      id="largeNavMenu"
      bind:this={largeNavMenu}
    >
      <div
        class="fixed max-h-[calc(100dvh-5rem)] w-full max-w-80 overflow-y-auto scrollbar-none"
      >
        <h3 class="mb-4 text-center">
          {$navStore.title}
        </h3>
        <NavItems />
      </div>
    </nav>
    <div class="hidden items-center border-e-[1px] ps-4 lg:flex" />
  </div>
{/if}

<style lang="postcss">
  #largeNavMenu {
    clip-path: inset(0 0 0 0);
  }
</style>
