<script>
  import {createEventDispatcher} from "svelte";

  const dispatch = createEventDispatcher();

  let disabled = true;
  let phrase = "I am so clever that sometimes I don't understand a single word of what I am saying";

  $: disabled = !phrase;

  function submitTest() {
    disabled = true;
    dispatch("submit", phrase.trim());
  }
</script>

<form>
  <div>
    <textarea rows="5" bind:value={phrase} />
  </div>
  <button on:click={submitTest} {disabled}>Format</button>
</form>


<style lang="scss">
  textarea {
    resize: none;
    width: 100%;
    border: 1px solid #e5e5e5;
  }
</style>
