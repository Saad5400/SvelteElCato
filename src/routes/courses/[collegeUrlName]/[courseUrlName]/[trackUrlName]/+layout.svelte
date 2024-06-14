<script lang="ts">
  import type { LayoutData } from "./$types";
  import { page } from "$app/stores";

  export let data: LayoutData;

  $: route = $page.route.id;
</script>

<div class="flex flex-1 flex-row">
  <slot />
</div>
