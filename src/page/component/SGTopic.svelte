<script>
  "use strict";
  import BaseMap from "./BaseMap.svelte";
  import TopicMap from "./TopicMap.svelte";
  import WordMap from "./WordMap.svelte";
  import Barchart from "./Barchart.svelte";
  import Beeswarm from "./Beeswarm.svelte";
  import { Graphic, createGeoScales } from "@snlab/florence";
  import DataContainer from "@snlab/florence-datacontainer";
  import { HEX } from "./hex";
  import { clickTopicWrite, clickWordWrite, hoverWordWrite } from "./store.js";

  ////// data
  const hex = new DataContainer(HEX);
  let clickWord = 0;
  clickWordWrite.subscribe(val => (clickWord = val));
  let hoverWord = 0;
  hoverWordWrite.subscribe(val => (hoverWord = val));

  ////// basemap set up
  const geoScale = createGeoScales(hex.domain("$geometry"));
  const width = 700;
  const height = 700;
</script>

<!-- base map -->
<div class="grid-2">
  <div class="basemap">
    <Graphic {width} {height} {...geoScale} padding={20} flipY>
      <BaseMap {hex} />
      <!-- select layer -->

      {#if clickWord !== 0}
        <WordMap selectWord={clickWord} {hex} />
      {:else if hoverWord !== 0}
        <WordMap selectWord={hoverWord} {hex} />
      {:else}
        <TopicMap />
      {/if}
    </Graphic>
    <button
      on:click={e => {
        clickTopicWrite.set(0);
        hoverWordWrite.set(0);
        clickWordWrite.set(0);
      }}>
      Reset Map
    </button>
  </div>

  <div class="analysis">
    <div class="bar">
      <Barchart />
    </div>
    <div class="beeswarm">
      <Beeswarm />
    </div>
  </div>
</div>

<style>
  .grid-2 {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 2rem;
    margin: 1em 10% 1em;
    justify-items: center;
  }

  .basemap {
    border: 2px solid white;
    border-radius: 25px;
    padding: 40px;
    margin-top: 40px;
    background-color: #01839480;
  }

  .beeswarm {
    border: 2px solid white;
    border-radius: 25px;
    margin-top: 40px;
    padding: 20px;
    background-color: #01839480;
  }
</style>
