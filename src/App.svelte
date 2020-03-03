<script>
  import { tick } from "svelte";
  import QouteCard from "./QuoteCard.svelte";
  import PhraseText from "./PhraseForm.svelte";
  import { phraseJustification } from "./utils/phraseJustification";

  let paragraphs = [];

  async function handlePhrase({ detail }) {
    paragraphs = [];
    await tick();
    paragraphs = phraseJustification(detail).map(item => item.toUpperCase());
  }
</script>

<style lang="scss">
  main {
    text-align: center;
    padding: 1em;
    max-width: 350px;
    margin: 0 auto;
    @media (min-width: 796px) {
      max-width: none;
    }
  }

  article {
    text-align: left;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 20px;
    max-width: 740px;
    margin: auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 900;
  }
</style>

<main>
  <h1>Passage</h1>
  <article>
    <PhraseText on:submit={handlePhrase} />
    <QouteCard {paragraphs} />
  </article>
</main>
