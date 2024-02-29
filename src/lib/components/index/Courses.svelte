<script lang="ts">
    import Course from "$lib/models/Course";

    export let data;
    const courses = data.items.map((course: any) => new Course(course));

    import {Button} from "$lib/components/ui/button";
</script>

<section id="courses" class="mt-40 scroll-m-20 flex flex-col gap-2">
    <h3 class="text-2xl font-semibold tracking-tight">
        الدورات
    </h3>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 lg:gap-6 justify-center items-center">
        {#each courses as course}
            <Button variant="outline3DLarge"
                    class="min-h-32 flex flex-col"
                    href="courses/{course.college.urlName}/{course.urlName}"
            >
                    <span class="text-2xl">
                            {course.displayName}
                        </span>
                <span class="text-muted-foreground">
                            {course.college.displayName}
                        </span>
                <span class="text-lg text-secondary-foreground/80 mt-4">
                            {course.description}
                        </span>
            </Button>
        {/each}
    </div>
</section>