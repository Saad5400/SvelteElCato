<script lang="ts">
    import type {PageData} from './$types';
    import {onDestroy, onMount} from "svelte";
    import {page} from "$app/stores";
    import {Button} from "$lib/components/ui/button";

    export let data: PageData;
    let redirectInterval: NodeJS.Timeout;

    if (data.isExternal) {
        redirectInterval = setInterval(() => {
            if (data.redirectTime > 0) data.redirectTime--;
            if (data.redirectTime === 0) {
                console.log("Opening external link", data.step.linked);
                const tab = window.open(data.step.linked, "external");
                if (tab) tab.focus();
                data.redirectTime = -1;
            }
        }, 1000);
    }

    onDestroy(() => {
        clearInterval(redirectInterval);
    });
</script>

{#if data.step.type === "youtube"}
    <iframe src={data.step.linked}
            class="flex-1"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
    />
{:else if data.isExternal}
    <div class="flex-1 flex flex-col items-center justify-center">
        هذه الصفحة تحتوي على رابط خارجي
        {#if data.redirectTime > 0}
            سيتم فتحه في
            {data.redirectTime}
        {/if}
        <div>
            او
            <Button href={data.step.linked} target="_blank" rel="noopener noreferrer" variant="link"
                    on:click={() => data.redirectTime = -1}>
                اضغط هنا للانتقال مباشرة
            </Button>
        </div>
    </div>
{/if}