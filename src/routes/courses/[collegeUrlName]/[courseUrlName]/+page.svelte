<script lang="ts">
    import type {PageData} from './$types';
    import CardsGrid from "$lib/components/cardsView/CardsGrid.svelte";
    import Card from "$lib/components/cardsView/Card.svelte";
    import {Separator} from "$lib/components/ui/separator";
    import {page} from "$app/stores";

    export let data: PageData;
</script>

<svelte:head>
    <title>
        {data.course.displayName}
    </title>
</svelte:head>

<div class="container">
    <h1>
        {data.course.displayName}
    </h1>
    <Separator class="my-4 opacity-0"/>
    <CardsGrid title="المسارات">
        {#each data.course.tracks as track}
            <!-- TODO: redirect to the last visited step -->
            <Card
                    title={track.displayName}
                    subtitle={track.description}
                    href={`/courses/${$page.params.collegeUrlName}/${$page.params.courseUrlName}/${track.urlName}`}
                    dataSveltekitPreloadData="off"
            />
        {/each}
    </CardsGrid>
</div>