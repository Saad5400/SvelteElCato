<script lang="ts">
  import { toggleMode } from "mode-watcher";
  import { Button } from "$lib/components/ui/button";
  import Moon from "virtual:icons/line-md/Moon";
  import Sun from "virtual:icons/line-md/SunnyOutline";
  import Speaker from "virtual:icons/f7/Speaker";
  import Speaker2 from "virtual:icons/f7/Speaker-2";
  import Account from "virtual:icons/line-md/Account";
  import AccountAlertLoop from "virtual:icons/line-md/AccountAlertLoop";
  import Login from "virtual:icons/line-md/Login";
  import { persisted } from "svelte-persisted-store";
  import IconButton from "$lib/components/IconButton.svelte";
  import { pb } from "$lib/pocketbase";
  import type { AuthModel } from "pocketbase";

  export let user: AuthModel;

  const allowSound = persisted("allowSound", true as boolean);
</script>

<div class="flex">
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
  <IconButton text="المظهر">
    <Button on:click={toggleMode} variant="ghost" size="icon">
      <Sun
        class="absolute rotate-0 scale-100 duration-500 dark:rotate-90 dark:scale-0"
      />
      <Moon
        class="absolute rotate-90 scale-0 duration-500 dark:rotate-0 dark:scale-100"
      />
    </Button>
  </IconButton>
  {#if user}
    <IconButton text="الحساب">
      <Button variant="ghost" size="icon" href="/profile">
        <Account />
      </Button>
    </IconButton>
  {:else}
    <IconButton text="تسجيل الدخول">
      <Button variant="ghost" size="icon" href="/auth/login">
        <Login />
      </Button>
    </IconButton>
  {/if}
</div>
