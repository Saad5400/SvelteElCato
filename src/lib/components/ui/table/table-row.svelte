<script lang="ts">
  import { cn } from "$lib/utils";
  import type { HTMLAttributes } from "svelte/elements";

  type $$Props = HTMLAttributes<HTMLTableRowElement> & {
    "data-state"?: unknown;
  };

  let className: $$Props["class"] = undefined;
  export { className as class };
</script>

<tr
  class={cn(
    "border-b border-t-0 transition-colors data-[state=selected]:bg-muted hover:bg-muted/50",
    className,
  )}
  {...$$restProps}
  on:click
  on:keydown
>
  <slot />
</tr>
