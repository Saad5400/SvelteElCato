<script lang="ts">
  import Menu from "virtual:icons/line-md/Menu";
  import { Button } from "$lib/components/ui/button";
  import IconButton from "$lib/components/IconButton.svelte";
  import menu from "$lib/stores/menu";

  function openMenu() {
    menu.update((prev) => ({
      ...prev,
      open: true,
    }));
  }
</script>

{#if $menu}
  <div class={$menu.alwaysShow ? "" : "md:hidden"}>
    <IconButton text="القائمة">
      <Button size="icon" variant="ghost" on:click={openMenu}>
        <Menu />
      </Button>
    </IconButton>
  </div>
{/if}
