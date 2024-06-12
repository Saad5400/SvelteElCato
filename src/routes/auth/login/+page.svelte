<script lang="ts">
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import { Button } from "$lib/components/ui/button";
  import { pb } from "$lib/pocketbase";
  import Eye from "virtual:icons/f7/Eye";
  import EyeSlash from "virtual:icons/f7/EyeSlash";
  import CheckmarkCircle from "virtual:icons/f7/CheckmarkCircle";
  import XmarkCircle from "virtual:icons/f7/XmarkCircle";
  import LoadingLoop from "virtual:icons/line-md/LoadingLoop";
  import { fade } from "svelte/transition";
  import { applyAction, enhance } from "$app/forms";
  import { toast } from "svelte-sonner";
  import useClass from "$lib/hooks/useClass";

  let email = "";
  let emailChanged = false;
  let password = "";
  let passwordChanged = false;
  let showPassword = false;
  let isSubmitted = false;

  $: validEmail = !!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  $: validPassword = password.length >= 1;
</script>

<div
  class="container flex min-h-[calc(100dvh-10rem)] items-center justify-center"
>
  <form
    class="flex flex-1 flex-col items-center gap-8"
    method="POST"
    use:enhance={() => {
      isSubmitted = true;
      return async ({ result }) => {
        if (result.status && result.status >= 200 && result.status <= 399) {
          pb.authStore.loadFromCookie(document.cookie);
          await applyAction(result);
        } else if (result.status && result.status === 401) {
          toast.error("البريد الإلكتروني أو كلمة المرور غير صحيحة");
        } else {
          toast.error(
            "حدث خطأ ما، يرجى المحاولة مرة أخرى " + JSON.stringify(result),
          );
        }
        isSubmitted = false;
        emailChanged = false;
        passwordChanged = false;
      };
    }}
  >
    <h1>تسجيل الدخول</h1>
    <div class="roboto-mono flex min-w-[min(30rem,90dvw)] flex-col gap-4">
      <div class="relative flex w-full flex-col gap-2">
        <Label for="email">البريد الإلكتروني</Label>
        <Input
          type="email"
          id="email"
          name="email"
          placeholder="email@example.com"
          dir="ltr"
          required
          bind:value={email}
          on:input={() => (emailChanged = true)}
          class={emailChanged
            ? validEmail
              ? "border-green-500"
              : "border-red-500"
            : ""}
        />
      </div>
      <div class="relative flex w-full flex-col gap-2">
        <Label for="password">كلمة المرور</Label>
        <Input
          type={showPassword ? "text" : "password"}
          id="password"
          name="password"
          placeholder="••••••••"
          dir="ltr"
          required
          bind:value={password}
          on:input={() => (passwordChanged = true)}
          class={passwordChanged
            ? validPassword
              ? "border-green-500"
              : "border-red-500"
            : ""}
        />
        <Button
          size="icon"
          variant="ghost"
          class="absolute start-1.5 top-[1.6rem] h-8 w-8 hover:bg-inherit"
          on:click={() => (showPassword = !showPassword)}
          tabindex={-1}
        >
          {#if showPassword}
            <span transition:fade class="absolute"><Eye /></span>
          {:else}
            <span transition:fade class="absolute"><EyeSlash /></span>
          {/if}
        </Button>
      </div>

      <Button
        class="w-full border-foreground"
        type="submit"
        disabled={!validPassword || !validEmail || isSubmitted}
      >
        {#if isSubmitted}
          <LoadingLoop />
        {:else}
          تسجيل الدخول
        {/if}
      </Button>
      <div class="flex flex-col">
        <small class="flex justify-between">
          نسيت كلمة المرور؟
          <Button
            class="h-fit p-0"
            variant="link"
            disabled={!validEmail}
            on:click={async () => {
              await pb.collection("users").requestPasswordReset(email);
              toast.success("تم إرسال رابط إعادة ضبط كلمة المرور إلى بريدك");
            }}
          >
            إعادة ضبط كلمة المرور
          </Button>
        </small>
        <small class="flex justify-between">
          ما عندك حساب؟
          <Button class="h-fit p-0" variant="link" href="/auth/register">
            تسجيل حساب جديد
          </Button>
        </small>
      </div>
    </div>
  </form>
</div>
