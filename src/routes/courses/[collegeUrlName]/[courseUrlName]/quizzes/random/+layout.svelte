<script lang="ts">
  import type { LayoutData } from "./$types";
  import { persisted } from "svelte-persisted-store";

  const solvedStore = persisted("solvedQuestions", [] as string[]);
  const markedStore = persisted("markedQuestions", [] as string[]);

  export let data: LayoutData;
</script>

<slot />
