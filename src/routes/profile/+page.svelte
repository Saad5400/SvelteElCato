<script lang="ts">
  import type { PageServerData } from "./$types";
  import IconButton from "$lib/components/IconButton.svelte";
  import { Button } from "$lib/components/ui/button";
  import Edit from "virtual:icons/carbon/Edit";
  import Logout from "virtual:icons/carbon/Logout";
  import Anonymous from "$lib/components/icons/Anonymous.svelte";
  import * as Dialog from "$lib/components/ui/dialog";

  export let data: PageServerData;
</script>

<div class="container flex w-full max-w-screen-md flex-col">
  <h2 class="self-center">إدارة الحساب</h2>
  <div class="flex flex-row items-center justify-between gap-4">
    <div class="flex" dir="ltr">
      <IconButton text="تعديل">
        <Button size="icon" variant="ghost">
          <Edit class="h-6 w-6 text-primary" />
        </Button>
      </IconButton>
      <Dialog.Root>
        <Dialog.Trigger>
          <IconButton text="تسجيل الخروج">
            <Button size="icon" variant="ghost">
              <Logout class="h-6 w-6 text-red-500" />
            </Button>
          </IconButton>
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>متأكد تبغا تسجل خروجك؟</Dialog.Title>
            <Button>إلغاء</Button>
            <Button class="border-foreground/40 bg-red-500 hover:bg-red-500/80">
              تسجيل الخروج
            </Button>
          </Dialog.Header>
        </Dialog.Content>
      </Dialog.Root>
    </div>
    <div class="flex-1" dir="ltr">
      <h3>
        {data.user.name}
      </h3>
      <h4>
        {data.user.email}
      </h4>
    </div>
    <figure class="h-20 w-20 rounded-full bg-black pt-1">
      <Anonymous />
    </figure>
  </div>
</div>
