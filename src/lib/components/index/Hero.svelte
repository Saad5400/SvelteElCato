<script lang="ts">
  import { Separator } from "$lib/components/ui/separator";
  import Telegram from "$lib/components/icons/Telegram.svelte";
  import Whatsapp from "$lib/components/icons/Whatsapp.svelte";
  import { Button } from "$lib/components/ui/button";
  import Glitched from "$lib/components/index/Glitched.svelte";
  import HeroImage from "$lib/components/index/HeroImage.svelte";
  import useScrollTo from "$lib/hooks/useScrollTo";
</script>

<br />
<section
  class="grid min-h-[calc(100dvh-15rem)] items-start justify-center gap-4 overflow-x-clip lg:grid-cols-2 lg:items-center"
>
  <div class="self-center">
    <h2 class="mt-10">
      <Glitched
        class="glitch-always text-7xl font-extrabold tracking-[0.2em] lg:text-8xl xl:text-9xl"
      >
        EL CATO
      </Glitched>
    </h2>
    <Separator class="mb-4 mt-12" />
    <div>
      <h1 class="text-center text-2xl font-extrabold sm:text-3xl xl:text-4xl">
        دورات تدريبية مخصصة للبرمجة والمزيد!
      </h1>
      <p class="my-4 text-lg">
        اكتشف عالم البرمجة مع منصة الكاتو، وجهتك الأولى لتعلم البرمجة خصيصاً
        لطلاب الجامعات مثل
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
        التدريبية لتعزيز فهمك للمواد. واستكشف كيف يمكنك اختيار فئة أو موضوع محدد
        والحصول على مجموعة واسعة من الأسئلة المركزة حول هذا الموضوع بالتحديد،
        <b>كأنك أمام اختبار حقيقي.</b>
        مع هذه الخاصية،
        <b>يتم حفظ تقدمك تلقائيًا،</b>
        مما يتيح لك متابعة رحلتك التعليمية بسلاسة وفعالية، وتعزيز استعدادك للامتحانات
        بطريقة منظمة ومخصصة.
      </p>
    </div>
    <div class="grid gap-2">
      <Button on:click={() => useScrollTo("#courses")} class="flex-1 text-lg">
        الدورات
      </Button>
      <Button on:click={() => useScrollTo("#posts")} class="flex-1 text-lg">
        المنشورات
      </Button>
      <div>
        <p class="text-muted-foreground">تواصل معنا:</p>
        <div class="flex w-full flex-row items-center justify-center gap-2">
          <Button
            class="flex flex-1 flex-row items-center justify-center text-lg"
            href="https://t.me/ElCatoCS"
            target="_blank"
            rel="noopener"
          >
            <p class="hidden md:inline-block">تيليجرام</p>
            <span class="sr-only"> تواصل معنا عبر تيليجرام </span>
            <Telegram class="ms-2 h-5 w-5" />
          </Button>
          <Button
            class="flex flex-1 flex-row items-center justify-center text-lg"
            href="https://wa.me/966501321169"
            target="_blank"
            rel="noopener"
          >
            <p class="hidden md:inline-block">واتس اب</p>
            <span class="sr-only"> تواصل معنا عبر واتس اب </span>
            <Whatsapp class="ms-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  </div>
  <HeroImage />
</section>
