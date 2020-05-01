<script>
  "use strict";
  import BaseMap from "./BaseMap.svelte";
  import TopicMap from "./TopicMap.svelte";
  import Barchart from "./Barchart.svelte";
  import { Graphic, createGeoScales } from "@snlab/florence";
  import DataContainer from "@snlab/florence-datacontainer";
  import { HEX } from "./hex";

  ////// data
  const hex = new DataContainer(HEX);
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
      <TopicMap />
    </Graphic>
  </div>

  <div class="bar">
    <Barchart />
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
  }
</style>
