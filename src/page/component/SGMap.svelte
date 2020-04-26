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
<button
  on:click={() => {
    clickWord = 0;
  }}>
  Reset Map
</button>
<p>selectHex: {selectHexId}</p>
<p>selectWord: {hoverWord}</p>
<p>clickWord: {clickWord}</p>

<style>

</style>
