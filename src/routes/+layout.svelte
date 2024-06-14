<script lang="ts">
  import "../app.pcss";
  import { ModeWatcher } from "mode-watcher";
  import Navbar from "$lib/components/navbar/Navbar.svelte";
  import { ProgressBar } from "@prgm/sveltekit-progress-bar";
  import { Toaster } from "$lib/components/ui/sonner";
  import { injectSpeedInsights } from "@vercel/speed-insights/sveltekit";
  import { inject as injectAnalytics } from "@vercel/analytics";
  import usePageTransition from "$lib/hooks/usePageTransition";
  import user from "$lib/stores/user";
  import InitLoading from "$lib/components/InitLoading.svelte";
  import { page } from "$app/stores";

  usePageTransition();
  injectSpeedInsights();
  injectAnalytics();
</script>

<InitLoading />
<ModeWatcher disableTransitions={false} defaultMode="dark" />
<Toaster class="max-w-[20rem]" />
<ProgressBar class="text-accent-foreground" zIndex={100} />
<Navbar user={$user}>
  <slot />
</Navbar>
