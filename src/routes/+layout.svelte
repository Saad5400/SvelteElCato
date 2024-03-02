<script>
    import "../app.pcss";
    import {ModeWatcher} from "mode-watcher";
    import Navbar from "$lib/components/Navbar.svelte";
    import {ProgressBar} from "@prgm/sveltekit-progress-bar";
</script>

<ModeWatcher/>

<Navbar/>
<ProgressBar class="text-accent-foreground" zIndex={100}/>
<slot/>
