<script lang="ts">
    import type {PageData} from './$types';
    import Course from "$lib/models/Course";
    import CardsGrid from "$lib/components/cardsView/CardsGrid.svelte";
    import Card from "$lib/components/cardsView/Card.svelte";

    export let data: PageData;
    const course = new Course(data.course);
</script>

<div class="container">
    <h1>
        {course.displayName}
    </h1>
    <CardsGrid title="المسارات">
    </CardsGrid>
</div>