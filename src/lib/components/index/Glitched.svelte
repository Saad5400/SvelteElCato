<script lang="ts">
    import {onMount} from "svelte";

    let classes: string = '';
    let slot: HTMLElement;

    onMount(() => {
        slot.setAttribute('data-text', slot.textContent!);
    });

    export {classes as class};
</script>

<div class="wrapper" dir="ltr">
    <h1 class="{'glitch ' + classes}" bind:this={slot}>
        <slot/>
    </h1>
</div>

<style>
    .wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .wrapper h1.glitch {
        color: revert;
        font-family: sans-serif;
        font-weight: 800;
        position: relative;
        /* font-size: 80px; */
        padding: 30px;
    }

    .wrapper h1.glitch::before,
    .wrapper h1.glitch::after {
        padding: 30px;
        color: revert;
        content: attr(data-text);
        position: absolute;
        width: 100%;
        height: 100%;
        background: inherit;
        overflow: hidden;
        top: 0;
    }

    .wrapper h1.glitch::before {
        left: 3px;
        text-shadow: -2px 0 red;
        animation-name: glitch-animation-1;
        animation-duration: 2s;
        animation-timing-function: linear;
        animation-delay: 0s;
        animation-iteration-count: infinite;
        animation-direction: reverse;
    }

    .wrapper h1.glitch::after {
        left: -3px;
        text-shadow: -2px 0 blue;
        animation-name: glitch-animation-2;
        animation-duration: 2s;
        animation-timing-function: linear;
        animation-delay: 0s;
        animation-iteration-count: infinite;
        animation-direction: reverse;
    }

    @keyframes glitch-animation-1 {
        0% {
            clip: rect(4px, 400px, 83px, 30px);
        }
        5% {
            clip: rect(49px, 400px, 95px, 30px);
        }
        10% {
            clip: rect(145px, 400px, 28px, 30px);
        }
        15% {
            clip: rect(116px, 400px, 1px, 30px);
        }
        20% {
            clip: rect(67px, 400px, 73px, 30px);
        }
        25% {
            clip: rect(9px, 400px, 136px, 30px);
        }
        30% {
            clip: rect(41px, 400px, 115px, 30px);
        }
        35% {
            clip: rect(134px, 400px, 108px, 30px);
        }
        40% {
            clip: rect(144px, 400px, 101px, 30px);
        }
        45% {
            clip: rect(128px, 400px, 67px, 30px);
        }
        50% {
            clip: rect(130px, 400px, 147px, 30px);
        }
        55% {
            clip: rect(41px, 400px, 142px, 30px);
        }
        60% {
            clip: rect(72px, 400px, 20px, 30px);
        }
        65% {
            clip: rect(76px, 400px, 96px, 30px);
        }
        70% {
            clip: rect(40px, 400px, 63px, 30px);
        }
        75% {
            clip: rect(75px, 400px, 90px, 30px);
        }
        80% {
            clip: rect(9px, 400px, 126px, 30px);
        }
        85% {
            clip: rect(74px, 400px, 125px, 30px);
        }
        90% {
            clip: rect(56px, 400px, 21px, 30px);
        }
        95% {
            clip: rect(117px, 400px, 75px, 30px);
        }
        100% {
            clip: rect(5px, 400px, 7px, 30px);
        }
    }

    @keyframes glitch-animation-2 {
        0% {
            clip: rect(46px, 400px, 110px, 30px);
        }
        5% {
            clip: rect(124px, 400px, 20px, 30px);
        }
        10% {
            clip: rect(58px, 400px, 148px, 30px);
        }
        15% {
            clip: rect(137px, 400px, 56px, 30px);
        }
        20% {
            clip: rect(75px, 400px, 41px, 30px);
        }
        25% {
            clip: rect(141px, 400px, 67px, 30px);
        }
        30% {
            clip: rect(95px, 400px, 29px, 30px);
        }
        35% {
            clip: rect(33px, 400px, 104px, 30px);
        }
        40% {
            clip: rect(6px, 400px, 98px, 30px);
        }
        45% {
            clip: rect(84px, 400px, 67px, 30px);
        }
        50% {
            clip: rect(93px, 400px, 102px, 30px);
        }
        55% {
            clip: rect(141px, 400px, 105px, 30px);
        }
        60% {
            clip: rect(93px, 400px, 127px, 30px);
        }
        65% {
            clip: rect(130px, 400px, 76px, 30px);
        }
        70% {
            clip: rect(25px, 400px, 123px, 30px);
        }
        75% {
            clip: rect(86px, 400px, 17px, 30px);
        }
        80% {
            clip: rect(93px, 400px, 35px, 30px);
        }
        85% {
            clip: rect(89px, 400px, 124px, 30px);
        }
        90% {
            clip: rect(89px, 400px, 86px, 30px);
        }
        95% {
            clip: rect(66px, 400px, 8px, 30px);
        }
        100% {
            clip: rect(10px, 400px, 45px, 30px);
        }
    }
</style>
