<script lang="ts">
  import type { PageData } from "./$types";
  import CardsGrid from "$lib/components/cardsView/CardsGrid.svelte";
  import Card from "$lib/components/cardsView/Card.svelte";
  import { page } from "$app/stores";
  import { quizFirstQuestionUrl } from "$lib/models/Quiz";
  import { courseUrl } from "$lib/models/Course";
  import { Separator } from "$lib/components/ui/separator";
  import solvedStore from "$lib/stores/solvedStore";
  import markedStore from "$lib/stores/markedStore";
  import { cn } from "$lib/utils";
  import { Button } from "$lib/components/ui/button";
  import Clock from "virtual:icons/f7/Clock";
  import type Track from "$lib/models/Track";

  export let data: PageData;

  function getTotalLength(track: Track): number {
    return track.expand?.steps.reduce((acc, step) => acc + step.length, 0);
  }

  function getLengthLabel(length: number): string {
    if (length == 1) return "دقيقة واحدة";
    if (length == 2) return "دقيقتان";
    if (length >= 3 && length <= 10) return `${length} دقائق`;
    return `${length} دقيقة`;
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
  <Button
    href={`${courseUrl(data.course)}/subscribe`}
    variant="outline3DFilled"
    class="roboto-mono h-fit text-xl"
  >
    {#if !data.user?.registeredCourses.includes(data.course.id)}
      الاشتراك
    {:else}
      تفاصيل الدورة والدفع
    {/if}
  </Button>
  {#if data.course.tracks && data.course.tracks.length > 0}
    <CardsGrid title="المسارات">
      {#each data.course.expand.tracks as track}
        {@const hasAccess =
          track.expand?.steps.some((step) => step.isFree) ||
          data.user?.registeredCourses.includes(data.course.id)}
        {@const totalLength = getTotalLength(track)}
        <!-- TODO: redirect to the last visited step -->
        <Button
          href={`/courses/${$page.params.courseUrlName}/${track.urlName}`}
          class={cn(
            "flex h-auto justify-between whitespace-normal text-2xl",
            hasAccess || "disabled",
          )}
          variant="outline3DLarge"
        >
          <span>
            {track.displayName}
          </span>
          {#if track.expand && track.expand.steps.length > 0 && totalLength > 0}
            <span
              class="ms-2 inline-flex items-center gap-1 self-end text-base"
            >
              ({getLengthLabel(totalLength)})
            </span>
          {/if}
        </Button>
      {/each}
    </CardsGrid>
  {/if}
  {#if data.course.quizzes && data.course.quizzes.length > 0}
    <CardsGrid title="الاختبارات">
      {#if $markedStore.filter( (id) => data.allQuestions.includes(id), ).length > 0}
        <Card
          href={`${courseUrl(data.course)}/quizzes/marked`}
          class="marked col-span-full h-fit"
        >
          الأسئلة المُعلمة
        </Card>
      {/if}
      <Card
        href={`${courseUrl(data.course)}/quizzes/random`}
        class="col-span-full h-fit {data.allQuestions.every((question) =>
          $solvedStore.includes(question),
        ) && 'correct'} {data.allQuestions.length === 0 && 'disabled'}"
      >
        جميع الأسئلة عشوائيا
      </Card>
      <Separator class="col-span-full" />
      {#each data.course.expand.quizzes as quiz}
        {@const hasAccess =
          quiz.isFree || data.user?.registeredCourses.includes(data.course.id)}
        {@const allSolved = quiz.questions.every((question) =>
          $solvedStore.includes(question),
        )}
        {@const anyMarked = quiz.questions.some((question) =>
          $markedStore.includes(question),
        )}
        <Card
          href={quizFirstQuestionUrl(quiz, data.course)}
          class="h-auto {hasAccess || 'disabled'} {allSolved &&
            'correct'} {anyMarked && 'marked'}"
        >
          {quiz.displayName}
        </Card>
      {/each}
    </CardsGrid>
  {/if}
</div>
