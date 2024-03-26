<script>
  import CopyText from "$lib/components/CopyText.svelte";
  import Telegram from "$lib/components/icons/Telegram.svelte";
  import { Button } from "$lib/components/ui/button";
</script>

<svelte:head>
  <title>معلومات الدفع</title>
</svelte:head>

<div class="container mb-20 flex max-w-[50rem] flex-col gap-8 text-start">
  <h1 class="text-center">معلومات الدفع</h1>
  <section>
    <CopyText copyText="سعد نور" />
    الاسم لجميع الحسابات: سعد نور
  </section>
  <section class="flex flex-row items-center">
    <div>
      <h2 class="mb-2">الراجحي</h2>
      <div>
        <CopyText copyText="SA6680000336608016309861" />
        الايبان: SA6680000336608016309861
      </div>
      <div>
        <CopyText copyText="336000010006086309861" />
        رقم الحساب: 336000010006086309861
      </div>
    </div>
    <div>
      <img src="/images/arb_qr_black.svg" alt="الراجحي" id="arb_qr_black" />
      <img src="/images/arb_qr_white.svg" alt="الراجحي" id="arb_qr_white" />
    </div>
  </section>
  <section>
    <h2 class="mb-2">الأهلي</h2>
    <div>
      <CopyText copyText="11100262830006" />
      رقم الحساب: 11100262830006
    </div>
  </section>
  <section>
    <h2 class="mb-2">STC Pay</h2>
    <div>
      <CopyText copyText="0501321169" />
      رقم الجوال: 0501321169
    </div>
  </section>
  <section>
    <h2 class="mb-2">الرجاء ارسال الايصال بعد عملية التحويل:</h2>
    <Button
      class="flex max-w-96 flex-1 flex-row items-center justify-center text-lg"
      href="https://t.me/ElCatoCS"
      target="_blank"
      rel="noopener"
    >
      <p class="hidden md:inline-block">تيليجرام</p>
      <Telegram class="ms-2 h-5 w-5" />
    </Button>
  </section>
</div>

<style lang="postcss">
  #arb_qr_black {
    @apply block dark:hidden;
  }

  #arb_qr_white {
    @apply hidden dark:block;
  }

  #arb_qr_white,
  #arb_qr_black {
    @apply mx-4 h-32 w-32;
  }
</style>
