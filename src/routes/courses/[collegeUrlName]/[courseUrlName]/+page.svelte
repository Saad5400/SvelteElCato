<script lang="ts">
  import type { PageData } from "./$types";
  import CardsGrid from "$lib/components/cardsView/CardsGrid.svelte";
  import Card from "$lib/components/cardsView/Card.svelte";
  import { Separator } from "$lib/components/ui/separator";
  import { page } from "$app/stores";

  export let data: PageData;
</script>

<svelte:head>
  <title>
    {data.course.displayName}
  </title>
</svelte:head>

<div class="container mb-16 flex flex-col gap-8 first:gap-16">
  <h1>
    {data.course.displayName}
  </h1>
  <CardsGrid title="المسارات">
    {#each data.course.tracks as track}
      <!-- TODO: redirect to the last visited step -->
      <Card
        subtitle={track.description}
        href={`/courses/${$page.params.collegeUrlName}/${$page.params.courseUrlName}/${track.urlName}`}
      >
        {track.displayName}
      </Card>
    {/each}
  </CardsGrid>
  <CardsGrid title="الاختبارات">
    {#each data.course.quizzes as quiz}
      <Card href={quiz.url(data.course)}>
        {quiz.displayName}
      </Card>
    {/each}
  </CardsGrid>
</div>
