<script lang="ts">
  import { toggleMode } from "mode-watcher";
  import { Button } from "$lib/components/ui/button";
  import Moon from "virtual:icons/f7/MoonStars";
  import Sun from "virtual:icons/f7/SunMax";
  import Speaker from "virtual:icons/f7/Speaker";
  import Speaker2 from "virtual:icons/f7/Speaker-2";
  import AppShortcutOutlineSharp from "virtual:icons/material-symbols-light/AppShortcutOutlineSharp";
  import AppBlockingOutlineSharp from "virtual:icons/material-symbols-light/AppBlockingOutlineSharp";
  import PersonCircle from "virtual:icons/f7/PersonCircle";
  import { persisted } from "svelte-persisted-store";
  import IconButton from "$lib/components/IconButton.svelte";

  const allowSound = persisted("allowSound", true as boolean);
  const autoRedirect = persisted("autoRedirect", true as boolean);
</script>

<div class="flex">
  <IconButton text="التحويل التلقائي للروابط الخارجية">
    <Button
      on:click={() => autoRedirect.update((value) => !value)}
      variant="ghost"
      size="icon"
    >
      <AppBlockingOutlineSharp
        class={"absolute h-5 w-5 transition-all " +
          ($autoRedirect ? "opacity-0" : "opacity-100")}
      />
      <AppShortcutOutlineSharp
        class={"absolute h-5 w-5 transition-all " +
          ($autoRedirect ? "opacity-100" : "opacity-0")}
      />
    </Button>
  </IconButton>
  <IconButton text="الصوت">
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
    </Button>
  </IconButton>
  <IconButton text="الثيم">
    <Button on:click={toggleMode} variant="ghost" size="icon">
      <Sun
        class="absolute rotate-0 scale-100 duration-500 dark:rotate-90 dark:scale-0"
      />
      <Moon
        class="absolute rotate-90 scale-0 duration-500 dark:rotate-0 dark:scale-100"
      />
    </Button>
  </IconButton>
  <IconButton text="الحساب">
    <Button variant="ghost" size="icon">
      <PersonCircle />
    </Button>
  </IconButton>
</div>
