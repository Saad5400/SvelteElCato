<script lang="ts">
    import Hero from "$lib/components/index/Hero.svelte";
    import Posts from "$lib/components/index/Posts.svelte";
    import type { PageData } from "./$types";
    import Card from "$lib/components/cardsView/Card.svelte";
    import CardsGrid from "$lib/components/cardsView/CardsGrid.svelte";
    import { Separator } from "$lib/components/ui/separator";
    import { onMount } from "svelte";

    export let data: PageData;
</script>

<svelte:head>
    <title>الصفحة الرئيسية</title>
</svelte:head>

<div
    class="repeating-text repeating-text-light dark:repeating-text-dark min-h-screen blur-[1px]"
/>
<div class="container mb-20">
    <Hero />
    <Separator class="my-20 opacity-0" />
    <!-- Courses -->
    <CardsGrid id="courses" title="الدورات">
        {#each data.courses as course}
            <Card
                href="/courses/{course.college.urlName}/{course.urlName}"
                subtitle={course.college.displayName}
                description={course.description}
            >
                {course.displayName}
            </Card>
        {/each}
    </CardsGrid>

    <!-- Posts -->
    <Posts posts={data.posts} />
</div>

<style>
    .repeating-text {
        @apply bg-repeat w-[100dvw] absolute left-0 top-0 -z-10 opacity-40 pointer-events-none;
    }
</style>
