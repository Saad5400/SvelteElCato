<script lang="ts">
  import { cn } from "$lib/utils";
  import type { HTMLThAttributes } from "svelte/elements";

  type $$Props = HTMLThAttributes;

  let className: $$Props["class"] = undefined;
  export { className as class };
</script>

<th
  class={cn(
    "border-x-0 border-t-0 h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
    className,
  )}
  {...$$restProps}
>
  <slot />
</th>
