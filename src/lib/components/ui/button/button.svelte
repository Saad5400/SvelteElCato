<script lang="ts">
    import {Button as ButtonPrimitive} from "bits-ui";
    import {cn} from "$lib/utils";
    import {buttonVariants, type Props, type Events} from ".";
    import useVibrate from "$lib/hooks/useVibrate";

    type $$Props = Props;
    type $$Events = Events;

    let className: $$Props["class"] = undefined;
    export let variant: $$Props["variant"] = "outline3D";
    export let size: $$Props["size"] = "default";
    export let builders: $$Props["builders"] = [];
    export {className as class};
    export let sound: $$Props["sound"] = "click";

    function click(e: any) {
        const audio = new Audio(`/sounds/${sound}.mp3`);
        audio.play();
        useVibrate(10);
    }
</script>

<ButtonPrimitive.Root
        {builders}
        class={cn(buttonVariants({ variant, size, className }))}
        type="button"
        {...$$restProps}
        on:click={click}
        on:click
        on:keydown
>
    <slot/>
</ButtonPrimitive.Root>
