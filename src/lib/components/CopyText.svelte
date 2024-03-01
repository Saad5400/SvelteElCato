<script>
    import {Button} from "$lib/components/ui/button";
    import {Copy} from "lucide-svelte";

    export let copyText;
</script>

<Button variant="ghost" class="gap-2" on:click={() => navigator.clipboard.writeText(copyText)}>
    <Copy class="h-3 w-3"/>
    <slot/>
</Button>