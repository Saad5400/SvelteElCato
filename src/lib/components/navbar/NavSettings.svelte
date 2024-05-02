<script lang="ts">
  import { toggleMode } from "mode-watcher";
  import { Button } from "$lib/components/ui/button";
  import Moon from "virtual:icons/f7/MoonStars";
  import Sun from "virtual:icons/f7/SunMax";
  import Speaker from "virtual:icons/f7/Speaker";
  import Speaker2 from "virtual:icons/f7/Speaker-2";
  import AppShortcutOutlineSharp from "virtual:icons/material-symbols-light/AppShortcutOutlineSharp";
  import AppBlockingOutlineSharp from "virtual:icons/material-symbols-light/AppBlockingOutlineSharp";
  import { persisted } from "svelte-persisted-store";

  const allowSound = persisted("allowSound", true as boolean);
  const autoRedirect = persisted("autoRedirect", true as boolean);
</script>

<div class="flex flex-1 items-center justify-between space-x-2 md:justify-end">
  <div class="w-full flex-1 md:w-auto md:flex-none"></div>
  <nav class="flex items-center" dir="ltr">
    <Button on:click={toggleMode} variant="ghost" size="icon">
      <Sun
        class="absolute rotate-0 scale-100 duration-500 dark:rotate-90 dark:scale-0"
      />
      <Moon
        class="absolute rotate-90 scale-0 duration-500 dark:rotate-0 dark:scale-100"
      />
      <span class="sr-only">Toggle theme</span>
    </Button>
    <Button
      on:click={() => allowSound.update((value) => !value)}
      variant="ghost"
      size="icon"
    >
      <Speaker
        class={"absolute transition-all " +
          ($allowSound ? "opacity-0" : "opacity-100")}
      />
      <Speaker2
        class={"absolute transition-all " +
          ($allowSound ? "opacity-100" : "opacity-0")}
      />
      <span class="sr-only">Toggle theme</span>
    </Button>
    <Button
    on:click={() => autoRedirect.update((value) => !value)}
    variant="ghost"
    size="icon"
  >
    <AppBlockingOutlineSharp
      class={"absolute transition-all w-5 h-5 " +
        ($autoRedirect ? "opacity-0" : "opacity-100")}
    />
    <AppShortcutOutlineSharp
      class={"absolute transition-all w-5 h-5 " +
        ($autoRedirect ? "opacity-100" : "opacity-0")}
    />
    <span class="sr-only">Toggle theme</span>
  </Button>
  </nav>
</div>
