<script lang="ts">
    import type {LayoutData} from './$types';
    import navStore, {type NavItem} from "$lib/stores/navStore";
    import {onDestroy, onMount} from "svelte";
    import {page} from "$app/stores";

    export let data: LayoutData;

    $: route = $page.route.id;
    $: if (route.startsWith("/courses/[collegeUrlName]/[courseUrlName]/quizzes/[quizUrlName]")) {
        const navItems: NavItem[] = data.quiz.questions.map((question, index) => {
            return {
                title: index,
                href: `/courses/${data.course.college.urlName}/${data.course.urlName}/quizzes/${data.quiz.urlName}/${question.id}`,
            }
        })
        navStore.set({
            title: data.quiz.displayName,
            items: navItems
        });
    }

    onDestroy(() => {
        navStore.set({title: '', items: []});
    });

</script>

<div class="flex-1 flex flex-row">
    <slot/>
</div>