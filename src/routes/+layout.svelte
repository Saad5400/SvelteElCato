<script lang="ts">
  import "../app.pcss";
  import { ModeWatcher } from "mode-watcher";
  import Navbar from "$lib/components/navbar/Navbar.svelte";
  import { Toaster } from "$lib/components/ui/sonner";
  import { injectSpeedInsights } from "@vercel/speed-insights/sveltekit";
  import { inject as injectAnalytics } from "@vercel/analytics";
  import usePageTransition from "$lib/hooks/usePageTransition";
  import { ProgressBar } from "@prgm/sveltekit-progress-bar";
  import type { LayoutData } from "./$types";
  import IntroVideo from "$lib/components/IntroVideo.svelte";
  import { PUBLIC_ENVIRONMENT } from "$env/static/public";
  import { onMount } from "svelte";
  import useBrowserFingerprint from "$lib/hooks/useBrowserFingerprint";
  import type FingerPrint from "$lib/models/FingerPrint";


  usePageTransition();
  injectSpeedInsights();
  injectAnalytics();

  export let data: LayoutData;

  onMount(async () => {
    if (data.user) {
      const fp = useBrowserFingerprint({
        enableScreen: true,
        enableWebgl: true,
        hardwareOnly: true
      });

      if (!data.fps.find((f: FingerPrint) => f.fp == fp.fp.toString())) {
        await data.pb.collection("fingerprints").create({
          user: data.user.id,
          fp: fp.fp,
          data: fp.data,
        });
      }
    }
  });
</script>

<ModeWatcher disableTransitions={false} defaultMode="dark" />
<Toaster class="max-w-[20rem]" />
<ProgressBar zIndex={50} />
<Navbar user={data.user} />
<slot />
