<script lang="ts">
    import Hero from "$lib/components/index/Hero.svelte";
    import Posts from "$lib/components/index/Posts.svelte";
    import type {PageData} from './$types';
    import Card from "$lib/components/cardsView/Card.svelte";
    import CardsGrid from "$lib/components/cardsView/CardsGrid.svelte";
    import Course from "$lib/models/Course";
    import {Separator} from "$lib/components/ui/separator";

    export let data: PageData;
</script>

<div class="container mb-20">
    <Hero/>
    <Separator class="my-20 opacity-0"/>
    <!-- Courses -->
    <CardsGrid id="courses" title="الدورات">
        {#each data.courses as course}
            <Card
                href="courses/{course.college.urlName}/{course.urlName}"
                title={course.displayName}
                subtitle={course.college.displayName}
                description={course.description}
            />
        {/each}
    </CardsGrid>

    <!-- Posts -->
    <Posts posts={data.posts}/>
</div>