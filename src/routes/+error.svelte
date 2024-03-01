<script lang="ts">
    import {page} from '$app/stores';
</script>

<div dir="ltr" class="flex flex-col justify-center items-center min-w-[100dvw] min-h-screen absolute top-0 bottom-0 left-0 right-0 z-50 bg-destructive text-destructive-foreground gap-2">
    <h1>{$page.status}</h1>
    <h2>{$page.error.message}</h2>
</div>