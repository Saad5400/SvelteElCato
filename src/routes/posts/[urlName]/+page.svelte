<script lang="ts">
    import type {PageData} from './$types';
    import {Separator} from "$lib/components/ui/separator";
    import {Calendar, Clock, Eye} from "lucide-svelte";
    import {onDestroy, onMount} from "svelte";
    import navStore from "$lib/stores/navStore";
    import {page} from "$app/stores";
    import Article from "$lib/components/Article.svelte";

    export let data: PageData;

    $: route = $page.route.id;
    $: if (route === "/posts/[urlName]") {
        setTimeout(async () => {
            await data.pb.send(`/api/posts/views/${data.post.id}`, {
                method: 'POST'
            });
        }, 10);
    }

    onMount(() => {
        navStore.set({
            title: 'محتويات الصفحة',
            items: data.navItems
        });
    })

    onDestroy(() => {
        navStore.set({
            title: '',
            items: []
        });
    });
</script>

<svelte:head>
    <title>
        {data.post.displayName}
    </title>
</svelte:head>

<div class="container">
    <div class="text-center mb-8 text-accent-foreground/90">
        <h2>
            {data.post.displayName}
        </h2>
        <Separator class="mt-4 mb-1"/>
        <small class="flex flex-row justify-between items-center min-w-40">
            <span class="flex flex-row justify-start gap-1">
                <Calendar class="w-3 h-3"/>
                {data.post.updated.toLocaleDateString()}
            </span>
            <span class="flex flex-row items-center justify-center gap-2">
                <span class="flex flex-row items-center justify-center gap-1">
                    <Clock class="w-3 h-3"/>
                    {data.post.readTime}
                </span>
                <span class="flex flex-row items-center justify-center gap-1">
                    <Eye class="w-3 h-3"/>
                    {data.post.views}
                </span>
            </span>
        </small>
    </div>
    <br/>
    <Article content={data.post.content}/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
</div>