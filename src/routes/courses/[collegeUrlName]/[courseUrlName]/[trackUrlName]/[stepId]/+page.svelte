<script lang="ts">
  import type { PageData } from "./$types";
  import { Button } from "$lib/components/ui/button";
  import { onDestroy } from "svelte";
  import { page } from "$app/stores";
  import { browser } from "$app/environment";
  import Article from "$lib/components/Article.svelte";
  import useHighlight from "$lib/hooks/useHighlight";
  import * as Tabs from "$lib/components/ui/tabs";

  export let data: PageData;

  let timeout: any;
  const libraryId = 253444;

  function setTimeoutToRedirect() {
    if (!browser || data.step.type !== "external") return;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      open(data.step.linked, "_blank");
    }, 500);
  }

  onDestroy(() => {
    clearTimeout(timeout);
  });

  $: if ($page.params.stepId && data.step.type === "external")
    setTimeoutToRedirect();
</script>

<svelte:head>
  <title>
    {data.course.displayName}
    {data.track.displayName}: {data.step.displayName}
  </title>
</svelte:head>

<div class="min-h-screen-without-navbar flex w-full flex-col">
  <div class="mx-4 flex aspect-video">
    {#if data.step.type === "youtube"}
      <iframe
        src={data.step.linked}
        class="h-full w-full flex-1"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      />
    {:else if data.step.type === "external"}
      <div
        class="flex h-full w-full flex-1 flex-col items-center justify-center text-center"
      >
        هذا الدرس يحتوي رابط خارجي
        <br />
        سيتم نقلك تلقائياً إلى الصفحة المطلوبة
        <div>
          او
          <Button
            href={data.step.linked}
            target="_blank"
            rel="noopener noreferrer"
            variant="link"
          >
            اضغط هنا للانتقال مباشرة
          </Button>
        </div>
      </div>
    {:else if data.step.type === "bunny"}
      <div class="relative w-full pt-[56.25%]">
        <iframe
          title="Video"
          src="https://iframe.mediadelivery.net/embed/{libraryId}/{data.step
            .linked}?token={data.hash}&expires={data.expires}&autoplay=false&loop=false&muted=false&preload=true&responsive=true"
          loading="lazy"
          style="border:0;position:absolute;top:0;height:100%;width:100%;"
          allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;"
          allowfullscreen={true}
        ></iframe>
      </div>
    {:else if data.step.type === "post"}
      <Article content={useHighlight(data.step.description)} />
    {/if}
  </div>

  {#if data.step.description && data.step.type !== "post"}
    <Tabs.Root
      value="description"
      class="mx-auto mb-32 w-full max-w-[100dvw] p-2 md:mx-4 md:w-auto"
    >
      <Tabs.List class="w-full">
        <Tabs.Trigger value="description" class="w-full">الوصف</Tabs.Trigger>
        <Tabs.Trigger value="comments" class="w-full">التعليقات</Tabs.Trigger>
      </Tabs.List>
      <div
        class="mt-2 rounded-lg border-b-8 border-l-8 border-accent-foreground/20 bg-input p-2"
      >
        <Tabs.Content value="description">
          <Article content={useHighlight(data.step.description)} />
        </Tabs.Content>
        <Tabs.Content value="comments">لا يوجد تعليقات</Tabs.Content>
      </div>
    </Tabs.Root>
  {/if}
</div>
