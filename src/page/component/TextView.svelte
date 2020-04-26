<script>
  "use strict";
  import DataContainer from "@snlab/florence-datacontainer";
  import { WIKI_TEXT } from "./wiki_text.js";
  import { clickHexIdWrite, clickWordWrite } from "./store.js";
  import SvelteTooltip from "svelte-tooltip";
  import Textdemo from "./Textdemo.svelte"

  let selectedHexId = null;
  clickHexIdWrite.subscribe(value => (selectedHexId = value));
  let clickWord = null;
  clickWordWrite.subscribe(value => clickWord = value)

  // load data
  const wikiText = new DataContainer(WIKI_TEXT);
  console.log(wikiText);

  // filter data by selectedHex Id
  let articles = "";
  $: {
    if (selectedHexId != null) {
      articles = wikiText.filter(row => row.hex_id == selectedHexId);
      console.log(articles);
    }
  }

  let articleText = "";
</script>

<div>
  {#each articles.column('title') as title, index}
      <button
        on:click|preventDefault={() => {
          articleText = articles.column('text')[index];
        }}>
        {title}
      </button>
  {/each}

  {#if articleText !== ''}
    <Textdemo text={articleText} token={clickWord}/>
  {/if}

</div>
