<script>
    import {Separator} from "$lib/components/ui/separator";
    import Telegram from "$lib/components/icons/Telegram.svelte";
    import Whatsapp from "$lib/components/icons/Whatsapp.svelte";
    import {Button} from "$lib/components/ui/button";
    import Glitched from "$lib/components/index/Glitched.svelte";
    import HeroImage from "$lib/components/index/HeroImage.svelte";
</script>

<br/>
<section class="grid md:grid-cols-2 min-h-[calc(100dvh-15rem)] items-center justify-center gap-32 overflow-x-clip">
    <div>
        <h2 class="mt-10">
            <Glitched class="text-7xl lg:text-9xl font-extrabold tracking-[0.2em] glitch-always">EL CATO</Glitched>
        </h2>
        <Separator class="mb-4 mt-12"/>
        <div>
            <h1 class="text-4xl font-extrabold lg:text-5xl">
                دورات تدريبية مخصصة للبرمجة والمزيد!
            </h1>
            <p class="my-4 text-lg">
                اكتشف عالم البرمجة مع منصة الكاتو، وجهتك الأولى لتعلم البرمجة خصيصاً لطلاب الجامعات مثل
                <b>جامعة أم القرى.</b>
                استمتع بمجموعة شاملة من
                <b>الشروحات المسجلة</b>
                التي تغطي النواحي النظرية والعملية للمناهج،
                بالإضافة إلى شروحات مفصلة
                <b>للابات والمشاريع والتجميعات</b>
                استفد من
                <b>بنك الأسئلة</b>
                التدريبية لتعزيز فهمك للمواد. واستكشف كيف يمكنك اختيار فئة أو موضوع محدد والحصول على مجموعة واسعة من
                الأسئلة المركزة حول هذا الموضوع بالتحديد،
                <b>كأنك أمام اختبار حقيقي.</b>
                مع هذه الخاصية،
                <b>يتم حفظ تقدمك تلقائيًا،</b>
                مما يتيح لك متابعة رحلتك التعليمية بسلاسة وفعالية، وتعزيز استعدادك للامتحانات بطريقة منظمة
                ومخصصة.
            </p>
        </div>
        <div class="grid gap-2">
            <Button href="#courses" class="flex-1 text-lg" variant="outline">
                الدورات
            </Button>
            <Button href="#posts" class="flex-1 text-lg" variant="outline">
                المنشورات
            </Button>
            <div>
                <p>
                    تواصل معنا:
                </p>
                <div class="flex flex-row w-full items-center justify-center gap-2">
                    <Button class="flex-1 text-lg flex flex-row items-center justify-center"
                            href="https://t.me/ElCatoCS"
                            target="_blank" rel="noopener" variant="outline">
                        <p class="hidden md:inline-block">
                            تيليجرام
                        </p>
                        <Telegram class="w-5 h-5 ms-2"/>
                    </Button>
                    <Button class="flex-1 text-lg flex flex-row items-center justify-center"
                            href="https://wa.me/966501321169"
                            target="_blank" rel="noopener" variant="outline">
                        <p class="hidden md:inline-block">
                            واتس اب
                        </p>
                        <Whatsapp class="w-5 h-5 ms-2"/>
                    </Button>
                </div>
            </div>
        </div>
    </div>
        <HeroImage/>
</section>