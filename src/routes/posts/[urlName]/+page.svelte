<script lang="ts">
  import type { PageData } from "./$types";
  import { Separator } from "$lib/components/ui/separator";
  import Calendar from "virtual:icons/f7/Calendar";
  import Clock from "virtual:icons/f7/Clock";
  import Eye from "virtual:icons/f7/Eye";
  import { onDestroy, onMount } from "svelte";
  import { page } from "$app/stores";
  import Article from "$lib/components/Article.svelte";
  import menu from "$lib/stores/menu";
  import { Button } from "$lib/components/ui/button";
  // @ts-ignore
  import * as Sheet from "$lib/components/ui/sheet";
  import useScrollTo from "$lib/hooks/useScrollTo";

  export let data: PageData;

  $: if ($page?.route?.id) {
    setTimeout(async () => {
      await data.pb.send(`/api/posts/views/${data.post.id}`, {
        method: "POST",
      });
    }, 10);
  }

  onMount(() => {
    if (data.navItems.length > 0) {
      menu.set({ open: false, class: "lg:hidden" });
    }

    if (location && location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100);
      }
    }
  });

  onDestroy(() => {
    menu.set(null);
  });
</script>

<svelte:head>
  <title>
    {data.post.displayName}
  </title>
</svelte:head>

<Sheet.Root
  open={$menu?.open}
  onOpenChange={(e) => {
    menu.update((state) => {
      return { ...state, open: e };
    });
  }}
>
  <Sheet.Content class="flex flex-col items-center gap-2 overflow-y-auto">
    <h3 class="mb-2">محتويات المنشور</h3>
    {#each data.navItems as item}
      <Button
        href={item.href}
        on:click={() => {
          menu.update((state) => {
            return { ...state, open: false };
          });
        }}
        class="flex w-full flex-wrap justify-start"
      >
        {item.title}
      </Button>
    {/each}
  </Sheet.Content>
</Sheet.Root>
<div class="flex flex-row">
  <div class="hidden min-w-[25rem] pe-4 lg:block">
    <nav
      class="fixed flex max-h-[calc(100dvh-5rem)] w-[25rem] flex-col items-center gap-2 overflow-y-auto overflow-x-clip border-e-2"
    >
      <h3 class="mb-2">محتويات المنشور</h3>
      {#each data.navItems as item}
        <Button
          on:click={() => useScrollTo(item.href)}
          class="flex w-[23rem] flex-wrap justify-start"
        >
          {item.title}
        </Button>
      {/each}
      <br />
    </nav>
  </div>
  <main class="container flex-1">
    <div class="mb-8 text-center text-accent-foreground/90">
      <h2>
        {data.post.displayName}
      </h2>
      <Separator class="mb-1 mt-4" />
      <small class="flex min-w-40 flex-row items-center justify-between">
        <span class="flex flex-row justify-start gap-1">
          <Calendar class="h-3 w-3" />
          {new Date(data.post.created).toLocaleDateString()}
        </span>
        <span class="flex flex-row items-center justify-center gap-2">
          <span class="flex flex-row items-center justify-center gap-1">
            <Clock class="h-3 w-3" />
            {data.post.readTime}
          </span>
          <span class="flex flex-row items-center justify-center gap-1">
            <Eye class="h-3 w-3" />
            {data.post.views}
          </span>
        </span>
      </small>
    </div>
    <br />
    <Article
      content={data.post.content}
      class="overflow-x-clip lg:[&>*]:max-w-[calc(100dvw-30rem)]"
    />
  </main>
</div>
