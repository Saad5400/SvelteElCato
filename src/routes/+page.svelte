<script lang="ts">
    import {Separator} from "$lib/components/ui/separator";
    import {Button} from "$lib/components/ui/button";
    import Telegram from "$lib/components/icons/Telegram.svelte";
    import Whatsapp from "$lib/components/icons/Whatsapp.svelte";
</script>

<div class="container max-h-full">
    <div class="grid md:grid-cols-2 min-h-[calc(100dvh-15rem)] items-center">
        <div>
            <h2 class="mt-10 text-3xl font-semibold first:mt-0 tracking-[0.2em] font-sans">
                EL CATO
            </h2>
            <Separator class="my-4"/>
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
                <Button class="flex-1 text-lg">
                    الدورات
                </Button>
                <Button class="flex-1 text-lg">
                    المنشورات
                </Button>
                <div>
                    <p>
                        تواصل معنا:
                    </p>
                    <div class="flex flex-row w-full items-center justify-center gap-2">
                        <Button class="flex-1 text-lg bg-[#017ACD] text-white hover:bg-[#017ACD]/90">
                            <a class="flex flex-row items-center justify-center" href="https://t.me/ElCatoCS" target="_blank" rel="noopener">
                                <p class="hidden md:inline-block">
                                    تيليجرام
                                </p>
                                <Telegram classes="w-5 h-5 ms-2"/>
                            </a>
                        </Button>
                        <Button class="flex-1 text-lg bg-[#278631] hover:bg-[#278631]/90  text-white">
                            <a class="flex flex-row items-center justify-center" href="https://wa.me/966501321169" target="_blank" rel="noopener">
                                <p class="hidden md:inline-block">
                                    واتس اب
                                </p>
                                <Whatsapp classes="w-5 h-5 ms-2"/>
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
        <div class="hidden md:block">
            <img src="/images/hero.svg" alt="programming illustration" class="w-full h-full dark:invert-[.90]"/>
        </div>
    </div>
</div>