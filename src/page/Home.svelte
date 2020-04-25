<script>
  import SGMap from "./component/SGMap.svelte";

  // mouse over return hex ID
  let hexID = null
  const selectHexIDHandler = (e) => {hexID = e.detail.selectHexId}
</script>

<div class="container-1">
<div class="map">
  <SGMap on:selectHexID={selectHexIDHandler}/>
</div>
<div>
  <p>{ hexID }</p>
</div>
</div>

<style>
  .container-1{
    display: flex;
    flex-wrap: wrap;
  }

  .map {
    padding: 20px;
  }
</style>