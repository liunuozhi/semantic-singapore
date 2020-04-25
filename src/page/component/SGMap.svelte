<script>
  "use strict";
  import BaseMap from './BaseMap.svelte'

</script>

  <!-- base map -->
  <div class="basemap">
    <BaseMap on:selectHexID/>
  </div>

<style>
  .basemap {
    padding: 20px;
  }
</style>
