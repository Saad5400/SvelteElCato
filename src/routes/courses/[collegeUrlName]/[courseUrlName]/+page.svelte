<script lang="ts">
  import type { PageData } from "./$types";
  import CardsGrid from "$lib/components/cardsView/CardsGrid.svelte";
  import Card from "$lib/components/cardsView/Card.svelte";
  import { page } from "$app/stores";
  import { persisted } from "svelte-persisted-store";
  import type Quiz from "$lib/models/Quiz";
  import useClass from "$lib/hooks/useClass";
  import { Separator } from "$lib/components/ui/separator";

  export let data: PageData;

  const markedStore = persisted("markedQuestions", [] as string[]);
  const solvedStore = persisted("solvedQuestions", [] as string[]);

  function hasMarkedQuestion(quiz: Quiz) {
    return quiz.questions_ids.some((id) => $markedStore.includes(id));
  }

  function allQuestionsSolved(quiz: Quiz) {
    return quiz.questions_ids.every((id) => $solvedStore.includes(id));
  }
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
        >
          {track.displayName}
        </Card>
      {/each}
    </CardsGrid>
  {/if}
  {#if data.course.quizzes && data.course.quizzes.length > 0}
    <CardsGrid title="الاختبارات">
      {#if $markedStore.length > 0}
        <Card
          href={`${data.course.url()}/quizzes/marked/${$markedStore[0]}`}
          class="col-span-full h-fit"
        >
          الأسئلة المعلمة
        </Card>
      {/if}
      <Card
        href={`${data.course.url()}/quizzes/random`}
        class="col-span-full h-fit"
      >
        جميع الأسئلة عشوائيا
      </Card>
      <Separator class="col-span-full" />
      {#each data.course.quizzes as quiz}
        <Card
          href={quiz.url(data.course)}
          class={useClass(
            allQuestionsSolved(quiz),
            "correct",
            useClass(hasMarkedQuestion(quiz), "marked", "h-auto"),
          )}
        >
          {quiz.displayName}
        </Card>
      {/each}
    </CardsGrid>
  {/if}
</div>
