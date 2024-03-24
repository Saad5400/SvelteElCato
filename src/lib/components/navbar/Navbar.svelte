<script lang="ts">
    import { toggleMode } from "mode-watcher";
    import { Button } from "$lib/components/ui/button";
    import { page } from "$app/stores";
    import * as Sheet from "$lib/components/ui/sheet";
    import navStore from "$lib/stores/navStore";
    import SkipBack from "virtual:icons/f7/BackwardEnd";
    import Moon from "virtual:icons/f7/MoonStars";
    import Sun from "virtual:icons/f7/SunMax";
    import Menu from "virtual:icons/f7/Menu";
    import NavMenu from "./NavMenu.svelte";

    function getBackUrl(route: string): string {
        switch (route) {
            case "/":
                return "";
            case "/courses/[collegeUrlName]/[courseUrlName]/[trackUrlName]":
            case "/courses/[collegeUrlName]/[courseUrlName]/[trackUrlName]/[stepId]":
            case "/courses/[collegeUrlName]/[courseUrlName]/quizzes/[quizUrlName]":
            case "/courses/[collegeUrlName]/[courseUrlName]/quizzes/[quizUrlName]/[questionId]":
                return `/courses/${$page.params.collegeUrlName}/${$page.params.courseUrlName}`;
            default:
                return "/";
        }
    }

    $: url = getBackUrl($page.route.id!);
</script>

<header
    class="sticky top-0 z-50 w-full border-b border-border/80 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mb-4"
>
    <div class="container flex h-14 max-w-screen-2xl items-center px-2">
        {#if url}
            <Button
                href={url}
                class="mr-4 flex items-center space-x-2 font-bold"
                size="icon"
                variant="ghost"
                aria-label="Go back"
            >
                <SkipBack class="rotate-180" />
            </Button>
        {/if}
        {#if $navStore.title && $navStore.items.length > 0}
            <div class="contents lg:hidden">
                <Sheet.Root bind:open={$navStore.open}>
                    <Sheet.Trigger>
                        <Button size="icon" variant="ghost">
                            <!-- <Menu class="h-4 w-4"/> -->
                            <Menu />
                        </Button>
                    </Sheet.Trigger>
                    <Sheet.Content>
                        <Sheet.Header>
                            <Sheet.Title class="text-center">
                                {$navStore.title}
                            </Sheet.Title>
                            <Sheet.Description
                                class="max-h-[calc(100dvh-5rem)]  overflow-y-auto text-accent-foreground pe-1"
                            >
                                <NavMenu />
                            </Sheet.Description>
                        </Sheet.Header>
                    </Sheet.Content>
                </Sheet.Root>
            </div>
        {/if}
        <div
            class="flex flex-1 items-center justify-between space-x-2 md:justify-end"
        >
            <div class="w-full flex-1 md:w-auto md:flex-none"></div>
            <nav class="flex items-center">
                <Button on:click={toggleMode} variant="ghost" size="icon">
                    <Sun
                        class="absolute dark:rotate-90 dark:scale-0 rotate-0 scale-100 duration-500"
                    />
                    <Moon
                        class="absolute rotate-90 scale-0 dark:rotate-0 dark:scale-100 duration-500"
                    />
                    <span class="sr-only">Toggle theme</span>
                </Button>
            </nav>
        </div>
    </div>
</header>
<main class="flex flex-row">
    {#if $navStore.title && $navStore.items.length > 0}
        <nav
            class="min-w-[20rem] max-w-80 min-h-screen-without-navbar hidden lg:block mx-4"
            style="scrollbar-gutter: stable"
        >
            <div class="fixed max-h-[calc(100dvh-5rem)] overflow-y-auto">
                <h3 class="text-center mb-4">
                    {$navStore.title}
                </h3>
                <NavMenu />
            </div>
        </nav>
    {/if}
    <div class="border-2 hidden lg:block" />
    <slot />
</main>
