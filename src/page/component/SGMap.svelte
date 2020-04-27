<script>
  "use strict";
  import BaseMap from "./BaseMap.svelte";
  import WordMap from "./WordMap.svelte";
  import { Graphic, createGeoScales } from "@snlab/florence";
  import DataContainer from "@snlab/florence-datacontainer";
  import { HEX } from "./hex";
  import { hoverWordWrite, clickWordWrite, clickHexIdWrite } from "./store.js";

  // subscrite data
  let hoverWord = null;
  let selectHexId = null;
  let clickWord = null;
  hoverWordWrite.subscribe(value => (hoverWord = value));
  clickWordWrite.subscribe(value => (clickWord = value));
  clickHexIdWrite.subscribe(value => (selectHexId = value));
  $: console.log("hoverWord:", hoverWord, "\n selectHexId", selectHexId, "\n clickWord", clickWord);

  ////// data
  const hex = new DataContainer(HEX);
  ////// basemap set up
  const geoScale = createGeoScales(hex.domain("$geometry"));
  const width = 700;
  const height = 400;
</script>

<!-- base map -->
<div class="basemap">
  <Graphic {width} {height} {...geoScale} padding={20} flipY>
    <BaseMap {hex} />
    {#if hoverWord !== 0}
      <WordMap {hex} />
    {/if}
    {#if clickWord !== 0}
      <WordMap {hex} />
    {/if}

  </Graphic>
</div>
<button class="badge"
  on:click={() => {
    clickWord = 0;
  }}>
  Reset Map
</button>

<style>
  .badge {
    font-size: 0.8rem;
    padding: 0.2rem 0.7rem;
    text-align: center;
    margin: 0.3rem;
    background: var(--light-color);
    color: #333;
    border-radius: 5px;
  }
  .badge:hover {
    background: #53aeb6;
    color: white;
  }
</style>
