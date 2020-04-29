<script>
  "use strict";
  import BaseMap from "./BaseMap.svelte";
  import TopicMap from "./TopicMap.svelte";
  import { Graphic, createGeoScales } from "@snlab/florence";
  import DataContainer from "@snlab/florence-datacontainer";
  import { HEX } from "./hex";

  ////// data
  const hex = new DataContainer(HEX);
  ////// basemap set up
  const geoScale = createGeoScales(hex.domain("$geometry"));
  const width = 700;
  const height = 500;
</script>

<!-- base map -->
<div class="basemap">
  <Graphic {width} {height} {...geoScale} padding={20} flipY>
    <BaseMap {hex} />
    <TopicMap />
  </Graphic>
</div>

<style>

</style>
