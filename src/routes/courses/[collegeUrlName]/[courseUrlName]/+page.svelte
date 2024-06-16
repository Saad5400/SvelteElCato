<script lang="ts">
  import type { PageData } from "./$types";
  import CardsGrid from "$lib/components/cardsView/CardsGrid.svelte";
  import Card from "$lib/components/cardsView/Card.svelte";
  import { page } from "$app/stores";
  import { quizFirstQuestionUrl } from "$lib/models/Quiz";
  import { courseUrl } from "$lib/models/Course";
  import { Separator } from "$lib/components/ui/separator";

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
      {#each data.course.expand.tracks as track}
        {@const hasAccess =
          track.expand?.steps.some((step) => step.isFree) ||
          data.user?.registeredCourses.includes(data.course.id)}
        <!-- TODO: redirect to the last visited step -->
        <Card
          subtitle={track.description}
          href={`/courses/${$page.params.collegeUrlName}/${$page.params.courseUrlName}/${track.urlName}`}
          class="h-auto {hasAccess || 'disabled'}"
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
      <Card
        href={`${courseUrl(data.course)}/quizzes/random`}
        class="col-span-full h-fit {data.allQuestions.length === 0 &&
          'disabled'}"
      >
        جميع الأسئلة عشوائيا
      </Card>
      <Separator class="col-span-full" />
      {#each data.course.expand.quizzes as quiz}
        {@const hasAccess =
          !quiz.isFree &&
          !data.user?.registeredCourses.includes(data.course.id)}
        <Card
          href={quizFirstQuestionUrl(quiz, data.course)}
          class="h-auto {hasAccess && 'disabled'}"
        >
          {quiz.displayName}
        </Card>
      {/each}
    </CardsGrid>
  {/if}
</div>
