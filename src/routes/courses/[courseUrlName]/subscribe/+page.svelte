<script lang="ts">
  import type { PageData } from "./$types";
  import * as Accordion from "$lib/components/ui/accordion";
  import PaymentInfo from "./PaymentInfo.svelte";
  import { Button } from "$lib/components/ui/button";
  import ConfirmPayment from "./ConfirmPayment.svelte";
  import { writable } from "svelte/store";
  import Payments from "./Payments.svelte";
  import { getCourseRemainder } from "$lib/models/Payment";

  const accordionValue = writable([] as string[]);
  export let data: PageData;

  function expandAccordion(value: string) {
    accordionValue.set([value]);
  }

  $: remainder = getCourseRemainder(data.payments, data.course);
</script>

<svelte:head>
  <title>الاشتراك بدورة {data.course.displayName}</title>
</svelte:head>

<div class="fixed -z-10 top-0 left-0 w-[100vw] h-[100vh] bg-patteren" />
<main class="container my-8 flex max-w-screen-sm flex-col gap-8 px-4">
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
      عن طريق رفع إيصال التحويل، كما يمكنك القراءة أكثر عن تفاصيل الدورة بالأسفل:
    </p>
  {:else}
    <p class="roboto-mono">
      تبقى لك دفع مبلغ {remainder} ريال سعودي لاستكمال الاشتراك بالدورة، الرجاء تحويل المبلغ ثم تأكيد الدفع
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
        
      </Accordion.Content>
    </Accordion.Item>
    <Accordion.Item value="excluded">
      <Accordion.Trigger>ما لا يتضمنه الاشتراك</Accordion.Trigger>
      <Accordion.Content>
        
      </Accordion.Content>
    </Accordion.Item>
    <Accordion.Item value="reviews">
      <Accordion.Trigger>آراء الطلاب</Accordion.Trigger>
      <Accordion.Content>
        
      </Accordion.Content>
    </Accordion.Item>
    <Accordion.Item value="who-am-i">
      <Accordion.Trigger>مين الكاتو؟</Accordion.Trigger>
      <Accordion.Content>
        
      </Accordion.Content>
    </Accordion.Item>
  </Accordion.Root>
</main>

<style lang="postcss">
  .input {
    @apply flex flex-col gap-2;
  }
</style>
