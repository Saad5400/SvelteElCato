<script lang="ts">
    import type {PageData} from './$types';
    import Course from "$lib/models/Course";
    import CardsGrid from "$lib/components/cardsView/CardsGrid.svelte";
    import Card from "$lib/components/cardsView/Card.svelte";
    import {Separator} from "$lib/components/ui/separator";
    import {page} from "$app/stores";

    export let data: PageData;
</script>

<div class="container">
    <h1>
        {data.course.displayName}
    </h1>
    <Separator class="my-4 opacity-0"/>
    <CardsGrid title="المسارات">
        {#each data.course.tracks as track}
            <Card
                    title={track.displayName}
                    subtitle={track.description}
                    href={`/courses/${$page.params.collegeUrlName}/${$page.params.courseUrlName}/${track.urlName}`}
                    dataSveltekitPreloadData="tap"
            />
        {/each}
    </CardsGrid>
</div>