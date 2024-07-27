<script lang="ts">
  import { Label } from "$lib/components/ui/label";
  import { Input } from "$lib/components/ui/input";
  import { Button } from "$lib/components/ui/button";
  import { applyAction, enhance } from "$app/forms";
  import type { PageData } from "./$types";
  import LoadingLoop from "virtual:icons/line-md/LoadingLoop";
  import { toast } from "svelte-sonner";
  import type { Writable } from "svelte/store";
  import { getCourseRemainder } from "$lib/models/Payment";

  let amount: number | null = null;
  let isSubmitted = false;

  export let data: PageData;
  export let accordionValue: Writable<string[]>;
  $: remainder = getCourseRemainder(data.payments, data.course);
</script>

<form
  enctype="multipart/form-data"
  method="POST"
  use:enhance={({ formElement }) => {
    isSubmitted = true;
    return async ({ result }) => {
      isSubmitted = false;
      if (result.type === "success" || result.type === "redirect") {
        toast.success(
          "سيتم مراجعة الطلب وإرسال الرد عبر البريد الإلكتروني قريبا",
        );
        formElement.reset();
        accordionValue.set([]);
        // wait for 100ms
        await new Promise((resolve) => setTimeout(resolve, 500));
        accordionValue.set(["payments"]);
        await applyAction(result);
      } else if (result.type === "failure") {
        // @ts-ignore
        toast.error(result.data.message);
      }
    };
  }}
  class="roboto-mono flex flex-col gap-4"
>
  <Input
    type="hidden"
    id="course"
    name="course"
    value={data.course.id}
    required
  />
  <div class="input">
    <Label for="receipt">إيصال التحويل</Label>
    <Input type="file" id="receipt" name="receipt" required />
  </div>
  <div class="input">
    <Label class="flex items-center justify-between" for="amount">
      <span> المبلغ المحول </span>
      <span>
        {#if remainder === null}
          <Button
            variant="outline3DFilled"
            size="sm"
            on:click={() => (amount = data.course.price)}
          >
            كامل المبلغ
          </Button>
          <Button
            variant="outline3DFilled"
            size="sm"
            on:click={() => (amount = Math.floor(data.course.price / 2))}
          >
            نصف المبلغ
          </Button>
        {:else}
          <Button
            variant="outline3DFilled"
            size="sm"
            on:click={() => (amount = remainder)}
          >
            المبلغ المتبقي
          </Button>
        {/if}
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
  <Button type="submit" variant="outline3DFilled">
    {#if isSubmitted}
      <LoadingLoop />
    {:else}
      تأكيد الدفع
    {/if}
  </Button>
</form>
