<script lang="ts">
  import * as HoverCard from "$lib/components/ui/hover-card";

  export let text;
</script>

<HoverCard.Root openDelay={100} closeDelay={100}>
  <HoverCard.Trigger class="flex">
    <slot />
    <span class="sr-only">{text}</span>
  </HoverCard.Trigger>
  <HoverCard.Content class="w-fit text-center">
    {text}
  </HoverCard.Content>
</HoverCard.Root>
