<script lang="ts">
  import { onMount } from "svelte";

  let classes: string = "";
  let slot: HTMLElement;

  onMount(() => {
    slot.setAttribute("data-text", slot.textContent!);
  });

  export { classes as class };
</script>

<div class="relative text-center">
  <div class={"glitch w-full " + classes} bind:this={slot}>
    <slot />
  </div>
</div>

<style lang="scss">
  .glitch {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    //color: #fff;
    //font-size: 130px;
    text-decoration: none;
    //font-family: 'Poppins', sans-serif;
    //font-weight: 700;

    &:before,
    &:after {
      content: attr(data-text);
      opacity: 0.8;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
    }

    &:before {
      @apply text-[#0ff] dark:text-[#f0f];
      z-index: -1;
    }

    &:after {
      @apply text-[#f0f] dark:text-[#0ff];
      z-index: -2;
    }
  }

  .glitch-always {
    &:before {
      animation: glitch 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite;
    }

    &:after {
      animation: glitch 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) reverse both
        infinite;
    }
  }

  .glitch-hover {
    &:hover {
      &:before {
        animation: glitch 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both
          infinite;
      }

      &:after {
        animation: glitch 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) reverse both
          infinite;
      }
    }
  }

  @keyframes glitch {
    0% {
      -webkit-transform: translate(0);
      transform: translate(0);
    }
    20% {
      -webkit-transform: translate(-5px, 5px);
      transform: translate(-5px, 5px);
      transform: skewX(10deg);
    }
    40% {
      -webkit-transform: translate(-5px, -5px);
      transform: translate(-5px, -5px);
    }
    60% {
      -webkit-transform: translate(5px, 5px);
      transform: translate(5px, 5px);
    }
    80% {
      -webkit-transform: translate(5px, -5px);
      transform: translate(5px, -5px);
    }
    to {
      -webkit-transform: translate(0);
      transform: translate(0);
    }
  }
</style>
