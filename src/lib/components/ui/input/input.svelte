<script lang="ts">
  import type { HTMLInputAttributes } from "svelte/elements";
  import { cn } from "$lib/utils.js";
  import type { InputEvents } from "./index.js";

  type $$Props = HTMLInputAttributes;
  type $$Events = InputEvents;

  let className: $$Props["class"] = undefined;
  export let value: $$Props["value"] = undefined;
  export let variant: "default" | "filled" = "default";
  export { className as class };

  function getVariant() {
    switch (variant) {
      case "filled":
        return "bg-foreground text-background file:text-foreground file:bg-background";
      default:
        return "bg-background text-foreground file:text-background file:bg-foreground";
    }
  }

  let base =
    "flex h-10 w-full ring-offset-background border-foreground/50 placeholder:text-muted-foreground rounded-md border-2 px-3 py-2 text-sm file:border-0 file:rounded-sm file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";
</script>

<input
  class={cn(base, getVariant(), className)}
  bind:value
  on:blur
  on:change
  on:click
  on:focus
  on:focusin
  on:focusout
  on:keydown
  on:keypress
  on:keyup
  on:mouseover
  on:mouseenter
  on:mouseleave
  on:paste
  on:input
  {...$$restProps}
/>
