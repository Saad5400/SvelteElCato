<script lang="ts">
  import "../app.pcss";
  import { ModeWatcher } from "mode-watcher";
  import Navbar from "$lib/components/navbar/Navbar.svelte";
  import { Toaster } from "$lib/components/ui/sonner";
  import { injectSpeedInsights } from "@vercel/speed-insights/sveltekit";
  import { inject as injectAnalytics } from "@vercel/analytics";
  import usePageTransition from "$lib/hooks/usePageTransition";
  import InitLoading from "./InitLoading.svelte";
  import { ProgressBar } from "@prgm/sveltekit-progress-bar";
  import type { LayoutData } from "./$types";

  usePageTransition();
  injectSpeedInsights();
  injectAnalytics();

  export let data: LayoutData;
</script>

<ModeWatcher disableTransitions={false} defaultMode="dark" />
<Toaster class="max-w-[20rem]" />
<ProgressBar zIndex={50} />
<Navbar user={data.user} />
<slot />
