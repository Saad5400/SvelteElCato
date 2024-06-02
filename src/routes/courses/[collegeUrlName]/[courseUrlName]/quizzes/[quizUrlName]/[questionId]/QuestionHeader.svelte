<script lang="ts">
  import Flag from "virtual:icons/f7/Flag";
  import Checkmark from "virtual:icons/f7/Checkmark";
  import { Button } from "$lib/components/ui/button";
  import { persisted } from "svelte-persisted-store";
  import type { PageData } from "./$types";
  import IconButton from "$lib/components/IconButton.svelte";

  export let data: PageData;

  const solvedStore = persisted("solvedQuestions", [] as string[]);
  const markedStore = persisted("markedQuestions", [] as string[]);
</script>

<div class="flex flex-row items-center gap-1" id="container">
  <div class="flex flex-row gap-1">
    <IconButton text="وضع علامة">
      <Button
        variant="outline"
        size="icon"
        class={"rounded-e-none border-e-0 border-foreground/50 text-foreground " +
          ($markedStore.includes(data.question.id)
            ? "border-destructive text-destructive hover:text-destructive"
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
    </IconButton>
    <IconButton text="تم الحل">
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
    </IconButton>
  </div>
  <div
    class={"flex h-full flex-col justify-center rounded-md rounded-s-none border border-s-0 border-foreground/50 px-4 " +
      ($solvedStore.includes(data.question.id)
        ? "border-success text-success "
        : "") +
      ($markedStore.includes(data.question.id)
        ? "!border-destructive !text-destructive "
        : "")}
  >
    Question {data.questionIndex + 1}/{data.quiz.questions_ids.length}
  </div>
</div>

<style>
  #container {
    view-transition-name: question-header-container;
  }
</style>
