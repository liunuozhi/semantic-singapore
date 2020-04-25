<script>
  "use strict";
  import BaseMap from './BaseMap.svelte'

</script>

  <!-- base map -->
  <div class="basemap">
    <BaseMap on:selectHexID/>
  </div>
  <!-- TODO: add hexagons -->

<style>
  .basemap {
    padding: 20px;
  }
</style>
