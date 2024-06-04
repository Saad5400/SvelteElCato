<script lang="ts">
  import Article from "$lib/components/Article.svelte";
  import { Button } from "$lib/components/ui/button";
  import Info from "virtual:icons/f7/InfoCircleFill";
  import { page } from "$app/stores";
  import * as Drawer from "$lib/components/ui/drawer";
  import Separator from "$lib/components/ui/separator/separator.svelte";
  import useVibrate from "$lib/hooks/useVibrate";
  import { persisted } from "svelte-persisted-store";
  import QuestionHeader from "./QuestionHeader.svelte";
  import { preloadData } from "$app/navigation";
  import { browser } from "$app/environment";
  import type Question from "$lib/models/Question";

  export let question: Question;
  export let next: string | null;
  export let prev: string | null;
  export let courseDisplayName: string;
  export let quizDisplayName: string;
  export let questionIndex: number;
  export let totalQuestions: number;

  const solvedStore = persisted("solvedQuestions", [] as string[]);
  const markedStore = persisted("markedQuestions", [] as string[]);

  function correct(element: HTMLElement) {
    element.classList.add("correct");
    showExplanation = true;
    useVibrate([10, 10, 10]);
    solvedStore.update((solved) => {
      if (!solved.includes(question.id)) solved.push(question.id);
      return solved;
    });
  }

  function incorrect(element: HTMLElement) {
    if (!showExplanation && !$markedStore.includes(question.id)) markQuestion();
    element.classList.add("incorrect");
    useVibrate([50, 50, 50]);
  }

  function choiceClicked(event: any, name: string, clicked: HTMLElement) {
    if (name == question.correct) correct(clicked);
    else incorrect(clicked);
  }

  function markQuestion() {
    if ($markedStore.includes(question.id)) {
      markedStore.update((solved) => {
        solved.splice(solved.indexOf(question.id), 1);
        return solved;
      });
    } else {
      markedStore.update((solved) => {
        solved.push(question.id);
        return solved;
      });
    }
  }

  let showExplanation = false;
  let options = question.options();

  $: if ($page.url.href) {
    showExplanation = false;
    options = question.options();
    if (browser && next) preloadData(`./${next}`);
  }
</script>

<svelte:head>
  <title>
    {courseDisplayName}
    {quizDisplayName}: {questionIndex}
  </title>
</svelte:head>

<div
  class="min-h-screen-without-navbar !roboto-mono flex flex-1 flex-col items-center justify-between gap-8 pb-8"
  dir="ltr"
>
  <div
    class="flex w-full flex-1 flex-col items-start justify-start gap-2 p-2 md:px-4 lg:px-8 xl:px-16"
    id="main"
  >
    <QuestionHeader
      {question}
      {questionIndex}
      {totalQuestions}
      {markQuestion}
    />
    <Article content={question.content} />
    <Separator />
    <div class="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
      {#each options as option, index}
        <div class="indicator">
          {#if question.explanation && option.name === question.correct && showExplanation}
            <!-- Explain -->
            <Drawer.Root>
              <Drawer.Trigger class="contents">
                <Button variant="secondary" class="indicator-item" size="icon">
                  <Info class="h-3 w-3" />
                </Button>
              </Drawer.Trigger>
              <Drawer.Content>
                <Drawer.Header>
                  <Drawer.Description
                    class="!roboto-mono mx-auto flex min-h-60 max-w-screen-lg flex-row flex-wrap items-center justify-center whitespace-normal py-8"
                  >
                    <Article content={question.explanation} />
                  </Drawer.Description>
                </Drawer.Header>
              </Drawer.Content>
            </Drawer.Root>
          {/if}
          <Button
            variant="outline3D"
            class="h-full w-full justify-start whitespace-normal text-lg text-foreground/90"
            on:click={(e) => choiceClicked(e, option.name, e.currentTarget)}
            sound={question.correct === option.name
              ? "click_correct"
              : "click_incorrect"}
          >
            <Article content={option.content} />
          </Button>
        </div>
      {/each}
    </div>
  </div>
  {#if next || prev}
    <div class="flex w-full flex-row gap-4 p-2 md:px-4 lg:px-8 xl:px-16">
      <Button
        variant="outline3D"
        class={"choice w-full flex-1 " + (prev ? "" : "disabled")}
        href={`./${prev}`}
        on:click={() => {
          document.documentElement.classList.add("question-back");
        }}
      >
        Previous
      </Button>
      <Button
        variant="outline3D"
        class={"choice w-full flex-1 " + (next ? "" : "disabled")}
        href={`./${next}`}
        on:click={() => {
          document.documentElement.classList.remove("question-back");
        }}
      >
        Next
      </Button>
    </div>
  {/if}
</div>

<style>
  #main {
    view-transition-name: question;
  }
</style>
