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

    const solvedStore = persisted("solvedQuestions", [] as string[]);

    function correct(element: HTMLElement) {
        element.classList.add("correct");
        showExplanation = true;
        useVibrate([10, 10, 10]);
        solvedStore.update((solved) => {
            solved.push(data.question.id);
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
    class="flex-1 flex flex-col items-center justify-between min-h-screen-without-navbar pb-8 gap-8 !roboto-mono"
    dir="ltr"
>
    <div
        class="flex flex-col items-start justify-start flex-1 w-full gap-8 p-2 md:px-4 lg:px-8 xl:px-16"
    >
        <Article content={data.question.content} prefix={`Question ${data.questionIndex}:`} prefixClass={$solvedStore.includes(data.question.id) ? "text-success" : ""} />
        <Separator />
        <div class="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
            {#each data.question.options() as option, index}
                <div class="indicator">
                    {#if data.question.explanation && option.name === data.question.correct && showExplanation}
                        <!-- Explain -->
                        <Drawer.Root>
                            <Drawer.Trigger class="contents">
                                <Button
                                    variant="secondary"
                                    class="indicator-item"
                                    size="icon"
                                >
                                    <Info class="w-3 h-3" />
                                </Button>
                            </Drawer.Trigger>
                            <Drawer.Content>
                                <Drawer.Header>
                                    <Drawer.Description
                                        class="flex flex-row flex-wrap items-center justify-center py-8 whitespace-normal min-h-60 !roboto-mono max-w-screen-lg mx-auto"
                                    >
                                        <Article
                                            content={data.question.explanation}
                                        />
                                    </Drawer.Description>
                                </Drawer.Header>
                            </Drawer.Content>
                        </Drawer.Root>
                    {/if}
                    <Button
                        variant="outline3D"
                        class="justify-start w-full h-full text-lg whitespace-normal"
                        on:click={(e) =>
                            choiceClicked(e, option.name, e.currentTarget)}
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
        <div class="flex flex-row w-full gap-4 max-w-96">
            <Button
                variant="outline3D"
                class={"choice flex-1 w-full " + (data.prev ? "" : "disabled")}
                href={`./${data.prev?.id}`}
            >
                Previous
            </Button>
            <Button
                variant="outline3D"
                class={"choice flex-1 w-full " + (data.next ? "" : "disabled")}
                href={`./${data.next?.id}`}
            >
                Next
            </Button>
        </div>
    {/if}
</div>
