<script lang="ts">
  import markedStore from "$lib/stores/markedStore";
  import solvedStore from "$lib/stores/solvedStore";
  import type { LayoutData } from "./$types";

  export let data: LayoutData;

  solvedStore.set(data.user?.solvedQuestions || []);
  markedStore.set(data.user?.markedQuestions || []);
</script>

<slot />
