<script>
  import { onMount } from "svelte";

  export let text;
  let row, span;
  let hidden = true;

  async function drawText() {
    let coefficient = row.offsetWidth / span.offsetWidth;
    if (coefficient > 5) coefficient -= 0.08;
    else if (coefficient > 3) coefficient -= 0.06;
    else coefficient -= 0.02;
    const fontSize = Math.round(coefficient * 100) / 100;

    span.style.fontSize = `${fontSize}rem`;
    hidden = false;
  }

  onMount(() => {
    drawText();
  });
</script>

<style lang="scss">
  .row {
    width: 100%;

    &.hidden {
      visibility: hidden;
    }
  }

  .text {
    font-size: 1rem;
    font-weight: 900;
    line-height: 1;
  }
</style>

<div class="row {hidden ? 'hidden' : ''}" bind:this={row}>
  <span class="text" bind:this={span}>{text}</span>
</div>
