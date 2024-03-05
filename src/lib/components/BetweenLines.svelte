<script>
    let className = 'mb-2';

    export {className as class}
</script>

<header class={className}>
    <slot/>
</header>

<style lang="scss">
    header {
        @apply scroll-m-20 text-2xl font-semibold flex flex-row items-center self-stretch;

        &:before,
        &:after {
            @apply h-[1px] w-full flex-grow content-[''] bg-muted-foreground/50;
        }

        &:not(:empty) {
            @apply gap-4;
        }
    }
</style>