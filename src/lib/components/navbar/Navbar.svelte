<script lang="ts">
  import NavBack from "./NavBack.svelte";
  import NavSettings from "./NavSettings.svelte";
  import type { AuthModel } from "pocketbase";
  import NavMenu from "$lib/components/navbar/NavMenu.svelte";

  export let user: AuthModel;
</script>

<header
  class="sticky top-0 z-50 mb-4 w-full border-b border-border/80 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
>
  <div
    class="container flex h-14 max-w-screen-2xl items-center justify-between px-2"
  >
    <div class="flex">
      <NavBack />
      <NavMenu />
    </div>
    <NavSettings {user} />
  </div>
</header>

<style>
  header {
    view-transition-name: navbar;
  }
</style>
