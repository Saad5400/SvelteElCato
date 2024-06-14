<script lang="ts">
  import { page } from "$app/stores";
  import { toast } from "svelte-sonner";
  import { onMount } from "svelte";

  let alerted = false;
  onMount(() => {
    if ($page.url.searchParams.has("redirect") && !alerted) {
      toast.error("تحتاج تسجل دخولك للوصول للصفحة المطلوبة");
      alerted = true;
    } else {
      alerted = false;
    }
  });
</script>

<slot />
