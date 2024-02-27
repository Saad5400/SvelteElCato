<script>
    import "../app.pcss";
    import {ModeWatcher} from "mode-watcher";
    import Navbar from "$lib/components/navbar/Navbar.svelte";

    import Hacking from "$lib/components/index/Hacking.svelte";

    let isHacking = true;

    setTimeout(() => {
        isHacking = false;
    }, 1500);
</script>

<ModeWatcher/>
{#if isHacking}
    <Hacking/>
{:else}
    <Navbar title="الرئيسية" url="/"/>
    <slot/>
{/if}
