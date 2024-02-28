<script lang="ts">
    import Hero from "$lib/components/index/Hero.svelte";
    import Courses from "$lib/components/index/Courses.svelte";
    import Posts from "$lib/components/index/Posts.svelte";

    export let data: any;
</script>

<div class="container mb-20">
    <Hero/>
    <Courses/>
    <Posts data={data.posts}/>
</div>