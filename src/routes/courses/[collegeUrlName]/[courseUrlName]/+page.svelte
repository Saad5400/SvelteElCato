<script lang="ts">
    import type {PageData} from './$types';
    import Course from "$lib/models/Course";
    import CardsGrid from "$lib/components/cardsView/CardsGrid.svelte";
    import Card from "$lib/components/cardsView/Card.svelte";
    import {Separator} from "$lib/components/ui/separator";

    export let data: PageData;
    console.log(data);
    const course = new Course(data.course);
</script>

<div class="container">
    <h1>
        {course.displayName}
    </h1>
    <Separator class="my-4 opacity-0"/>
    <CardsGrid title="المسارات">
        {#each course.tracks as track}
            <Card
                    title={track.displayName}
                    subtitle={track.description}
                    href={`./${track.id}`}
            />
        {/each}
    </CardsGrid>
</div>