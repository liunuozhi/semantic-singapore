<script>
  import SGMap from "./component/SGMap.svelte";
  import Beeswarm from "./component/Beeswarm.svelte";

  // mouse click & return hex ID
  let hexID = null;
  const selectHexIDHandler = e => {
    hexID = e.detail.selectHexId;
  };
</script>

<div class="container">
  <div>
    <SGMap on:selectHexID={selectHexIDHandler} />
    <p>{hexID}</p>
  </div>

  <div>
    <Beeswarm />

  </div>

</div>

<style>
  .container {
    display: flex;
  }
</style>
