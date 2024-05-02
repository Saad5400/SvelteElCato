<script lang="ts">
  import type { PageData } from "./$types";
  import Article from "$lib/components/Article.svelte";
  import { Button } from "$lib/components/ui/button";
  import Info from "virtual:icons/f7/InfoCircleFill";
  import { page } from "$app/stores";
  import * as Drawer from "$lib/components/ui/drawer";
  // import { Confetti } from "svelte-confetti";
  import Separator from "$lib/components/ui/separator/separator.svelte";
  import useVibrate from "$lib/hooks/useVibrate";
  import { persisted } from "svelte-persisted-store";
  import Flag from "virtual:icons/f7/Flag";
  import Checkmark from "virtual:icons/f7/Checkmark";

  const solvedStore = persisted("solvedQuestions", [] as string[]);
  const markedStore = persisted("markedQuestions", [] as string[]);

  function correct(element: HTMLElement) {
    element.classList.add("correct");
    showExplanation = true;
    useVibrate([10, 10, 10]);
    solvedStore.update((solved) => {
      if (!solved.includes(data.question.id)) solved.push(data.question.id);
      return solved;
    });
  }

  function incorrect(element: HTMLElement) {
    element.classList.add("incorrect");
    useVibrate([50, 50, 50]);
  }

  function choiceClicked(event: any, name: string, clicked: HTMLElement) {
    if (name == data.question.correct) {
      correct(clicked);
    } else {
      incorrect(clicked);
    }
  }

  export let data: PageData;
  let showExplanation = false;
  $: if ($page.url.href) showExplanation = false;
</script>

<svelte:head>
  <title>
    {data.course.displayName}
    {data.quiz.displayName}: {data.questionIndex}
  </title>
</svelte:head>

<div
  class="min-h-screen-without-navbar !roboto-mono flex flex-1 flex-col items-center justify-between gap-8 pb-8"
  dir="ltr"
>
  <div
    class="flex w-full flex-1 flex-col items-start justify-start gap-2 p-2 md:px-4 lg:px-8 xl:px-16"
  >
    <div class="flex flex-row items-center gap-1">
      <div class="flex flex-row gap-1">
        <Button
          variant="outline"
          size="icon"
          class={"rounded-e-none border-e-0 border-foreground/50 text-foreground " +
            ($markedStore.includes(data.question.id)
              ? "border-primary text-primary hover:text-primary"
              : "")}
          on:click={() => {
            if ($markedStore.includes(data.question.id)) {
              markedStore.update((solved) => {
                solved.splice(solved.indexOf(data.question.id), 1);
                return solved;
              });
            } else {
              markedStore.update((solved) => {
                solved.push(data.question.id);
                return solved;
              });
            }
          }}
        >
          <Flag
            class={$markedStore.includes(data.question.id)
              ? "spin spin-active"
              : ""}
          />
        </Button>
        <Button
          variant="outline"
          size="icon"
          class={"rounded-s-none border-s-0 border-foreground/50 text-foreground " +
            ($solvedStore.includes(data.question.id)
              ? "border-success text-success hover:text-success"
              : "")}
          on:click={() => {
            if ($solvedStore.includes(data.question.id)) {
              solvedStore.update((solved) => {
                solved.splice(solved.indexOf(data.question.id), 1);
                return solved;
              });
            } else {
              solvedStore.update((solved) => {
                solved.push(data.question.id);
                return solved;
              });
            }
          }}
        >
          <Checkmark
            class={$solvedStore.includes(data.question.id)
              ? "spin spin-active"
              : ""}
          />
        </Button>
      </div>
      <div
        class={"flex h-full flex-col justify-center rounded-md rounded-s-none border border-s-0 border-foreground/50 px-4 " +
          ($solvedStore.includes(data.question.id)
            ? "border-success text-success "
            : "") +
          ($markedStore.includes(data.question.id)
            ? "!border-primary !text-primary "
            : "")}
      >
        Question {data.questionIndex + 1}/{data.quiz.questions.length}
      </div>
    </div>
    <Article content={data.question.content} />
    <Separator />
    <div class="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
      {#each data.question.options() as option, index}
        <div class="indicator">
          {#if data.question.explanation && option.name === data.question.correct && showExplanation}
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
                    <Article content={data.question.explanation} />
                  </Drawer.Description>
                </Drawer.Header>
              </Drawer.Content>
            </Drawer.Root>
          {/if}
          <Button
            variant="outline3D"
            class="h-full w-full justify-start whitespace-normal text-lg"
            on:click={(e) => choiceClicked(e, option.name, e.currentTarget)}
            sound={data.question.correct === option.name
              ? "click_correct"
              : "click_incorrect"}
          >
            <Article content={option.content} />
          </Button>
        </div>
      {/each}
    </div>
  </div>
  {#if data.next || data.prev}
    <div class="flex w-full flex-row gap-4 p-2 md:px-4 lg:px-8 xl:px-16">
      <Button
        variant="outline3D"
        class={"choice w-full flex-1 " + (data.prev ? "" : "disabled")}
        href={`./${data.prev?.id}`}
      >
        Previous
      </Button>
      <Button
        variant="outline3D"
        class={"choice w-full flex-1 " + (data.next ? "" : "disabled")}
        href={`./${data.next?.id}`}
      >
        Next
      </Button>
    </div>
  {/if}
</div>
