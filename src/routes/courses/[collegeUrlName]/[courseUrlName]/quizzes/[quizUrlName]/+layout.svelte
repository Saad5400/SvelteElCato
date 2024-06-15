<script lang="ts">
  import type { LayoutData } from "./$types";
  import { onDestroy, onMount } from "svelte";
  import menu from "$lib/stores/menu";
  // @ts-ignore
  import * as Dialog from "$lib/components/ui/dialog";
  import { page } from "$app/stores";
  import useClass from "$lib/hooks/useClass";
  import { Button } from "$lib/components/ui/button";

  export let data: LayoutData;

  onMount(() => {
    if (data.quiz.questions_ids.length > 0) {
      menu.set({ open: false, alwaysShow: true });
    }
  });

  onDestroy(() => {
    menu.set(null);
  });
</script>

<Dialog.Root open={$menu?.open}>
  <Dialog.Content class="max-w-[min(90dvw,30rem)]">
    <Dialog.Header>
      <Dialog.Title>
        {data.quiz.displayName}
      </Dialog.Title>
      <nav
        class="mx-auto grid max-h-[20rem] w-fit grid-cols-5 gap-2 overflow-y-auto"
      >
        {#each data.quiz.questions_ids as question, index}
          {@const active = $page.params.questionId === question}
          <Button
            href={data.quiz.questionUrl(data.course, question)}
            class={useClass(
              active,
              "active",
              "flex h-12 w-12 items-center justify-center text-sm font-medium",
            )}
            on:click={() => menu.update((menu) => ({ ...menu, open: false }))}
          >
            {index}
          </Button>
        {/each}
      </nav>
    </Dialog.Header>
  </Dialog.Content>
</Dialog.Root>

<div id="quizLayout" class="flex flex-1 flex-row overflow-x-clip">
  <slot />
</div>
