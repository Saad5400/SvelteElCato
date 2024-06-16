<script lang="ts">
  import Article from "$lib/components/Article.svelte";
  import { Button } from "$lib/components/ui/button";
  import Info from "virtual:icons/f7/InfoCircleFill";
  import { page } from "$app/stores";
  // @ts-ignore
  import * as Drawer from "$lib/components/ui/drawer";
  import Separator from "$lib/components/ui/separator/separator.svelte";
  import useVibrate from "$lib/hooks/useVibrate";
  import { preloadData } from "$app/navigation";
  import { browser } from "$app/environment";
  import type { PageServerData, PageData } from "./$types";
  import Flag from "virtual:icons/f7/Flag";
  import Checkmark from "virtual:icons/f7/Checkmark";
  import IconButton from "$lib/components/IconButton.svelte";

  export let data: PageServerData & PageData;

  let solvedQuestions = data.user?.solvedQuestions || [];
  let markedQuestions = data.user?.markedQuestions || [];

  function setSolved() {
    if (!solvedQuestions.includes(data.question.id)) {
      solvedQuestions = [...solvedQuestions, data.question.id];
      data.pb.collection("users").update(data.user!.id, {
        "solvedQuestions+": data.question.id,
      });
    }
  }

  function setUnsolved() {
    if (solvedQuestions.includes(data.question.id)) {
      solvedQuestions = solvedQuestions.filter(
        (id: string) => id !== data.question.id,
      );
      data.pb.collection("users").update(data.user!.id, {
        "solvedQuestions-": data.question.id,
      });
    }
  }

  function toggleSolved() {
    if (solvedQuestions.includes(data.question.id)) {
      setUnsolved();
    } else {
      setSolved();
    }
  }

  function correct(element: HTMLElement) {
    element.classList.add("correct");
    showExplanation = true;
    useVibrate([10, 10, 10]);
    setSolved();
  }

  function incorrect(element: HTMLElement) {
    if (!showExplanation && !markedQuestions.includes(data.question.id))
      markQuestion();
    element.classList.add("incorrect");
    useVibrate([50, 50, 50]);
  }

  function choiceClicked(event: any, name: string, clicked: HTMLElement) {
    if (name == data.question.correct) correct(clicked);
    else incorrect(clicked);
  }

  function markQuestion() {
    if (!markedQuestions.includes(data.question.id)) {
      markedQuestions = [...markedQuestions, data.question.id];
      data.pb.collection("users").update(data.user!.id, {
        "markedQuestions+": data.question.id,
      });
    }
  }

  function unmarkQuestion() {
    if (markedQuestions.includes(data.question.id)) {
      markedQuestions = markedQuestions.filter(
        (id: string) => id !== data.question.id,
      );
      data.pb.collection("users").update(data.user!.id, {
        "markedQuestions-": data.question.id,
      });
    }
  }

  function toggleMarked() {
    if (markedQuestions.includes(data.question.id)) {
      unmarkQuestion();
    } else {
      markQuestion();
    }
  }

  let showExplanation = false;
  $: if ($page.url.href) {
    showExplanation = false;
    if (browser && data.next) preloadData(`./${data.next}`);
  }

  $: isMarked = markedQuestions.includes(data.question.id);
  $: isSolved = solvedQuestions.includes(data.question.id);
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
    id="main"
  >
    <div class="flex flex-row items-center gap-1" id="container">
      <div class="flex flex-row gap-1">
        <IconButton text="علامة {!data.user ? '(يتطلب تسجيل الدخول)' : ''}">
          <Button
            variant="outline"
            size="icon"
            class="rounded-e-none border-e-0 border-foreground/50 text-foreground {isMarked &&
              'border-destructive text-destructive hover:text-destructive'}"
            disabled={!data.user}
            on:click={toggleMarked}
          >
            <Flag class={isMarked && "spin spin-active"} />
          </Button>
        </IconButton>
        <IconButton text="تم الحل {!data.user ? '(يتطلب تسجيل الدخول)' : ''}">
          <Button
            variant="outline"
            size="icon"
            class="rounded-s-none border-s-0 border-foreground/50 text-foreground {isSolved &&
              'border-success text-success hover:text-success'}"
            disabled={!data.user}
            on:click={toggleSolved}
          >
            <Checkmark class={isSolved && "spin spin-active"} />
          </Button>
        </IconButton>
      </div>
      <div
        class="flex h-full flex-col justify-center rounded-md rounded-s-none border border-s-0 border-foreground/50 px-4 {true &&
          'border-success text-success'}} {true &&
          '!border-destructive !text-destructive'}"
      >
        Question {data.questionIndex + 1}/{data.quiz.questions.length}
      </div>
    </div>
    <Article content={data.question.content} />
    <Separator />
    <div class="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
      {#each data.options as option, index}
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
            class="h-full w-full justify-start whitespace-normal text-lg text-foreground/90"
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
        class="choice w-full flex-1 {data.prev || 'disabled'}"
        href={`./${data.prev}`}
        on:click={() => {
          document.documentElement.classList.add("question-back");
        }}
      >
        Previous
      </Button>
      <Button
        variant="outline3D"
        class="choice w-full flex-1 {data.next || 'disabled'}"
        href={`./${data.next}`}
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

  #container {
    view-transition-name: question-header-container;
  }
</style>
