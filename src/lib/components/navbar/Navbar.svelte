<script lang="ts">
  import { toggleMode } from "mode-watcher";
  import { Button } from "$lib/components/ui/button";
  import Moon from "virtual:icons/f7/MoonStars";
  import Sun from "virtual:icons/f7/SunMax";
  import NavBack from "./NavBack.svelte";
  import NavMenu from "./NavMenu.svelte";
  import NavSheet from "./NavSheet.svelte";
</script>

<header
  class="sticky top-0 z-50 mb-4 w-full border-b border-border/80 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
>
  <div class="container flex h-14 max-w-screen-2xl items-center px-2">
    <NavBack />
    <NavMenu />
    <div
      class="flex flex-1 items-center justify-between space-x-2 md:justify-end"
    >
      <div class="w-full flex-1 md:w-auto md:flex-none"></div>
      <nav class="flex items-center">
        <Button on:click={toggleMode} variant="ghost" size="icon">
          <Sun
            class="absolute rotate-0 scale-100 duration-500 dark:rotate-90 dark:scale-0"
          />
          <Moon
            class="absolute rotate-90 scale-0 duration-500 dark:rotate-0 dark:scale-100"
          />
          <span class="sr-only">Toggle theme</span>
        </Button>
      </nav>
    </div>
  </div>
</header>
<main class="flex flex-row">
  <NavSheet />
  <slot />
</main>
