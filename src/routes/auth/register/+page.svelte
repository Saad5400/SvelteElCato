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
  import { page } from "$app/stores";

  let name = "";
  let nameChanged = false;
  let email = "";
  let emailChanged = false;
  let password = "";
  let passwordChanged = false;
  let passwordConfirm = "";
  let passwordConfirmChanged = false;
  let showPassword = false;
  let isSubmitted = false;

  $: validName = name.length >= 2 && name.length <= 32;
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
        body: JSON.stringify({ email: email.toLowerCase() }),
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
      isSubmitted = true;
      return async ({ result }) => {
        pb.authStore.loadFromCookie(document.cookie);
        await applyAction(result);
      };
    }}
  >
    <h1 id="title">تسجيل حساب جديد</h1>
    <div class="roboto-mono flex min-w-[min(30rem,90dvw)] flex-col gap-4">
      <div class="relative flex w-full flex-col gap-2">
        <Label for="email">اسم المستخدم</Label>
        <Input
          id="name"
          name="name"
          placeholder="الاسم العلني"
          dir="auto"
          required
          bind:value={name}
          on:input={() => (nameChanged = true)}
          class={nameChanged
            ? validName
              ? "border-green-500"
              : "border-red-500"
            : ""}
        />
      </div>
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
            ? validEmail && isEmailUsed === false
              ? "border-green-500"
              : "border-red-500"
            : ""}
        />
        <Button
          variant="ghost"
          class="pointer-events-none absolute start-1.5 top-[1.6rem] h-8 w-8 hover:bg-inherit"
          tabindex={-1}
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
      <div id="password" class="relative flex w-full flex-col gap-2">
        <Label for="password">كلمة المرور</Label>
        <Input
          type={showPassword ? "text" : "password"}
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
          tabindex={-1}
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
          disabled={!validName ||
            !validEmail ||
            !passwordsMatch ||
            isEmailUsed === true ||
            isSubmitted}
        >
          {#if isSubmitted}
            <LoadingLoop />
          {:else}
            تسجيل
          {/if}
        </Button>
      </div>
      <small id="alternative" class="flex justify-between">
        عندك حساب؟
        <Button
          class="h-fit p-0"
          variant="link"
          href={`/auth/login/${$page.url.search}`}
        >
          تسجيل الدخول
        </Button>
      </small>
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
