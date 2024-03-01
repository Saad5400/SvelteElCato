<script>
    import "../app.pcss";
    import {ModeWatcher} from "mode-watcher";
    import Navbar from "$lib/components/Navbar.svelte";
</script>

<ModeWatcher/>

<Navbar/>
<slot/>
