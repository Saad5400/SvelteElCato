<script lang="ts">
    import type {PageData} from './$types';
    import Course from "$lib/models/Course";
    import * as Accordion from "$lib/components/ui/accordion";

    export let data: PageData;
    const course = new Course(data.course);
</script>

<div class="container">
    <h1>
        {course.displayName}
    </h1>
    <h2>
        المسارات
    </h2>
    <Accordion.Root>
        <Accordion.Item value="item-1">
            <!--            <Accordion.Trigger>Is it accessible?</Accordion.Trigger>-->
            <!--            <Accordion.Content>-->
            <!--                Yes. It adheres to the WAI-ARIA design pattern.-->
            <!--            </Accordion.Content>-->
            {#each course.tracks as track}
                <Accordion.Trigger>
                    {track.displayName}
                </Accordion.Trigger>
                <Accordion.Content>
                    Hi
                </Accordion.Content>
            {/each}
        </Accordion.Item>
    </Accordion.Root>
</div>