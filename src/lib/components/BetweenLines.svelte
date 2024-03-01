<script>
    let className = 'mb-2';

    export {className as class}
</script>

<h3 class={className}>
    <slot/>
</h3>

<style lang="postcss">
    h3 {
        @apply flex flex-row items-center self-stretch;

        &:before,
        &:after {
            @apply h-0.5 w-full flex-grow content-[''] bg-accent-foreground;
        }

        &:not(:empty) {
            @apply gap-4;
        }
    }
</style>