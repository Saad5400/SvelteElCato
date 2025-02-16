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
  import type Track from "$lib/models/Track";
  import completedSteps from "$lib/stores/completedSteps";
  import BetweenLines from "$lib/components/BetweenLines.svelte";
  import { Label } from "$lib/components/ui/label";
  import { Textarea } from "$lib/components/ui/textarea/index.js";
  import { Slider } from "$lib/components/ui/slider";
  import { applyAction, enhance } from "$app/forms";
  import LoadingLoop from "virtual:icons/line-md/LoadingLoop";

  export let data: PageData;
  let rating = [5];
  $: ratingValue = rating[0];
  let isSubmitted = false;

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
  <h1 class="break-all">
    {data.course.displayName}
  </h1>
  {#if data.course.isAvailable || data.user?.registeredCourses.includes(data.course.id)}
    <Button
      href={`${courseUrl(data.course)}/subscribe`}
      variant="outline3DFilled"
      class="roboto-mono h-fit text-xl"
    >
      {#if !data.user?.registeredCourses.includes(data.course.id)}
        التفاصيل والاشتراك
      {:else}
        تفاصيل الدورة والمدفوعات
      {/if}
    </Button>
  {/if}
  {#if data.course.telegram}
    <Button
      href={data.course.telegram}
      variant="outline3DFilled"
      class="roboto-mono h-fit text-xl"
    >
      قروب الدورة (للمشتركين فقط)
    </Button>
  {/if}
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
            "flex h-auto justify-center whitespace-normal text-2xl",
            hasAccess || "disabled",
            track.expand.steps.every((step) =>
                 step.type === 'section' ||  $completedSteps.includes(step.id)
            ) && "correct",
          )}
          variant="outline3DLarge"
        >
          <span>
            {track.displayName}
          </span>
          <!--{#if track.expand && track.expand.steps.length > 0 && totalLength > 0}-->
          <!--  <span-->
          <!--    class="ms-2 inline-flex items-center gap-1 self-end text-base"-->
          <!--  >-->
          <!--    ({getLengthLabel(totalLength)})-->
          <!--  </span>-->
          <!--{/if}-->
        </Button>
      {/each}
    </CardsGrid>
  {/if}
  {#if data.course.quizzes && data.course.quizzes.length > 0}
    <CardsGrid title="الأسئلة تدريبية">
      {#if $markedStore.filter((id) => data.allQuestions.includes(id),).length > 0}
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
  <!--  <BetweenLines>-->
  <!--    التقييمات-->
  <!--  </BetweenLines>-->
  <!--  {#if data.user?.registeredCourses.includes(data.course.id)}-->
  <!--    <form-->
  <!--      use:enhance={({}) => {-->
  <!--          isSubmitted = true;-->
  <!--          return async ({ result, update }) => {-->
  <!--              await applyAction(result);-->
  <!--          }-->
  <!--      }}-->
  <!--      action="?/rate"-->
  <!--      class="flex flex-col gap-4 roboto-mono"-->
  <!--    >-->
  <!--      <Label for="rating">قيم الدورة*</Label>-->
  <!--      <Slider class="mt-4" bind:value={rating} min={1} max={5} step={1} />-->
  <!--      <input type="hidden" id="rating" name="rating" bind:value={ratingValue} />-->
  <!--      <div class="flex flex-row justify-between w-full text-foreground/80">-->
  <!--        <span>ممتازة</span>-->
  <!--        <span>جيدة</span>-->
  <!--        <span>متوسطة</span>-->
  <!--        <span>مقبولة</span>-->
  <!--        <span>سيئة</span>-->
  <!--      </div>-->
  <!--      <Label class="mt-8" for="comment">أضف تعليقا</Label>-->
  <!--      <Textarea class="text-foreground/80" id="comment" name="comment" placeholder="..." />-->
  <!--      <Button variant="outline3DFilled" type="submit" disabled={isSubmitted}>-->
  <!--        {#if (isSubmitted)}-->
  <!--          <LoadingLoop class="w-6 h-auto" />-->
  <!--        {:else}-->
  <!--          إرسال-->
  <!--        {/if}-->
  <!--      </Button>-->
  <!--    </form>-->
  <!--  {/if}-->
</div>
