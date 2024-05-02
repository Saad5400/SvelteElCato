<script lang="ts">
  import BetweenLines from "$lib/components/BetweenLines.svelte";

  export let id = "";
  export let title = "";
</script>

<section {id} class="flex scroll-m-20 flex-col gap-2">
  {#if title}
    <BetweenLines>
      {title}
    </BetweenLines>
  {/if}
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
    <slot />
  </div>
</section>
