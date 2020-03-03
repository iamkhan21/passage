<script>
  import Paragraph from "./Paragraph.svelte";
  import domtoimage from "dom-to-image-more";

  export let paragraphs;
  let disabled = true;
  let card;

  const action = {
    png: "toPng",
    jpeg: "toJpeg",
    svg: "toSvg"
  };

  $: disabled = !paragraphs.length;

  function doCardScreenshot(type) {
    return function() {
      domtoimage[action[type]](card, { bgcolor: "#fff" })
        .then(function(dataUrl) {
          const link = document.createElement("a");
          link.download = `passage.${type}`;
          link.href = dataUrl;
          link.click();
          link.remove();
        })
        .catch(function(error) {
          console.error("oops, something went wrong!", error);
        });
    };
  }
</script>

<style lang="scss">
  .card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 10px 15px 20px;
    margin-bottom: 10px;
    min-height: 450px;
    border: 1px solid #e5e5e5;
    border-radius: 5px;
  }

  .btn-group {
    display: flex;
    margin-top: 5px;

    .btn {
      flex-grow: 1;

      & + .btn {
        margin-left: 10px;
      }
    }
  }
</style>

<section>
  <div class="card" bind:this={card}>
    {#each paragraphs as text}
      <Paragraph {text} />
    {/each}
  </div>

  <small>Save as</small>
  <div class="btn-group">
    <button class="btn" {disabled} on:click={doCardScreenshot('svg')}>
      SVG
    </button>
    <button class="btn" {disabled} on:click={doCardScreenshot('png')}>
      PNG
    </button>
    <button class="btn" {disabled} on:click={doCardScreenshot('jpeg')}>
      JPEG
    </button>
  </div>
</section>
