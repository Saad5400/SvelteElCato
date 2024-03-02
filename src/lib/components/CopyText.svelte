<script lang="ts">
    import {Button} from "$lib/components/ui/button";
    import {Copy} from "lucide-svelte";
    import {toast} from "svelte-sonner";

    export let copyText: string;
</script>

<Button variant="ghost" class="gap-2" on:click={() => {
    navigator.clipboard.writeText(copyText);
    toast.success(`تم نسخ '${copyText}' إلى الحافظة`);
}}>
    <Copy class="h-3 w-3"/>
    <slot/>
</Button>