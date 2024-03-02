<script lang="ts">
    import type {PageData} from './$types';
    import {Button} from "$lib/components/ui/button";

    export let data: PageData;
</script>

<svelte:head>
    <title>
        {data.course.displayName} {data.track.displayName}: {data.step.displayName}
    </title>
</svelte:head>

{#if data.step.type === "youtube"}
    <iframe src={data.step.linked}
            class="flex-1 min-h-screen-without-navbar"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
    />
{:else if data.isExternal}
    <div class="flex-1 flex flex-col items-center justify-center min-h-screen-without-navbar">
        هذا الدرس يحتوي رابط خارجي
        <br/>
        سيتم نقلك تلقائياً إلى الصفحة المطلوبة
        <div>
            او
            <Button href={data.step.linked} target="_blank" rel="noopener noreferrer" variant="link"
                    on:click={() => data.redirectTime = -1}>
                اضغط هنا للانتقال مباشرة
            </Button>
        </div>
    </div>
{/if}