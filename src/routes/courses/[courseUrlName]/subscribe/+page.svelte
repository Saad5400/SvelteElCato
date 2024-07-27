<script lang="ts">
  import type { PageData } from "./$types";
  import * as Accordion from "$lib/components/ui/accordion";
  import PaymentInfo from "./PaymentInfo.svelte";
  import { Button } from "$lib/components/ui/button";
  import ConfirmPayment from "./ConfirmPayment.svelte";
  import { writable } from "svelte/store";
  import Payments from "./Payments.svelte";
  import { getCourseRemainder } from "$lib/models/Payment";
  import { courseUrl } from "$lib/models/Course";
  import Article from "$lib/components/Article.svelte";
    import Reviews from "./Reviews.svelte";
    import WhoIsElCato from "./WhoIsElCato.svelte";

  const accordionValue = writable(['who-am-i'] as string[]);
  export let data: PageData;

  function expandAccordion(value: string) {
    accordionValue.set([value]);
  }

  $: remainder = getCourseRemainder(data.payments, data.course);
</script>

<svelte:head>
  <title>الاشتراك بدورة {data.course.displayName}</title>
</svelte:head>

<div class="bg-patteren fixed left-0 top-0 -z-10 h-[100vh] w-[100vw]" />
<main class="container my-8 flex max-w-screen-md flex-col gap-8 px-4">
  <h1>
    الاشتراك بدورة
    {data.course.displayName}
  </h1>
  {#if remainder === null}
    <p class="roboto-mono">
      للاشتراك الرجاء تحويل مبلغ
      <span class="underline underline-offset-4">
        {data.course.price}
        ريال سعودي
      </span>
      لأحد
      <Button
        variant="link"
        class="h-fit p-0"
        on:click={() => expandAccordion("payment-info")}
      >
        حسابات التحويل
      </Button>
      البنكية، من ثم
      <Button
        variant="link"
        class="h-fit p-0"
        on:click={() => expandAccordion("submit")}
      >
        تأكيد الدفع
      </Button>
      عن طريق رفع إيصال التحويل، كما يمكنك القراءة أكثر عن تفاصيل الدورة بالأسفل
      او مشاهدة
      <Button variant="link" class="h-fit p-0" href={courseUrl(data.course)}>
        الشرح والتمارين التجريبية
      </Button>
    </p>
  {:else}
    <p class="roboto-mono">
      تبقى لك دفع مبلغ {remainder} ريال سعودي لاستكمال الاشتراك بالدورة، الرجاء تحويل
      المبلغ ثم تأكيد الدفع
    </p>
  {/if}
  <Accordion.Root multiple={true} value={$accordionValue} class="bg-background">
    <Accordion.Item value="payment-info">
      <Accordion.Trigger>حسابات التحويل</Accordion.Trigger>
      <Accordion.Content>
        <PaymentInfo />
      </Accordion.Content>
    </Accordion.Item>
    <Accordion.Item value="submit">
      <Accordion.Trigger>تأكيد الدفع</Accordion.Trigger>
      <Accordion.Content>
        <ConfirmPayment {data} {accordionValue} />
      </Accordion.Content>
    </Accordion.Item>
    <Accordion.Item value="payments">
      <Accordion.Trigger>عمليات الدفع</Accordion.Trigger>
      <Accordion.Content>
        <Payments {data} />
      </Accordion.Content>
    </Accordion.Item>
    <Accordion.Item value="included">
      <Accordion.Trigger>ما يتضمنه الاشتراك</Accordion.Trigger>
      <Accordion.Content>
        <Article content={data.course.included} />
      </Accordion.Content>
    </Accordion.Item>
    <Accordion.Item value="excluded">
      <Accordion.Trigger>ما لا يتضمنه الاشتراك</Accordion.Trigger>
      <Accordion.Content>
        <Article content={data.course.excluded} />
      </Accordion.Content>
    </Accordion.Item>
    <Accordion.Item value="reviews">
      <Accordion.Trigger>تجارب المشتركين</Accordion.Trigger>
      <Accordion.Content>
        <Reviews />
      </Accordion.Content>
    </Accordion.Item>
    <Accordion.Item value="who-am-i">
      <Accordion.Trigger>مين الكاتو؟</Accordion.Trigger>
      <Accordion.Content>
        <WhoIsElCato />
      </Accordion.Content>
    </Accordion.Item>
  </Accordion.Root>
</main>

<style lang="postcss">
  .input {
    @apply flex flex-col gap-2;
  }
</style>
