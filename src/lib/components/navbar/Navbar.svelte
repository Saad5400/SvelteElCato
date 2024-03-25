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
    import { onDestroy, onMount } from "svelte";

    let largeNavMenu: HTMLElement;

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

    let unsubscribeNavStore = () => {};
    onMount(() => {
        unsubscribeNavStore = navStore.subscribe((value) => {
            setTimeout(() => {
                if (!largeNavMenu) return;
                largeNavMenu.classList.remove("w-80");
            }, 1500);
        });
    });

    onDestroy(() => {
        unsubscribeNavStore();
    });
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
                                class="max-h-[calc(100dvh-5rem)]  overflow-y-auto text-accent-foreground pe-2"
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
        <div class="contents" id="navMenuDiv">
            <nav
                class="max-w-80 min-h-screen-without-navbar hidden lg:block mx-4 transition-all !overflow-x-hidden w-8 w-80"
                id="largeNavMenu"
                bind:this={largeNavMenu}
            >
                <div
                    class="fixed w-full max-w-80 max-h-[calc(100dvh-5rem)] scrollbar-none overflow-y-auto"
                >
                    <h3 class="text-center mb-4">
                        {$navStore.title}
                    </h3>
                    <NavMenu />
                </div>
            </nav>
            <div class="border-2 hidden lg:flex items-center">
                <span
                    class="transition-all scale-x-100 absolute translate-x-2"
                    id="openNavIcon"
                >
                    <SkipBack class="text-primary" />
                </span>
            </div>
        </div>
    {/if}
    <slot />
</main>

<style lang="postcss">
    #largeNavMenu {
        clip-path: inset(0 0 0 0);
    }

    #navMenuDiv:hover #largeNavMenu {
        @apply w-80;
    }

    #navMenuDiv:hover #openNavIcon {
        @apply -scale-x-100;
    }
</style>
