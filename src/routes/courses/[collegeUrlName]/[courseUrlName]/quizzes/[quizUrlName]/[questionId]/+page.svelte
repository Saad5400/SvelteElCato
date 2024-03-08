<script lang="ts">
    import type {PageData} from './$types';
    import Article from "$lib/components/Article.svelte";
    import Card from "$lib/components/cardsView/Card.svelte";
    import type {ButtonEventHandler} from "bits-ui/dist/bits/button";
    import {Button} from "$lib/components/ui/button";

    function choiceClicked(event: ButtonEventHandler<MouseEvent>, name: string, clicked: HTMLElement) {
        if (name == data.question.correct) {
            clicked.classList.add("bg-green-500");
            clicked.classList.add("hover:bg-green-600");
        } else {
            clicked.classList.add("bg-destructive");
            clicked.classList.add("hover:bg-destructive/70");
        }
    }

    export let data: PageData;
</script>

<svelte:head>
    <title>
        {data.course.displayName} {data.quiz.displayName}: {data.questionIndex}
    </title>
</svelte:head>

<div class="flex-1 flex flex-col items-center justify-between min-h-screen-without-navbar p-16 gap-8" dir="ltr">
    <div class="flex-1 flex flex-col items-center justify-start text-center gap-8">
        <Article content={data.question.content}/>
        <div class="grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-4">
            {#each data.question.options() as option, index}
                <Button variant="outline3D" class="w-full h-full flex flex-col min-w-64 text-lg"
                        on:click={(e) => choiceClicked(e, option.name, e.currentTarget)}>
                    <Article content={option.content}/>
                </Button>
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