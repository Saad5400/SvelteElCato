<script lang="ts">
  import NavItems from "$lib/components/navbar/NavItems.svelte";
  import SkipBack from "virtual:icons/f7/BackwardEnd";
  import navStore from "$lib/stores/navStore";

  let largeNavMenu: HTMLElement;
</script>

{#if $navStore.title && $navStore.items.length > 0}
  <div class="contents" id="navMenuDiv">
    <nav
      class="min-h-screen-without-navbar ms-4 hidden w-8 max-w-80 !overflow-x-hidden transition-all ease-in-out lg:block"
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
    <div class="hidden items-center border-e-2 ps-4 lg:flex">
      <span
        class="absolute translate-x-2 scale-x-100 transition-all"
        id="openNavIcon"
      >
        <SkipBack class="text-primary" />
      </span>
    </div>
  </div>
{/if}

<style lang="postcss">
  #largeNavMenu {
    clip-path: inset(0 0 0 0);
  }

  #navMenuDiv:hover #largeNavMenu {
    @apply w-80;
  }

  #navMenuDiv:hover #openNavIcon {
    @apply -scale-x-100;
  }
</style>
