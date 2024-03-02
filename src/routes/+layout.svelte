<script lang="ts">
    import "../app.pcss";
    import {ModeWatcher} from "mode-watcher";
    import Navbar from "$lib/components/Navbar.svelte";
    import {ProgressBar} from "@prgm/sveltekit-progress-bar";
    import {Toaster} from "$lib/components/ui/sonner";
</script>

<svelte:head>
    <link rel="preload"
          href="/fonts/Handjet.ttf"
          as="font"
          type="font/ttf"
          crossorigin="anonymous">
</svelte:head>

<ModeWatcher/>

<Toaster class="max-w-[20rem]"/>
<ProgressBar class="text-accent-foreground" zIndex={100}/>
<Navbar>
    <slot/>
</Navbar>
