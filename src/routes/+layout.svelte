<script lang="ts">
    import "../app.pcss";
    import { ModeWatcher } from "mode-watcher";
    import Navbar from "$lib/components/Navbar.svelte";
    import { ProgressBar } from "@prgm/sveltekit-progress-bar";
    import { Toaster } from "$lib/components/ui/sonner";
    import { injectSpeedInsights } from "@vercel/speed-insights/sveltekit";
    import { inject as injectAnalytics } from "@vercel/analytics";
    import usePageTransition from "$lib/hooks/usePageTransition";

    usePageTransition();
    injectSpeedInsights();
    injectAnalytics();
</script>

<ModeWatcher />

<Toaster class="max-w-[20rem]" />
<ProgressBar class="text-accent-foreground" zIndex={100} />
<Navbar>
    <slot />
</Navbar>
