<script lang="ts">
  import navStore from "$lib/stores/navStore";
  import Menu from "virtual:icons/f7/Menu";
  import * as Sheet from "$lib/components/ui/sheet";
  import * as Dialog from "$lib/components/ui/dialog";
  import { Button } from "$lib/components/ui/button";
  import NavItems from "$lib/components/navbar/NavItems.svelte";
  import questionsStore from "$lib/stores/questionsStore";
  import { page } from "$app/stores";
  import { get } from "svelte/store";
  import BetweenLines from "$lib/components/BetweenLines.svelte";

  let questionsNav: HTMLElement;
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
{:else if $questionsStore.title && $questionsStore.items.length > 0}
  <Dialog.Root bind:open={$questionsStore.open}>
    <Dialog.Trigger>
      <Button
        size="icon"
        variant="ghost"
        on:click={() =>
          setTimeout(
            () =>
              questionsNav
                .getElementsByClassName("active")[0]
                ?.scrollIntoView({ block: "center" }),
            100,
          )}
      >
        <Menu />
      </Button>
    </Dialog.Trigger>
    <Dialog.Content class="max-w-[min(90dvw,30rem)]">
      <Dialog.Header>
        <Dialog.Title>
          {$questionsStore.title}
        </Dialog.Title>
        <nav
          class="flex max-h-[40rem] w-fit flex-row flex-wrap items-center justify-center gap-2 overflow-y-auto"
          bind:this={questionsNav}
        >
          {#each $questionsStore.items as item}
            {@const active = $page.url.href.includes(item.href)}
            {#if item.href}
              <Button
                href={item.href}
                class={"flex h-12 w-12 items-center justify-center text-sm font-medium " +
                  (active ? "active " : "") +
                  item.class}
                on:click={() =>
                  questionsStore.set({ ...get(questionsStore), open: false })}
              >
                {item.title}
              </Button>
            {:else}
              <BetweenLines class="my-2 pe-4">
                {item.title}
              </BetweenLines>
            {/if}
          {/each}
        </nav>
      </Dialog.Header>
    </Dialog.Content>
  </Dialog.Root>
{/if}
