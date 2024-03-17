<script lang="ts">
    import {Button as ButtonPrimitive} from "bits-ui";
    import {cn} from "$lib/utils";
    import {buttonVariants, type Props, type Events} from ".";

    type $$Props = Props;
    type $$Events = Events;

    let className: $$Props["class"] = undefined;
    export let variant: $$Props["variant"] = "outline3D";
    export let size: $$Props["size"] = "default";
    export let builders: $$Props["builders"] = [];
    export {className as class};
    export let sound: "click" | "click_correct" | "click_incorrect" = "click";

    function click(e: any) {
        const audio = new Audio(`/sounds/${sound}.mp3`);
        audio.play();
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
