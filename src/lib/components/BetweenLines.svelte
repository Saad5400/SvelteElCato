<script>
    let className = 'mb-2';

    export {className as class}
</script>

<h3 class={className}>
    <slot/>
</h3>

<style lang="scss">
    h3 {
        @apply flex flex-row items-center self-stretch;

        &:before,
        &:after {
            @apply h-[1px] w-full flex-grow content-[''] bg-muted-foreground/50;
        }

        &:not(:empty) {
            @apply gap-4;
        }
    }
</style>