<script lang="ts">
    export let onHover = false;
</script>

<div class="container">
    <div class="{'stack ' + (onHover ? 'hover:glitch-animation' : 'glitch-animation')}" style="--stacks: 3;">
        <span style="--index: 0;"><slot/></span>
        <span style="--index: 1;"><slot/></span>
        <span style="--index: 2;"><slot/></span>
    </div>
</div>

<style>
    .stack {
        display: grid;
        grid-template-columns: 1fr;
    }

    .stack span {
        font-weight: bold;
        grid-row-start: 1;
        grid-column-start: 1;
        font-size: 4rem;
        --stack-height: calc(100% / var(--stacks) - 1px);
        --inverse-index: calc(calc(var(--stacks) - 1) - var(--index));
        --clip-top: calc(var(--stack-height) * var(--index));
        --clip-bottom: calc(var(--stack-height) * var(--inverse-index));
        clip-path: inset(var(--clip-top) 0 var(--clip-bottom) 0);
    }

    .glitch-animation span {
        animation: glitch 1s ease infinite 1s alternate-reverse;
    }

    .stack span:nth-child(odd) {
        --glitch-translate: 8px;
    }

    .stack span:nth-child(even) {
        --glitch-translate: -8px;
    }

    @keyframes glitch {
        0% {
            text-shadow: -2px 3px 0 red, 2px -3px 0 blue;
            transform: translate(var(--glitch-translate));
        }
        2% {
            text-shadow: 2px -3px 0 red, -2px 3px 0 blue;
        }
        4%, 100% {
            text-shadow: none;
            transform: none;
        }
    }
</style>