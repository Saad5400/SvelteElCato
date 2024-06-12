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

  let email = "";
  let emailChanged = false;
  let password = "";
  let passwordChanged = false;
  let passwordConfirm = "";
  let passwordConfirmChanged = false;
  let showPassword = false;
  let isSubmitted = false;

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
</script>

<div
  class="container flex min-h-[calc(100dvh-10rem)] items-center justify-center"
>
  <form
    class="flex flex-1 flex-col items-center gap-8"
    method="POST"
    use:enhance={() => {
      return async ({ result }) => {
        pb.authStore.loadFromCookie(document.cookie);
        await applyAction(result);
      };
    }}
  >
    <h1>تسجيل حساب جديد</h1>
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
            ? validEmail && isEmailUsed === false
              ? "border-green-500"
              : "border-red-500"
            : ""}
        />
        <Button
          variant="ghost"
          class="pointer-events-none absolute start-1.5 top-[1.6rem] h-8 w-8 hover:bg-inherit"
        >
          {#if validEmail && isEmailUsed === false}
            <span transition:fade class="absolute text-green-500">
              <CheckmarkCircle />
            </span>
          {:else if (!validEmail && emailChanged) || isEmailUsed === true}
            <span transition:fade class="absolute text-red-500">
              <XmarkCircle />
            </span>
          {:else if isEmailUsed === undefined && emailChanged}
            <span transition:fade class="absolute">
              <LoadingLoop />
            </span>
          {/if}
        </Button>
      </div>
      <div class="relative flex w-full flex-col gap-2">
        <Label for="password">كلمة المرور</Label>
        <Input
          type={showPassword ? "text" : "password"}
          id="password"
          name="password"
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
        <Button
          size="icon"
          variant="ghost"
          class="absolute start-1.5 top-[1.6rem] h-8 w-8 hover:bg-inherit"
          on:click={() => (showPassword = !showPassword)}
        >
          {#if showPassword}
            <span transition:fade class="absolute"><Eye /></span>
          {:else}
            <span transition:fade class="absolute"><EyeSlash /></span>
          {/if}
        </Button>
      </div>
      <div class="relative flex w-full flex-col gap-2">
        <Label for="passwordConfirm">تأكيد كلمة المرور</Label>
        <Input
          type={showPassword ? "text" : "password"}
          id="passwordConfirm"
          name="passwordConfirm"
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
        <Button
          size="icon"
          variant="ghost"
          class="absolute start-1.5 top-[1.6rem] h-8 w-8 hover:bg-inherit"
          on:click={() => (showPassword = !showPassword)}
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
        disabled={!validEmail ||
          !passwordsMatch ||
          isEmailUsed === true ||
          isSubmitted}
        on:click={() => {
          isSubmitted = true;
        }}
      >
        {#if isSubmitted}
          <LoadingLoop />
        {:else}
          تسجيل
        {/if}
      </Button>
      <small>
        عندك حساب؟
        <Button class="p-0" variant="link" href="/login">تسجيل الدخول</Button>
      </small>
    </div>
  </form>
</div>
