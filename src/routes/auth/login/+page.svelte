<script lang="ts">
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import { Button } from "$lib/components/ui/button";
  import Eye from "virtual:icons/f7/Eye";
  import EyeSlash from "virtual:icons/f7/EyeSlash";
  import LoadingLoop from "virtual:icons/line-md/LoadingLoop";
  import { fade } from "svelte/transition";
  import { applyAction, enhance } from "$app/forms";
  import { toast } from "svelte-sonner";
  import { page } from "$app/stores";
  import type { PageData } from "./$types";

  export let data: PageData;

  let email = "";
  let emailChanged = false;
  let password = "";
  let passwordChanged = false;
  let showPassword = false;
  let isSubmitted = false;
  let resetPasswordSubmitted = false;

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
    <h1 id="title">تسجيل الدخول</h1>
    <div class="roboto-mono flex min-w-[min(30rem,90dvw)] flex-col gap-4">
      <div id="email" class="relative flex w-full flex-col gap-2">
        <Label for="email">البريد الإلكتروني</Label>
        <Input
          type="email"
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
      <div id="password" class="relative flex w-full flex-col gap-2">
        <Label for="password">كلمة المرور</Label>
        <Input
          type={showPassword ? "text" : "password"}
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
      <div id="submit">
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
      </div>
      <div id="alternative" class="flex flex-col">
        <small class="flex justify-between">
          نسيت كلمة المرور؟
          <Button
            class="h-fit p-0"
            variant="link"
            disabled={!validEmail || resetPasswordSubmitted}
            on:click={async () => {
              resetPasswordSubmitted = true;
              try {
                await new Promise((resolve) => setTimeout(resolve, 2000));
                await data.pb.collection("users").requestPasswordReset(email);
                toast.success("تم إرسال رابط إعادة ضبط كلمة المرور إلى بريدك");
              } catch (e) {
                toast.error("حدث خطأ ما");
                console.error(e);
              } finally {
                resetPasswordSubmitted = false;
              }
            }}
          >
            {#if resetPasswordSubmitted}
              <LoadingLoop />
            {:else}
              إعادة ضبط كلمة المرور
            {/if}
          </Button>
        </small>
        <small class="flex justify-between">
          ما عندك حساب؟
          <Button
            class="h-fit p-0"
            variant="link"
            href={`/auth/register/${$page.url.search}`}
          >
            تسجيل حساب جديد
          </Button>
        </small>
      </div>
    </div>
  </form>
</div>

<style>
  #title {
    view-transition-name: title;
  }

  #submit {
    view-transition-name: submit;
  }

  #alternative {
    view-transition-name: alternative;
  }

  #email {
    view-transition-name: email;
  }

  #password {
    view-transition-name: password;
  }
</style>
