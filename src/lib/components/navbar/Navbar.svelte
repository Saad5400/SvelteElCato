<script lang="ts">
  import NavBack from "./NavBack.svelte";
  import NavMenu from "./NavMenu.svelte";
  import NavSheet from "./NavSheet.svelte";
  import NavSettings from "./NavSettings.svelte";
</script>

<header
  class="sticky top-0 z-50 mb-4 w-full border-b border-border/80 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
>
  <div class="container flex h-14 max-w-screen-2xl items-center px-2">
    <NavBack />
    <NavMenu />
    <NavSettings />
  </div>
</header>
<main class="flex flex-row">
  <NavSheet />
  <slot />
</main>
