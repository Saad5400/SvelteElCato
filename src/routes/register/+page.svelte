<script lang="ts">
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import { Button } from "$lib/components/ui/button";
  import useClass from "$lib/hooks/useClass";
  import { pb } from "$lib/pocketbase";
  import type { ClientResponseError } from "pocketbase";

  let email = "";
  let emailChanged = false;
  let password = "";
  let passwordChanged = false;
  let passwordConfirm = "";
  let passwordConfirmChanged = false;

  $: validEmail =
    email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) && emailUsedDebounce();
  $: passwordsMatch = password.length >= 8 && password === passwordConfirm;

  let isEmailUsed: undefined | boolean = undefined;
  let emailUsedTimeout: any;

  function emailUsedDebounce() {
    isEmailUsed = undefined;
    clearTimeout(emailUsedTimeout);
    emailUsedTimeout = setTimeout(async () => {
      isEmailUsed = await pb.send("/api/users/exists", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
    }, 500);

    return true;
  }

  $: console.log(isEmailUsed);
</script>

<div
  class="container flex min-h-[calc(100dvh-10rem)] items-center justify-center"
>
  <form class="flex flex-1 flex-col items-center gap-8">
    <h1>تسجيل حساب جديد</h1>
    <div class="roboto-mono flex min-w-[min(30rem,90dvw)] flex-col gap-4">
      <div class="flex w-full flex-col gap-2">
        <Label for="email">البريد الإلكتروني</Label>
        <Input
          type="email"
          id="email"
          placeholder="email@example.com"
          dir="ltr"
          required
          bind:value={email}
          on:input={() => (emailChanged = true)}
          class={emailChanged
            ? validEmail && isEmailUsed === false
              ? "border-green-500"
              : "border-red-500"
            : ""}
        />
      </div>
      <div class="w-ful flex flex-col gap-2">
        <Label for="password">كلمة المرور</Label>
        <Input
          type="password"
          id="password"
          placeholder="••••••••"
          minlength={8}
          dir="ltr"
          required
          bind:value={password}
          on:input={() => (passwordChanged = true)}
          class={passwordChanged
            ? password.length >= 8
              ? "border-green-500"
              : "border-red-500"
            : ""}
        />
      </div>
      <div class="w-ful flex flex-col gap-2">
        <Label for="passwordConfirm">تأكيد كلمة المرور</Label>
        <Input
          type="password"
          id="passwordConfirm"
          placeholder="••••••••"
          minlength={8}
          dir="ltr"
          required
          bind:value={passwordConfirm}
          on:input={() => (passwordConfirmChanged = true)}
          class={passwordConfirmChanged
            ? passwordsMatch
              ? "border-green-500"
              : "border-red-500"
            : ""}
        />
      </div>

      <Button class="w-full" variant="outline3DFilled" type="submit">
        تسجيل
      </Button>
      <small>
        عندك حساب؟
        <Button class="p-0" variant="link" href="/login">تسجيل الدخول</Button>
      </small>
    </div>
  </form>
</div>
