<div class="wrapper" dir="ltr">
    <h1 class="glitch text-6xl lg:text-8xl">
        EL CATO
    </h1>
</div>

<style lang="sass">
  .wrapper
    width: 100%
    height: 100%
    display: flex
    justify-content: center
    align-items: center

    h1.glitch
      color: revert
      font-family: sans-serif
      font-weight: 800
      position: relative
      padding: 30px

    h1.glitch::before, h1.glitch::after
      padding: 30px
      color: revert
      content: "EL CATO"
      position: absolute
      width: 100%
      height: 100%
      background: inherit
      overflow: hidden
      top: 0

    h1.glitch::before
      left: 3px
      text-shadow: -2px 0 red
      animation-name: glitch-animation-1
      animation-duration: 2s
      animation-timing-function: linear
      animation-delay: 0s
      animation-iteration-count: infinite
      animation-direction: reverse

    h1.glitch::after
      left: -3px
      text-shadow: -2px 0 blue
      animation-name: glitch-animation-2
      animation-duration: 2s
      animation-timing-function: linear
      animation-delay: 0s
      animation-iteration-count: infinite
      animation-direction: reverse

  @keyframes glitch-animation-1
    $steps: 20
    @for $i from 0 through $steps
      #{percentage($i*(calc(1/$steps)))}
        clip: rect(random(150)+px, 400px, random(150)+px, 30px)

  @keyframes glitch-animation-2
    $steps: 20
    @for $i from 0 through $steps
      #{percentage($i*(calc(1/$steps)))}
        clip: rect(random(150)+px, 400px, random(150)+px, 30px)
</style>