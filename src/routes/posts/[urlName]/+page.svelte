<script lang="ts">
    import type {PageData} from './$types';
    import {Separator} from "$lib/components/ui/separator";
    import Post from "$lib/models/Post";
    import {Clock, Eye} from "lucide-svelte";
    import slugify from '@sindresorhus/slugify';
    import hljs from 'highlight.js';
    import java from 'highlight.js/lib/languages/java';
    import {onMount} from "svelte";

    export let data: PageData;

    let article: HTMLElement;
    let link: HTMLLinkElement;
    const linkId = 'highlightjs-style';

    onMount(async () => {
        article.style.display = 'none';

        link = document.getElementById(linkId) as HTMLLinkElement;
        if (!link) {
            link = document.createElement('link');
            link.rel = 'stylesheet';
            link.id = linkId;
            document.head.appendChild(link);
        }
        if (document.getElementsByTagName('html')[0].classList.contains('dark'))
            link.href = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/base16/bright.min.css';
        else
            link.href = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/base16/classic-light.min.css';


        article.innerHTML = data.post.content;
        const h1s = article.getElementsByTagName('h1');
        for (let i = 0; i < h1s.length; i++) {
            const h1 = h1s[i];
            h1.id = slugify(h1.textContent!);
        }

        hljs.registerLanguage('java', java);
        hljs.highlightAll();

        article.style.display = 'contents';
    });
</script>

<div class="container">
    <div class="w-fit">
        <h1>
            {data.post.displayName}
        </h1>
        <Separator class="mt-4 mb-1"/>
        <small class="flex flex-row justify-between items-center">
            <span dir="ltr">
                {data.post.updated.toLocaleString()}
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
    <article dir="ltr" bind:this={article}/>
</div>