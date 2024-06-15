<script lang="ts">
  import type { PageData, PageServerData } from "./$types";
  import IconButton from "$lib/components/IconButton.svelte";
  import { Button } from "$lib/components/ui/button";
  import Edit from "virtual:icons/line-md/Edit";
  import Logout from "virtual:icons/line-md/Logout";
  import Anonymous from "$lib/components/icons/Anonymous.svelte";
  // @ts-ignore
  import * as Dialog from "$lib/components/ui/dialog";
  import { applyAction, enhance } from "$app/forms";
  import LoadingLoop from "virtual:icons/line-md/LoadingLoop";
  import Card from "$lib/components/cardsView/Card.svelte";
  import BetweenLines from "$lib/components/BetweenLines.svelte";

  export let data: PageServerData & PageData;

  let logoutRequested = false;
</script>

<div class="container flex w-full max-w-screen-lg flex-col gap-4 px-4">
  <div class="card flex flex-col">
    <BetweenLines>حسابي</BetweenLines>
    <div class="flex flex-row items-center justify-between gap-4">
      <div class="flex flex-col" dir="ltr">
        <IconButton text="تعديل">
          <Button size="icon" variant="outline3DFilled">
            <Edit class="h-6 w-6" />
          </Button>
        </IconButton>
        <Dialog.Root>
          <Dialog.Trigger>
            <IconButton text="تسجيل الخروج">
              <Button
                size="icon"
                class="bg-red-500 text-white hover:bg-red-500/80"
                variant="outline3DFilled"
              >
                <Logout class="h-6 w-6" />
              </Button>
            </IconButton>
          </Dialog.Trigger>
          <Dialog.Content class="max-w-[min(90dvw,30rem)] rounded-lg">
            <Dialog.Header>
              <Dialog.Title>متأكد تبغا تسجل خروجك؟</Dialog.Title>
              <Button>إلغاء</Button>
              <form
                method="POST"
                class="w-full"
                action="/auth/logout"
                use:enhance={() => {
                  logoutRequested = true;
                }}
              >
                <Button
                  class="w-full border-foreground/40 bg-red-500 hover:bg-red-500/80"
                  type="submit"
                  disabled={logoutRequested}
                >
                  {#if logoutRequested}
                    <LoadingLoop />
                  {:else}
                    تسجيل الخروج
                  {/if}
                </Button>
              </form>
            </Dialog.Header>
          </Dialog.Content>
        </Dialog.Root>
      </div>
      <div class="flex-1" dir="ltr">
        <h3>
          {data.user?.name}
        </h3>
        <h4>
          {data.user?.email}
        </h4>
      </div>
      <figure class="h-20 w-20 rounded-full bg-black pt-1">
        <Anonymous />
      </figure>
    </div>
  </div>
  {#if data.courses.length > 0}
    <div class="card flex flex-col">
      <BetweenLines>دوراتي</BetweenLines>
      <div class="flex flex-col">
        {#each data.courses as course}
          {#if !course.hidden}
            <Card
              href="/courses/{course.expand.college.urlName}/{course.urlName}"
            >
              {course.displayName}
            </Card>
          {/if}
        {/each}
      </div>
    </div>
  {/if}
</div>

<style>
  .card {
    @apply rounded-lg border border-b-4 border-s-4 bg-foreground/10 p-4;
  }
</style>
