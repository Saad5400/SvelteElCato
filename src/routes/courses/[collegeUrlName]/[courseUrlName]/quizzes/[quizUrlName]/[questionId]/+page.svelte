<script lang="ts">
    import type {PageData} from './$types';
    import Article from "$lib/components/Article.svelte";
    import type {ButtonEventHandler} from "$lib/components/ui/button";
    import {Button} from "$lib/components/ui/button";
    import {Info} from "lucide-svelte";
    import {page} from "$app/stores";
    import * as Drawer from "$lib/components/ui/drawer";

    function choiceClicked(event: ButtonEventHandler<MouseEvent>, name: string, clicked: HTMLElement) {
        if (name == data.question.correct) {
            clicked.classList.add("bg-green-500");
            clicked.classList.add("hover:bg-green-600");
            showExplanation = true;
        } else {
            clicked.classList.add("bg-destructive");
            clicked.classList.add("hover:bg-destructive/70");
        }
    }

    export let data: PageData;
    let showExplanation = false;
    $: if($page.url.href) showExplanation = false;
</script>

<svelte:head>
    <title>
        {data.course.displayName} {data.quiz.displayName}: {data.questionIndex}
    </title>
</svelte:head>

<div class="flex-1 flex flex-col items-center justify-between min-h-screen-without-navbar py-4 md:py-8 lg:py-12 xl:py-16 gap-8"
     dir="ltr">
    <div class="w-full flex-1 flex flex-col items-center justify-start text-center gap-8">
        <Article content={data.question.content}/>
        <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-4 p-2 md:p-4 lg:p-8 xl:p-16">
            {#each data.question.options() as option, index}
                <div class="indicator">
                    {#if data.question.explanation && option.name === data.question.correct && showExplanation}
                        <Drawer.Root>
                            <Drawer.Trigger>
                                <Button variant="secondary" class="indicator-item" size="icon">
                                    <Info class="w-3 h-3"/>
                                </Button>
                            </Drawer.Trigger>
                            <Drawer.Content>
                                <Drawer.Header>
                                    <Drawer.Description class="flex flex-row flex-wrap whitespace-normal items-center justify-center min-h-60 py-8">
                                        <Article content={data.question.explanation} />
                                    </Drawer.Description>
                                </Drawer.Header>
                            </Drawer.Content>
                        </Drawer.Root>
                    {/if}
                    <Button variant="outline3D" class="text-lg h-full w-full"
                            on:click={(e) => choiceClicked(e, option.name, e.currentTarget)}>
                        <Article content={option.content}/>
                    </Button>
                </div>
            {/each}
        </div>
    </div>
    {#if data.next || data.prev}
        <div class="w-full max-w-96 flex flex-row gap-4">
            {#if data.prev}
                <Button variant="outline3D" class="flex-1 w-full" href={`./${data.prev.id}`}>
                    السابق
                </Button>
            {/if}
            {#if data.next}
                <Button variant="outline3D" class="flex-1 w-full" href={`./${data.next.id}`}>
                    التالي
                </Button>
            {/if}
        </div>
    {/if}
</div>

<style lang="postcss">
    .indicator {
        & :where(.indicator-item) {
            @apply bottom-auto end-0 start-auto top-0 -translate-y-5 translate-x-1/3;
        }
    }

    .indicator {
        @apply relative inline-flex;

        & :where(.indicator-item) {
            z-index: 1;
            @apply absolute transform whitespace-nowrap;
        }
    }
</style>