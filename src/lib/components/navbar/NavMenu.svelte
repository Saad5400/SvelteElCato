<script lang="ts">
  import Menu from "virtual:icons/line-md/Menu";
  import { Button } from "$lib/components/ui/button";
  import IconButton from "$lib/components/IconButton.svelte";
  import menu from "$lib/stores/menu";
</script>

{#if $menu}
  <div class={$menu?.class ? $menu.class : "lg:hidden"}>
    <IconButton text="القائمة">
      <Button size="icon" variant="ghost" on:click={menu.open}>
        <Menu />
      </Button>
    </IconButton>
  </div>
{/if}
