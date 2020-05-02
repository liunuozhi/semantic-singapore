<script>
  "use strict";
  import DataContainer from "@snlab/florence-datacontainer";
  import { clickHexIdWrite, clickWordWrite } from "./store.js";
  import SvelteTooltip from "svelte-tooltip";
  import Textdemo from "./Textdemo.svelte";
  import { db } from "./firebase.js";
  import Spinner from "svelte-spinner";

  let selectedHexId = null;
  clickHexIdWrite.subscribe(value => (selectedHexId = value));
  let clickWord = null;
  clickWordWrite.subscribe(value => (clickWord = value));

  // filter data by selectedHex Id
  let articles = [];
  const requestFirebase = async hexToCheck => {
    const data = await db
      .ref()
      .orderByChild("hex_id")
      .equalTo(Number(hexToCheck))
      .once("value");
    return data.val();
  };
  let res = {};

  $: {
    if (selectedHexId) {
      res = requestFirebase(selectedHexId);
    }
  }

  let articleText = "";
</script>

<div class="card">
  {#await res}
    <p>loading ...</p>
  {:then value}
    {#each Object.entries(value) as item}
      <button class="badge" on:click={() => (articleText = item[1].text)}>
        {item[1].title}
      </button>
    {/each}
  {:catch error}
    <p>Cannot find data.</p>
  {/await}

  {#if articleText !== ''}
    <Textdemo text={articleText} token={clickWord} />
  {/if}

</div>

<style>
  .badge {
    font-size: 0.8rem;
    padding: 0.7rem 1rem;
    text-align: center;
    margin: 0.3rem;
    background: #54918d;
    color: white;
    border-radius: 5px;
    font-family: "Acme", sans-serif;
  }
  .badge:hover {
    opacity: 0.7;
  }

  /* Cards */
  .card {
    padding: 1rem;
    margin: 1em 20% 1em;
  }
</style>
