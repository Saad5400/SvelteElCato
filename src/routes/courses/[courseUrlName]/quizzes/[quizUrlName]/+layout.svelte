<script lang="ts">
  import type { LayoutData, LayoutServerData } from "./$types";
  import { onDestroy, onMount } from "svelte";
  import menu from "$lib/stores/menu";
  // @ts-ignore
  import * as Dialog from "$lib/components/ui/dialog";
  import { page } from "$app/stores";
  import { Button } from "$lib/components/ui/button";
  import { questionUrl } from "$lib/models/Question";
  import solvedStore from "$lib/stores/solvedStore";
  import markedStore from "$lib/stores/markedStore";

  export let data: LayoutServerData & LayoutData;

  onMount(() => {
    if (data.quiz.questions.length > 0) {
      menu.set({ open: false, class: "block" });
    }
  });

  onDestroy(() => {
    menu.set(null);
  });
</script>

<Dialog.Root open={$menu?.open} openFocus=".active">
  <Dialog.Content class="max-w-[min(90dvw,30rem)]">
    <Dialog.Header>
      <Dialog.Title>
        {data.quiz.displayName}
      </Dialog.Title>
      <nav
        class="mx-auto grid max-h-[20rem] w-fit grid-cols-5 gap-2 overflow-y-auto"
      >
        {#each data.quiz.questions as question, index}
          {@const active = $page.params.questionId === question}
          <Button
            href={questionUrl(question, data.quiz, data.course)}
            class="flex h-12 w-12 items-center justify-center text-sm font-medium {active &&
              'active'} {$solvedStore.includes(question) &&
              'correct'} {$markedStore.includes(question) && 'marked'}"
            on:click={() => menu.update((menu) => ({ ...menu, open: false }))}
          >
            {index + 1}
          </Button>
        {/each}
      </nav>
    </Dialog.Header>
  </Dialog.Content>
</Dialog.Root>

<div id="quizLayout" class="flex flex-1 flex-row overflow-x-clip">
  <slot />
</div>
