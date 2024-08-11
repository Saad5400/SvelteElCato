<script lang="ts">
  import Telegram from "$lib/components/icons/Telegram.svelte";
  import CopyText from "$lib/components/CopyText.svelte";
  import { Button } from "$lib/components/ui/button";
</script>

<div
  class="roboto-mono flex w-full flex-col justify-between gap-8 text-start relative"
>

  {#if !data.pb.authStore.isValid}
    <div
      class="absolute z-10 top-0 left-0 w-full h-full bg-background/90 backdrop-blur flex justify-center items-center whitespace-normal flex-wrap">
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

  <section>
    <CopyText copyText="سعد نور" />
    الاسم لجميع الحسابات: سعد نور
  </section>
  <section class="flex flex-row justify-between items-center">
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
