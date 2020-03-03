<script>
  import { createEventDispatcher, onMount } from "svelte";

  const dispatch = createEventDispatcher();

  let disabled = true;
  let loading = false;
  let phrase = "";

  $: disabled = !phrase;

  function submitTest() {
    disabled = true;
    dispatch("submit", phrase.trim().replace(/\.$/, ""));
  }

  function getRandomQuote() {
    loading = true;
    fetch("https://api.quotable.io/random")
      .then(response => response.json())
      .then(data => {
        phrase = data.content;
        loading = false;
      });
  }

  onMount(() => {
    getRandomQuote();
  });
</script>

<style lang="scss">
  textarea {
    resize: none;
    width: 100%;
    border: 1px solid #e5e5e5;
  }
</style>

<div>
  <div>
    <textarea rows="5" bind:value={phrase} />
  </div>
  <div>
    <button on:click={submitTest} {disabled}>Format</button>
    <button on:click={getRandomQuote} disabled={loading}>Get quote</button>
  </div>
</div>
