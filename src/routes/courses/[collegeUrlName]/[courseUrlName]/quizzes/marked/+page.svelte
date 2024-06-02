<script lang="ts">
  import { onMount } from "svelte";
  import { persisted } from "svelte-persisted-store";
  import { goto } from "$app/navigation";

  const markedStore = persisted("markedQuestions", [] as string[]);

  onMount(() => {
    goto(`./marked/${$markedStore[0]}`)
  });
</script>