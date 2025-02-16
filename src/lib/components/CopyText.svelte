<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import Copy from "virtual:icons/carbon/Copy";
  import { toast } from "svelte-sonner";
  import { cn } from "$lib/utils";

  export let copyText: string;
  export let variant: string = "ghost";
  let className = "";

  export { className as class };
</script>

<Button
  variant={variant}
  class={cn("gap-2", className)}
  on:click={() => {
    navigator.clipboard.writeText(copyText);
    toast.success(`تم نسخ '${copyText}' إلى الحافظة`);
  }}
>
  <Copy class="h-3 w-3" />
  <slot />
</Button>
