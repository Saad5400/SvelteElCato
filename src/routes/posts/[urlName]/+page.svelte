<script lang="ts">
    import type {PageData} from './$types';
    import {Separator} from "$lib/components/ui/separator";
    import Post from "$lib/models/Post";
    import {Eye} from "lucide-svelte";
    import Clock from "$lib/components/icons/Clock.svelte";

    export let data: PageData;
    const post = new Post(data.post);
</script>

<div class="container">
    <div class="w-fit">
        <h1>
            {post.displayName}
        </h1>
        <Separator class="mt-4 mb-1"/>
        <small class="flex flex-row justify-between items-center">
            <span dir="ltr">
                {post.updated.toLocaleString()}
            </span>
            <span class="flex flex-row items-center justify-center gap-2">
                <span class="flex flex-row items-center justify-center gap-1">
                    <Clock class="w-3 h-3"/>
                    {post.readTime}
                </span>
                <span class="flex flex-row items-center justify-center gap-1">
                    <Eye class="w-3 h-3"/>
                    {post.views}
                </span>
            </span>
        </small>
    </div>
    <br/>
    <article dir="ltr" class="contents">
        {@html post.content}
    </article>
</div>