<script lang="ts">
  import type { PageData } from "./$types";
  import * as Accordion from "$lib/components/ui/accordion";
  import PaymentInfo from "./PaymentInfo.svelte";
  import { Button } from "$lib/components/ui/button";
  import { Label } from "$lib/components/ui/label";
  import { Input } from "$lib/components/ui/input";

  let accordionValue: string[] = ["submit"];
  let amount: number | null = null;

  export let data: PageData;

  function expandAccordion(value: string) {
    accordionValue = [value];
  }

  $: console.log(accordionValue);
</script>

<main class="container my-8 flex max-w-screen-sm flex-col gap-8 px-4">
  <h1>
    الاشتراك بدورة
    {data.course.displayName}
  </h1>
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
      on:click={() => expandAccordion("payment")}
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
  <Accordion.Root multiple={true} value={accordionValue}>
    <Accordion.Item value="payment">
      <Accordion.Trigger>حسابات التحويل</Accordion.Trigger>
      <Accordion.Content>
        <PaymentInfo />
      </Accordion.Content>
    </Accordion.Item>
    <Accordion.Item value="submit">
      <Accordion.Trigger>تأكيد الدفع</Accordion.Trigger>
      <Accordion.Content>
        <form class="roboto-mono flex flex-col gap-4">
          <div class="input">
            <Label for="receipt">إيصال التحويل</Label>
            <Input type="file" id="receipt" name="receipt" required />
          </div>
          <div class="input">
            <Label class="flex items-center justify-between" for="amount">
              <span> المبلغ المحول </span>
              <span>
                <Button size="sm" on:click={() => (amount = data.course.price)}>
                  كامل المبلغ
                </Button>
                <Button size="sm" on:click={() => (amount = Math.floor(data.course.price / 2))}>
                  نصف المبلغ
                </Button>
              </span>
            </Label>
            <Input
              bind:value={amount}
              type="number"
              id="amount"
              name="amount"
              required
              min={0}
            />
          </div>
          <Button type="submit" variant="outline3DFilled">تأكيد الدفع</Button>
        </form>
      </Accordion.Content>
    </Accordion.Item>
  </Accordion.Root>
</main>

<style lang="postcss">
  .input {
    @apply flex flex-col gap-2;
  }
</style>
