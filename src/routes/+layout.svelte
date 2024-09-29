<script lang="ts">
  import "../app.pcss";
  import { ModeWatcher } from "mode-watcher";
  import Navbar from "$lib/components/navbar/Navbar.svelte";
  import { Toaster } from "$lib/components/ui/sonner";
  import usePageTransition from "$lib/hooks/usePageTransition";
  import { ProgressBar } from "@prgm/sveltekit-progress-bar";
  import type { LayoutData } from "./$types";


  usePageTransition();

  export let data: LayoutData;
</script>

<ModeWatcher disableTransitions={false} defaultMode="dark" />
<Toaster class="max-w-[20rem]" />
<ProgressBar zIndex={50} />
<Navbar user={data.user} />
<slot />
