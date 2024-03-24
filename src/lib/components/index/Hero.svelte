<script>
    import { Separator } from "$lib/components/ui/separator";
    import Telegram from "$lib/components/icons/Telegram.svelte";
    import Whatsapp from "$lib/components/icons/Whatsapp.svelte";
    import { Button } from "$lib/components/ui/button";
    import Glitched from "$lib/components/index/Glitched.svelte";
    import HeroImage from "$lib/components/index/HeroImage.svelte";
</script>

<br />
<section
    class="grid lg:grid-cols-2 min-h-[calc(100dvh-15rem)] items-start lg:items-center justify-center gap-4 overflow-x-clip"
>
    <div class="self-center">
        <h2 class="mt-10">
            <Glitched
                class="text-7xl lg:text-8xl xl:text-9xl font-extrabold tracking-[0.2em] glitch-always"
            >
                EL CATO
            </Glitched>
        </h2>
        <Separator class="mt-12 mb-4" />
        <div>
            <h1
                class="text-2xl font-extrabold text-center sm:text-3xl xl:text-4xl"
            >
                دورات تدريبية مخصصة للبرمجة والمزيد!
            </h1>
            <p class="my-4 text-lg">
                اكتشف عالم البرمجة مع منصة الكاتو، وجهتك الأولى لتعلم البرمجة
                خصيصاً لطلاب الجامعات مثل
                <b>جامعة أم القرى.</b>
                استمتع بمجموعة شاملة من
                <b>الشروحات المسجلة</b>
                التي تغطي النواحي
                <b>النظرية والعملية</b>
                للمناهج، بالإضافة إلى شروحات مفصلة
                <b>للابات والمشاريع والتجميعات</b>
                <br />
                استفد من
                <b>بنك الأسئلة</b>
                التدريبية لتعزيز فهمك للمواد. واستكشف كيف يمكنك اختيار فئة أو موضوع
                محدد والحصول على مجموعة واسعة من الأسئلة المركزة حول هذا الموضوع
                بالتحديد،
                <b>كأنك أمام اختبار حقيقي.</b>
                مع هذه الخاصية،
                <b>يتم حفظ تقدمك تلقائيًا،</b>
                مما يتيح لك متابعة رحلتك التعليمية بسلاسة وفعالية، وتعزيز استعدادك
                للامتحانات بطريقة منظمة ومخصصة.
            </p>
        </div>
        <div class="grid gap-2">
            <Button href="#courses" class="flex-1 text-lg">الدورات</Button>
            <Button href="#posts" class="flex-1 text-lg">المنشورات</Button>
            <div>
                <p class="text-muted-foreground">تواصل معنا:</p>
                <div
                    class="flex flex-row items-center justify-center w-full gap-2"
                >
                    <Button
                        class="flex flex-row items-center justify-center flex-1 text-lg"
                        href="https://t.me/ElCatoCS"
                        target="_blank"
                        rel="noopener"
                    >
                        <p class="hidden md:inline-block">تيليجرام</p>
                        <span class="sr-only"> تواصل معنا عبر تيليجرام </span>
                        <Telegram class="w-5 h-5 ms-2" />
                    </Button>
                    <Button
                        class="flex flex-row items-center justify-center flex-1 text-lg"
                        href="https://wa.me/966501321169"
                        target="_blank"
                        rel="noopener"
                    >
                        <p class="hidden md:inline-block">واتس اب</p>
                        <span class="sr-only"> تواصل معنا عبر واتس اب </span>
                        <Whatsapp class="w-5 h-5 ms-2" />
                    </Button>
                </div>
            </div>
        </div>
    </div>
    <HeroImage />
</section>
