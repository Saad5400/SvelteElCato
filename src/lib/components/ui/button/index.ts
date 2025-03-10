import Root from "./button.svelte";
import { tv, type VariantProps } from "tailwind-variants";
import type { Button as ButtonPrimitive } from "bits-ui";

const buttonVariants = tv({
  base: "inline-flex items-center justify-center rounded-md text-sm font-medium whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      destructive:
        "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      destructive3D:
        "bg-destructive/70 text-destructive-foreground hover:bg-destructive/60 border-[1px] border-destructive border-r-4 border-b-4 active:border-r-2 active:border-b-2 transition-all backdrop-blur-sm",
      outline:
        "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "text-primary underline-offset-4 hover:underline text-base",
      outline3D:
        "border-input bg-background hover:bg-accent hover:text-accent-foreground border-[1px] border-r-4 border-b-4 active:border-r-2 active:border-b-2 transition-all backdrop-blur-sm",
      outline3DFilled:
        "border-background/30 bg-foreground text-background hover:bg-foreground/80 border-[1px] border-r-4 border-b-4 active:border-r-2 active:border-b-2 transition-all backdrop-blur-sm",
      outline3DLarge:
        "border-input bg-background hover:bg-accent hover:text-accent-foreground border-[1px] border-r-8 border-b-8 active:border-r-4 active:border-b-4 transition-all backdrop-blur-sm"
    },
    size: {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3 text-xs",
      lg: "h-11 rounded-md px-8",
      icon: "h-10 w-10"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "default"
  }
});

export type Variant = VariantProps<typeof buttonVariants>["variant"];
export type Size = VariantProps<typeof buttonVariants>["size"];

type Props = ButtonPrimitive.Props & {
  variant?: Variant;
  size?: Size;
  sound?: "click" | "click_correct" | "click_incorrect";
};

type Events = ButtonPrimitive.Events;

export {
  Root,
  type Props,
  type Events,
  //
  Root as Button,
  type Props as ButtonProps,
  type Events as ButtonEvents,
  buttonVariants
};
