<script>
  "use strict";
  import DataContainer from "@snlab/florence-datacontainer";
  import { clickHexIdWrite, clickWordWrite } from "./store.js";
  import SvelteTooltip from "svelte-tooltip";
  import Textdemo from "./Textdemo.svelte";
  import { db } from "./firebase.js";

  let selectedHexId = null;
  clickHexIdWrite.subscribe(value => (selectedHexId = value));
  let clickWord = null;
  clickWordWrite.subscribe(value => (clickWord = value));

  // filter data by selectedHex Id
  let articles = [];
  const requestFirebase = async (hexToCheck) => {
    const data = await db.ref()
          .orderByChild("hex_id")
          .equalTo(Number(hexToCheck))
          .once("value");
    return data.val()
  }
  let res = {}

  $: {
    if (selectedHexId) {
      res = requestFirebase(selectedHexId)
    }
  }
  
  let articleText = "";
</script>

<div>
  {#await res}
    <p>Loading ... </p>
  {:then value}
    {#each Object.entries(value) as item}
       <button on:click={
         () => articleText = item[1].text
       }>{ item[1].title }</button>
    {/each}
  {/await}

  {#if articleText !== ''}
    <Textdemo text={articleText} token={clickWord} />
  {/if}

</div>
