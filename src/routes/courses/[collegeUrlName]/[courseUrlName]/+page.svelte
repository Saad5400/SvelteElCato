<script lang="ts">
  import type { PageData } from "./$types";
  import CardsGrid from "$lib/components/cardsView/CardsGrid.svelte";
  import Card from "$lib/components/cardsView/Card.svelte";
  import { page } from "$app/stores";
  import useClass from "$lib/hooks/useClass";

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
  {#if data.course.tracks && data.course.tracks.length > 0}
    <CardsGrid title="المسارات">
      {#each data.course.tracks as track}
        <!-- TODO: redirect to the last visited step -->
        <Card
          subtitle={track.description}
          href={`/courses/${$page.params.collegeUrlName}/${$page.params.courseUrlName}/${track.urlName}`}
          class={useClass(
            !track.hasFree &&
              !data.user?.registeredCourses.includes(data.course.id),
            "disabled",
            "h-auto",
          )}
        >
          {track.displayName}
        </Card>
      {/each}
    </CardsGrid>
  {/if}
  {#if data.course.quizzes && data.course.quizzes.length > 0}
    <CardsGrid title="الاختبارات">
      <!--{#if $markedStore.filter((id) => data.questions.includes(id)).length > 0}-->
      <!--  <Card-->
      <!--    href={`${data.course.url()}/quizzes/marked/${$markedStore.filter((id) => data.questions.includes(id))[0]}`}-->
      <!--    class="marked col-span-full h-fit"-->
      <!--  >-->
      <!--    الأسئلة المُعلمه-->
      <!--  </Card>-->
      <!--{/if}-->
      <!--<Card-->
      <!--  href={`${data.course.url()}/quizzes/random`}-->
      <!--  class={useClass(-->
      <!--    data.questions.every((id) => $solvedStore.includes(id)),-->
      <!--    "correct",-->
      <!--    "col-span-full h-fit",-->
      <!--  )}-->
      <!--&gt;-->
      <!--  جميع الأسئلة عشوائيا-->
      <!--</Card>-->
      <!--<Separator class="col-span-full" />-->
      {#each data.course.quizzes as quiz}
        <Card
          href={quiz.url(data.course)}
          class={useClass(
            !quiz.isFree &&
              !data.user?.registeredCourses.includes(data.course.id),
            "disabled",
            "h-auto",
          )}
        >
          {quiz.displayName}
        </Card>
      {/each}
    </CardsGrid>
  {/if}
</div>
