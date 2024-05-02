<script lang="ts">
  import type { PageData } from "./$types";
  import { Button } from "$lib/components/ui/button";
  import { onDestroy, onMount } from "svelte";
  import { page } from "$app/stores";
  import { browser } from "$app/environment";
  import Article from "$lib/components/Article.svelte";
  import useHighlight from "$lib/hooks/useHighlight";
  import { persisted } from "svelte-persisted-store";
  import AppBlockingOutlineSharp from "virtual:icons/material-symbols-light/AppBlockingOutlineSharp";

  export let data: PageData;

  let timeout: any;
  const autoRedirect = persisted("autoRedirect", true as boolean);

  function setTimeoutToRedirect() {
    if (!browser || !$autoRedirect) return;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      open(data.step.linked, "_blank");
    }, 500);
  }

  const unsubscribe = autoRedirect.subscribe((value) => {
    if (value) setTimeoutToRedirect();
    else clearTimeout(timeout);
  });

  onDestroy(() => {
    unsubscribe();
    clearTimeout(timeout);
  });

  $: stepId = $page.params.stepId;
  $: if (stepId && data.isExternal) setTimeoutToRedirect();
</script>

<svelte:head>
  <title>
    {data.course.displayName}
    {data.track.displayName}: {data.step.displayName}
  </title>
</svelte:head>

<div class="min-h-screen-without-navbar flex w-full flex-col">
  <div class="flex h-full max-h-[calc(100dvh-20rem)] w-full flex-1">
    {#if data.step.type === "youtube"}
      <iframe
        src={data.step.linked}
        class="h-full w-full flex-1"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      />
    {:else if data.isExternal}
      <div
        class="flex h-full w-full flex-1 flex-col items-center justify-center text-center"
      >
        هذا الدرس يحتوي رابط خارجي
        <br />
        {#if $autoRedirect}
          سيتم نقلك تلقائياً إلى الصفحة المطلوبة
        {:else}
          <div>
            لقد تم تعطيل التحويل التلقائي، اضغط على <AppBlockingOutlineSharp
              class="inline h-5 w-5"
            /> أعلى يسار الصفحة لتفعيل التحويل التلقائي
          </div>
        {/if}
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
    {/if}
  </div>

  {#if data.step.description}
    <div class="max-w-[100dvw] border-t-2 p-4">
      <Article content={useHighlight(data.step.description)} />
    </div>
  {/if}
</div>
