<script lang="ts">
    import type {PageData} from './$types';
    import {Separator} from "$lib/components/ui/separator";
    import {Calendar, Clock, Eye} from "lucide-svelte";
    import slugify from '@sindresorhus/slugify';
    import hljs from 'highlight.js';
    import java from 'highlight.js/lib/languages/java';
    import {onDestroy, onMount} from "svelte";
    import navStore, {type NavItem} from "$lib/stores/navStore";
    import {page} from "$app/stores";

    export let data: PageData;

    $: route = $page.route.id;
    $: if (route === "/posts/[urlName]") {
        setTimeout(async () => {
            await data.pb.send(`/api/posts/views/${data.post.id}`, {
                method: 'POST'
            });
        }, 10);
    }

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
        let links: NavItem[] = [];
        const h1s = article.getElementsByTagName('h1');
        for (let i = 0; i < h1s.length; i++) {
            const h1 = h1s[i];
            h1.id = slugify(h1.textContent!);
            links.push({
                title: h1.textContent!,
                href: `#${h1.id}`
            });
        }
        navStore.set({
            title: 'محتويات الصفحة',
            items: links
        });

        hljs.registerLanguage('java', java);
        hljs.highlightAll();

        article.style.display = 'contents';
    });

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
    <style>
        article a {
            @apply transition-all underline underline-offset-4 hover:underline-offset-8;
        }
        article h1,
        article h2,
        article h3,
        article h4,
        article h5,
        article h6 {
            @apply my-4;
        }
    </style>
</svelte:head>

<div class="container">
    <div class="text-center mb-8 text-primary-foreground/90">
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
    <article dir="ltr" bind:this={article}/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
</div>