<script lang="ts">
    interface Course {
        displayName: string;
        urlName: string;
        description: string;
    }

    interface College {
        displayName: string;
        urlName: string;
        courses: Course[];
    }

    const colleges: College[] = [
        {
            displayName: "كلية الحاسبات",
            urlName: "cis",
            courses: [
                {
                    displayName: "برمجة الحاسب الالي 1",
                    urlName: "cs1211",
                    description: "مقدمة في البرمجة"
                },
                {
                    displayName: "برمجة الحاسب الالي 2",
                    urlName: "cs1212",
                    description: "مقدمة في البرمجة"
                },
                {
                    displayName: "هياكل البيانات",
                    urlName: "ds",
                    description: "مقدمة في البرمجة"
                }
            ]
        },
        {
            displayName: "كلية الهندسة",
            urlName: "eng",
            courses: [
                {
                    displayName: "رياضيات 1",
                    urlName: "math-1",
                    description: "مقدمة في الرياضيات"
                },
                {
                    displayName: "رياضيات 2",
                    urlName: "math-2",
                    description: "مقدمة في الرياضيات"
                },
                {
                    displayName: "فيزياء 1",
                    urlName: "physics-1",
                    description: "مقدمة في الفيزياء"
                }
            ]
        }

    ]

    import {Button} from "$lib/components/ui/button";
</script>

<section id="courses" class="mt-40 scroll-m-20 flex flex-col gap-2">
    <h3 class="text-2xl font-semibold tracking-tight">
        الدورات
    </h3>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 lg:gap-6 justify-center items-center">
        {#each colleges as college}
            {#each college.courses as course}
                <Button variant="ghost" class="min-h-32 flex flex-col drop-shadow-md dark:drop-shadow-md-dark"
                        href="/{college.urlName}/{course.urlName}">
                    <span class="text-2xl">
                            {course.displayName}
                        </span>
                    <span class="text-muted-foreground">
                            {college.displayName}
                        </span>
                    <span class="text-lg text-secondary-foreground/80 mt-4">
                            {course.description}
                        </span>
                </Button>
            {/each}
        {/each}
    </div>
</section>