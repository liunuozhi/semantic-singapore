<script>
  import SGMap from "./component/SGMap.svelte";
  import Beeswarm from "./component/Beeswarm.svelte";
  import TextView from './component/TextView.svelte';

</script>

<div class="container">
  <div>
    <SGMap />
  </div>

  <div>
    <Beeswarm />
  </div>
</div>

<div class="container">
  <TextView />
</div>

<style>
  .container {
    display: flex;
  }
</style>
