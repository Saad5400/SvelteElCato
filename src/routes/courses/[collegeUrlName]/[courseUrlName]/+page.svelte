<script lang="ts">
  import type { PageData } from "./$types";
  import CardsGrid from "$lib/components/cardsView/CardsGrid.svelte";
  import Card from "$lib/components/cardsView/Card.svelte";
  import { page } from "$app/stores";
  import { persisted } from "svelte-persisted-store";
  import type Quiz from "$lib/models/Quiz";
  import useClass from "$lib/hooks/useClass";

  export let data: PageData;

  const markedStore = persisted("markedQuestions", [] as string[]);
  const solvedStore = persisted("solvedQuestions", [] as string[]);

  function hasMarkedQuestion(quiz: Quiz) {
    return quiz.questions_ids.some((id) => $markedStore.includes(id));
  }

  function hasUnsolvedQuestion(quiz: Quiz) {
    return quiz.questions_ids.some((id) => !$solvedStore.includes(id));
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
      <Card
        href={quiz.url(data.course)}
        class={useClass(
          hasMarkedQuestion(quiz),
          "marked",
          useClass(hasUnsolvedQuestion(quiz), "border-success/30", "h-auto"),
        )}
      >
        {quiz.displayName}
      </Card>
    {/each}
  </CardsGrid>
</div>
