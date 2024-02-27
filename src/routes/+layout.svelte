<script>
    import "../app.pcss";
    import {ModeWatcher} from "mode-watcher";
    import Navbar from "$lib/components/navbar/Navbar.svelte";

    import Hacking from "$lib/components/index/Hacking.svelte";
    import StaticTV from "$lib/components/index/StaticTV.svelte";

    let isHacking = true;
    let isStaticTV = false;

    setTimeout(() => {
        isHacking = false;
        isStaticTV = true;
        setTimeout(() => {
            isStaticTV = false;
        }, 500);
    }, 2500);
</script>

<ModeWatcher/>
{#if isHacking}
    <Hacking/>
{:else if isStaticTV}
    <StaticTV/>
{:else}
    <Navbar title="الرئيسية" url="/"/>
    <slot/>
{/if}
