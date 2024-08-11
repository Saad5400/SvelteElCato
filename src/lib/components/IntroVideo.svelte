<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import LogIn from "virtual:icons/line-md/LogIn";

  export let randomQuote: string;
  let videoStarted = false;
  let videoEnded = false;
  let video: HTMLVideoElement;
  let clicks = 0;

  function enterClicked(e: any) {
    e.preventDefault();
    video.play();
    videoStarted = true;
  }

  function endVideo() {
    videoEnded = true;
    video.currentTime = 10.7;
  }

  function videoClicked(e: any) {
    e.preventDefault();
    clicks++;
    if (clicks >= 2)
      endVideo();

  }

  function timeUpdated() {
    if (video.currentTime > 9.6 && !videoEnded)
      endVideo();
  }
</script>

<div
  class="fixed top-0 left-0 w-[100dvw] h-[100dvh] z-[100] bg-background"
  hidden={videoStarted}
  dir="ltr"
>
  <div class="flex w-full h-full items-center justify-center flex-col">
    <Button
      on:click={enterClicked}
      variant="outline3DLarge"
      class="text-3xl h-fit w-fit px-12 flex gap-2"
      dir="ltr"
    >
      Enter
      <LogIn class="w-7" />
    </Button>
    <p>
      {randomQuote}
    </p>
  </div>
</div>

<button
  hidden={!videoStarted||videoEnded}
  class="fixed top-0 left-0 w-[100dvw] h-[100dvh] z-[100]"
  on:click={videoClicked}
>
    <span class="fixed top-[70%] left-1/2 -translate-y-1/2 -translate-x-1/2 bg-background/50 backdrop-blur p-2 px-8">
      Click twice to skip
    </span>
  <video
    on:ended={() => (videoEnded = true)}
    on:timeupdate={timeUpdated}
    bind:this={video}
    class="w-full h-full object-fill"
    preload="auto"
    playsInline
  >
    <source src="/videos/intro.mp4" type="video/mp4" />
  </video>
</button>
