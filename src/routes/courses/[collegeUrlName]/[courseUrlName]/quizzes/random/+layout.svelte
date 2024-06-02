<script lang="ts">
  import type { LayoutData } from "./$types";

  export let data: LayoutData;
</script>

<div id="quizLayout" class="flex flex-1 flex-row overflow-x-clip">
  <slot />
</div>
