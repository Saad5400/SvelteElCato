<script>
  let className = "";

  export { className as class };
</script>

<header class={"mb-2 text-2xl " + className}>
  <slot />
</header>

<style lang="scss">
  header {
    @apply flex scroll-m-20 flex-row items-center self-stretch font-semibold;

    &:before,
    &:after {
      @apply h-[1px] flex-grow bg-muted-foreground/50 content-[''];
    }

    &:not(:empty) {
      @apply gap-4;
    }
  }
</style>
