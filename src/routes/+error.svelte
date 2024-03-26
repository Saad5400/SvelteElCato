<script lang="ts">
  import { page } from "$app/stores";
  import { Button } from "$lib/components/ui/button";

  function getArabicMessage(code: number) {
    switch (code) {
      case 400:
        return "الطلب غير متوافق مع البروتوكول، يلزم التصحيح وإعادة الإرسال";
      case 401:
        return "تحذير! تم تفعيل الدفاعات الإلكترونية - الدخول ممنوع";
      case 403:
        return "تحذير! تم تفعيل الدفاعات الإلكترونية - الدخول ممنوع";
      case 404:
        return "الرابط المتبع أدى إلى فراغ رقمي، المعلومات المطلوبة غير مستقرة في هذا العنوان";
      case 500:
        return "تعطل في النواة الرئيسية للخادم، جارٍ تحليل السبب الجذري";
      default:
        return "استثناء غير معالج في نواة النظام";
    }
  }

  $: code = $page.status;
  $: message = $page.error!.message;
  $: simpleMessage = getArabicMessage(code);
</script>

<svelte:head>
  <title>
    خطأ {code}
  </title>
</svelte:head>

<div
  class="absolute bottom-0 left-0 right-0 top-0 z-50 flex min-h-screen min-w-[100dvw] flex-col items-center justify-center gap-2 bg-destructive text-center text-destructive-foreground"
>
  <h1>{code}</h1>
  <h2 class="max-w-[calc(100dvw-5rem)]">{simpleMessage}</h2>
  <Button
    class="hover:underline-offset-8; h-fit text-xl text-accent-foreground underline underline-offset-4 !transition-all
    "
    href="/"
    variant="link"
  >
    العودة إلى الصفحة الرئيسية
  </Button>
  <p dir="ltr">{message}</p>
</div>
