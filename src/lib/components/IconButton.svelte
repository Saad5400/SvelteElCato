<script lang="ts">
  import * as HoverCard from "$lib/components/ui/hover-card";

  export let text: string;
</script>

<HoverCard.Root>
  <HoverCard.Trigger class="flex">
    <slot />
    <span class="sr-only">{text}</span>
  </HoverCard.Trigger>
  <HoverCard.Content class="w-fit text-center">
    {text}
  </HoverCard.Content>
</HoverCard.Root>
