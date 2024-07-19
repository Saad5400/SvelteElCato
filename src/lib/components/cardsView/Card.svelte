<script lang="ts">
  import { Button, type Variant } from "$lib/components/ui/button/index.js";
  import type { ButtonEventHandler } from "bits-ui/dist/bits/button";
  import { cn } from "$lib/utils";

  export let href: string | null = null;
  export let className = "";
  export let titleClassName = "text-2xl text-center";
  export let variant: Variant = "outline3DLarge";
  export let subtitle = "";
  export let description = "";
  export let image = "";
  export let dataSveltekitPreloadData:
    | true
    | ""
    | "hover"
    | "tap"
    | "off"
    | null
    | undefined = "hover";
  export let onClick: (
    event: ButtonEventHandler<MouseEvent>,
  ) => void = () => {};

  export { className as class };
</script>

<Button
  class={cn("flex h-fit min-w-64 flex-1 flex-col", className)}
  {variant}
  {href}
  data-sveltekit-preload-data={dataSveltekitPreloadData}
  on:click={onClick}
>
  {#if image}
    <img
      src={image}
      alt="شعار"
      class="absolute -z-10 h-full w-full object-cover opacity-20 grayscale blur-[2px]"
    />
  {/if}
  <span class={titleClassName}>
    <slot />
  </span>
  {#if subtitle}
    <span class="text-muted-foreground">
      {subtitle}
    </span>
  {/if}
  {#if description}
    <span class="my-4 text-lg text-secondary-foreground/80">
      {description}
    </span>
  {/if}
</Button>

<style lang="postcss">
  span {
    /*wrap text*/
    @apply whitespace-normal;
  }
</style>
