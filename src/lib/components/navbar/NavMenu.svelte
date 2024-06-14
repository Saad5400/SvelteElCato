<script lang="ts">
  import Menu from "virtual:icons/line-md/Menu";
  import { Button } from "$lib/components/ui/button";
  import IconButton from "$lib/components/IconButton.svelte";
  import menu from "$lib/stores/menu";

  function toggleOpen() {
    menu.update((prev) => ({
      open: !prev?.open,
    }));
  }
</script>

{#if $menu}
  <div class="md:hidden">
    <IconButton text="القائمة">
      <Button size="icon" variant="ghost" on:click={toggleOpen}>
        <Menu />
      </Button>
    </IconButton>
  </div>
{/if}
