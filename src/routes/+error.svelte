<script lang="ts">
    import {page} from '$app/stores';

    function getArabicMessage(code: number) {
        switch (code) {
            case 400:
                return 'الطلب غير متوافق مع البروتوكول، يلزم التصحيح وإعادة الإرسال';
            case 401:
                return "تحذير! تم تفعيل الدفاعات الإلكترونية - الدخول ممنوع";
            case 403:
                return "تحذير! تم تفعيل الدفاعات الإلكترونية - الدخول ممنوع";
            case 404:
                return "الرابط المتبع أدى إلى فراغ رقمي، المعلومات المطلوبة غير مستقرة في هذا العنوان";
            case 500:
                return "تعطل في النواة الرئيسية للخادم، جارٍ تحليل السبب الجذري";
            default:
                return 'استثناء غير معالج في نواة النظام';
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

<div class="text-center flex flex-col justify-center items-center min-w-[100dvw] min-h-screen absolute top-0 bottom-0 left-0 right-0 z-50 bg-destructive text-destructive-foreground gap-2">
    <h1>{code}</h1>
    <h2>{simpleMessage}</h2>
    <p dir="ltr">{message}</p>
</div>