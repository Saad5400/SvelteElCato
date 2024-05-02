<script>
  import navStore from "$lib/stores/navStore";
  import Menu from "virtual:icons/f7/Menu";
  import * as Sheet from "$lib/components/ui/sheet";
  import { Button } from "$lib/components/ui/button";
  import NavItems from "$lib/components/navbar/NavItems.svelte";
</script>

{#if $navStore.title && $navStore.items.length > 0}
  <div class="contents lg:hidden">
    <Sheet.Root bind:open={$navStore.open}>
      <Sheet.Trigger>
        <Button size="icon" variant="ghost">
          <!-- <Menu class="h-4 w-4"/> -->
          <Menu />
        </Button>
      </Sheet.Trigger>
      <Sheet.Content>
        <Sheet.Header>
          <Sheet.Title class="text-center">
            {$navStore.title}
          </Sheet.Title>
          <Sheet.Description
            class="max-h-[calc(100dvh-5rem)]  overflow-y-auto pe-2 text-accent-foreground"
          >
            <NavItems />
          </Sheet.Description>
        </Sheet.Header>
      </Sheet.Content>
    </Sheet.Root>
  </div>
{/if}
