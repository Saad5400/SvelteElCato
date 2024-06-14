<script lang="ts">
  import type { PageData } from "./$types";
  import { Separator } from "$lib/components/ui/separator";
  import Calendar from "virtual:icons/f7/Calendar";
  import Clock from "virtual:icons/f7/Clock";
  import Eye from "virtual:icons/f7/Eye";
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import Article from "$lib/components/Article.svelte";

  export let data: PageData;

  $: route = $page.route.id;
  $: if (route === "/posts/[urlName]") {
    setTimeout(async () => {
      await data.pb.send(`/api/posts/views/${data.post.id}`, {
        method: "POST",
      });
    }, 10);
  }

  onMount(() => {
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
</script>

<svelte:head>
  <title>
    {data.post.displayName}
  </title>
</svelte:head>

<div class="container flex-1">
  <div class="mb-8 text-center text-accent-foreground/90">
    <h2>
      {data.post.displayName}
    </h2>
    <Separator class="mb-1 mt-4" />
    <small class="flex min-w-40 flex-row items-center justify-between">
      <span class="flex flex-row justify-start gap-1">
        <Calendar class="h-3 w-3" />
        {data.post.updated.toLocaleDateString()}
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
  <Article content={data.post.content} class="overflow-x-clip" />
</div>
