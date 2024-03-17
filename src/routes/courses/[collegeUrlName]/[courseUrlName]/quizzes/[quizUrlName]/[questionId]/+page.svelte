<script lang="ts">
    import type { PageData } from "./$types";
    import Article from "$lib/components/Article.svelte";
    import { Button } from "$lib/components/ui/button";
    import Info from "virtual:icons/f7/InfoCircleFill";
    import { page } from "$app/stores";
    import * as Drawer from "$lib/components/ui/drawer";
    // import { Confetti } from "svelte-confetti";
    import { mode } from "mode-watcher";

    function choiceClicked(event: any, name: string, clicked: HTMLElement) {
        if (name == data.question.correct) {
            clicked.classList.add("bg-green-500");
            clicked.classList.add("hover:bg-green-600");
            clicked.classList.add("jump-active");
            showExplanation = true;
            navigator.vibrate(100);
        } else {
            clicked.classList.add("bg-destructive");
            clicked.classList.add("hover:bg-destructive/70");
            clicked.classList.add("boop-active");
            navigator.vibrate([100, 100, 100]);
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
        class="flex flex-col items-center justify-start flex-1 w-full gap-8 p-2 text-center md:px-4 lg:px-8 xl:px-16"
    >
        <Article content={data.question.content} />
        <div class="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
            {#each data.question.options() as option, index}
                <div class="indicator">
                    {#if data.question.explanation && option.name === data.question.correct && showExplanation}
                        <!-- <div
                            class="fixed left-0 top-0 min-w-[100dvw] min-h-screen flex items-center justify-center overflow-clip z-50 pointer-events-none"
                        >
                            <Confetti
                                size={15}
                                fallDistance="0px"
                                colorArray={["url(/images/dark-skull.png)"]}
                            />
                        </div> -->
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
            {#if data.prev}
                <Button
                    variant="outline3D"
                    class="flex-1 w-full"
                    href={`./${data.prev.id}`}
                >
                    Previous
                </Button>
            {/if}
            {#if data.next}
                <Button
                    variant="outline3D"
                    class="flex-1 w-full"
                    href={`./${data.next.id}`}
                >
                    Next
                </Button>
            {/if}
        </div>
    {/if}
</div>
