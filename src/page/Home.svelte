<script>
  import SGMap from "./component/SGMap.svelte";
  import Beeswarm from "./component/Beeswarm.svelte";
  import TextView from "./component/TextView.svelte";
</script>

<div class="container">
  <div class="item">
    <SGMap />
  </div>

  <div class="item">
    <Beeswarm />
  </div>
</div>

<div class="container">
  <div>
    <TextView />
  </div>
</div>

<style>
  .container {
    display: flex;
    flex-wrap: wrap;
    align-content: center;
  }
</style>
