<script lang="ts">
    import {toggleMode} from "mode-watcher";
    import {Button} from "$lib/components/ui/button";
    import {Menu, Moon, StepBack, Sun} from "lucide-svelte";
    import {page} from "$app/stores";
    import * as Sheet from "$lib/components/ui/sheet";
    import navStore from "$lib/stores/navStore";

    function getBackUrl(route: string): string {
        switch (route) {
            case "/":
                return "";
            case "/courses/[collegeUrlName]/[courseUrlName]/[trackUrlName]":
            case "/courses/[collegeUrlName]/[courseUrlName]/[trackUrlName]/[stepId]":
                return `/courses/${$page.params.collegeUrlName}/${$page.params.courseUrlName}`;
            default:
                return "/";
        }
    }

    $: url = getBackUrl($page.route.id!);

    let navOpen = false;
</script>
<header class="sticky top-0 z-50 w-full border-b border-border/80 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mb-4">
    <div class="container flex h-14 max-w-screen-2xl items-center px-2">
        {#if url}
            <a href="{url}" class="mr-4 flex items-center space-x-2">
                <span class="font-bold inline-block">
                    <Button size="icon" variant="ghost">
                        <StepBack class="h-4 w-4 rotate-180"/>
                    </Button>
                </span>
            </a>
        {/if}
        {#if $navStore.title && $navStore.items.length > 0}
            <div class="contents lg:hidden ">
                <Sheet.Root bind:open={navOpen}>
                    <Sheet.Trigger>
                        <Button size="icon" variant="ghost">
                            <Menu class="h-4 w-4"/>
                        </Button>
                    </Sheet.Trigger>
                    <Sheet.Content>
                        <Sheet.Header>
                            <Sheet.Title>
                                {$navStore.title}
                            </Sheet.Title>
                            <Sheet.Description>
                                {#each $navStore.items as item}
                                    {@const active = $page.url.href.includes(item.href)}
                                    <Button href={item.href}
                                            class={"whitespace-normal h-fit block py-2 px-4 text-sm font-medium text-on-background/80 hover:bg-background/80 hover:text-on-background/100 text-start " + (active ? 'border-r-2 border-b-2 border-accent-foreground' : '')}
                                            on:click={() => setTimeout(() => navOpen = false, 100)}
                                    >
                                        {item.title}
                                    </Button>
                                {/each}
                            </Sheet.Description>
                        </Sheet.Header>
                    </Sheet.Content>
                </Sheet.Root>
            </div>
        {/if}
        <div class="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div class="w-full flex-1 md:w-auto md:flex-none">

            </div>
            <nav class="flex items-center">
                <!--                <a href="https://t.me/ElCatoCS" target="_blank" rel="noreferrer">-->
                <!--                    <div class="inline-flex items-center justify-center font-medium whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 rounded-md text-xs w-9 px-0">-->

                <!--                        <span class="sr-only" data-svelte-h="svelte-13ytjzu">Profile</span>-->
                <!--                    </div>-->
                <!--                </a>-->
                <!--                <a href="/profile" target="_blank" rel="noreferrer">-->
                <!--                    <div class="inline-flex items-center justify-center font-medium whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 rounded-md text-xs w-9 px-0">-->
                <!--                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"-->
                <!--                             stroke="currentColor" class="w-5 h-5">-->
                <!--                            <path stroke-linecap="round" stroke-linejoin="round"-->
                <!--                                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>-->
                <!--                        </svg>-->
                <!--                        <span class="sr-only" data-svelte-h="svelte-13ytjzu">Telegram</span>-->
                <!--                    </div>-->
                <!--                </a>-->
                <Button on:click={toggleMode} variant="ghost" size="icon">
                    <Sun
                            class="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
                    />
                    <Moon
                            class="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
                    />
                    <span class="sr-only">Toggle theme</span>
                </Button>
            </nav>
        </div>
    </div>
</header>
<div class="flex flex-row">
    {#if $navStore.title && $navStore.items.length > 0}
        <div class="min-w-[20rem] max-w-80 min-h-screen-without-navbar max-h-screen-without-navbar scrollbar-thin overflow-y-auto hidden lg:block ms-4 border-e-2"
             style="scrollbar-gutter: stable">
            <div class="fixed min-w-[20rem]">
                <h3 class="text-center">
                    {$navStore.title}
                </h3>
                <nav>
                    {#each $navStore.items as item}
                        {@const active = $page.url.href.includes(item.href)}
                        <Button href={item.href}
                                class={"max-w-72 block py-2 px-4 text-sm font-medium text-on-background/80 hover:bg-background/80 hover:text-on-background/100 text-start me-4 whitespace-normal h-fit " + (active ? 'border-r-2 border-b-2 border-accent-foreground' : '')}
                        >
                            {item.title}
                        </Button>
                    {/each}
                </nav>
            </div>
        </div>
    {/if}
    <slot/>
</div>