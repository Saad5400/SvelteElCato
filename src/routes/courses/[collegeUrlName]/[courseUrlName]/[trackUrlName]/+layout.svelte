<script lang="ts">
    import type { LayoutData } from "./$types";
    import navStore, { type NavItem } from "$lib/stores/navStore";
    import { onDestroy, onMount } from "svelte";
    import { page } from "$app/stores";

    export let data: LayoutData;

    $: route = $page.route.id;
    $: if (
        route?.startsWith(
            "/courses/[collegeUrlName]/[courseUrlName]/[trackUrlName]",
        )
    ) {
        const navItems: NavItem[] = data.track.steps.map((step) => {
            return {
                title: step.displayName,
                href:
                    step.type != "section"
                        ? `/courses/${data.course.college.urlName}/${data.course.urlName}/${data.track.urlName}/${step.id}`
                        : '',
            };
        });
        navStore.set({
            title: data.track.displayName,
            items: navItems,
        });
    }

    onDestroy(() => {
        navStore.set({ title: "", items: [] });
    });
</script>

<div class="flex flex-row flex-1">
    <slot />
</div>
