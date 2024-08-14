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
  import { page } from "$app/stores";
  import { Checkbox } from "$lib/components/ui/checkbox";

  let amount: number | null = null;
  let isSubmitted = false;
  let shareAccount = false;
  let shareContent = false;
  let finalAgreement = false;

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
  class="roboto-mono flex flex-col gap-4 relative"
>

  {#if !data.pb.authStore.isValid}
    <div
      class="absolute z-10 top-0 left-0 w-full h-full bg-background/90 flex justify-center items-center whitespace-normal flex-wrap">
      <div>
        تحتاج
        <Button
          href={`/auth/login?redirect=${$page.url}`}
          variant="link"
          class="h-fit p-0"
        >
          تسجل الدخول
        </Button>
        او
        <Button
          href={`/auth/register?redirect=${$page.url}`}
          variant="link"
          class="h-fit p-0"
        >
          تسجل حساب جديد
        </Button>
        لتتمكن من الاشتراك
      </div>
    </div>
  {/if}


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
  <div class="flex items-center gap-2">
    <Checkbox id="shareAccount" name="shareAccount" bind:checked={shareAccount} />
    <Label for="shareAccount">
      أتعهد
      <span class="text-destructive">
        بعدم مشاركة الحساب
      </span>
      مع أي شخص آخر
    </Label>
  </div>
  <div class="flex items-center gap-2">
    <Checkbox id="shareContent" name="shareContent" bind:checked={shareContent} />
    <Label for="shareContent">
      أتعهد
      <span class="text-destructive">
        بعدم نشر محتوى
      </span>
      الدورة مع أي شخص آخر
    </Label>
  </div>
  <div class="flex items-center gap-2">
    <Checkbox id="finalAgreement" name="finalAgreement" bind:checked={finalAgreement} />
    <Label for="finalAgreement" class="leading-5">
      أعلم أن فريق الكاتو
      <span class="text-destructive">
        لا يحللون
      </span>
      الإخلال بالشروط المذكورة أعلاه
      وأنها
      <span class="text-destructive">
        تضر رزق الفريق بشكل مباشر
      </span>
      ولذلك قد يتم
      <span class="text-destructive">
        حظر حسابك مباشرة
      </span>
      في حال الإخلال بالشروط
    </Label>
  </div>
  <Button type="submit" variant="outline3DFilled" disabled={!shareAccount || !shareContent || !finalAgreement}>
    {#if isSubmitted}
      <LoadingLoop />
    {:else}
      تأكيد الدفع
    {/if}
  </Button>
</form>
