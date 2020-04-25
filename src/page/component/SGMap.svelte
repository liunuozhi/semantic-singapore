<script>
  "use strict";
  import Map from "./Map.svelte";
  import Hex from "./Hex.svelte";

  const lat = 1.226568122757727;
  const lon = 103.605701997913826;
  const zoom = 10;


  
</script>

<div class="map">
  <!-- base mao -->
  <Map {lat} {lon} {zoom}>
    <Hex />
  </Map>
  <!-- TODO: add hexagons -->
</div>

<style>
  .map {
    padding: 20px;
  }
</style>
