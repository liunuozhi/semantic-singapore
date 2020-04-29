<script>
  import SGMap from "./component/SGMap.svelte";
  import Beeswarm from "./component/Beeswarm.svelte";
  import TextView from "./component/TextView.svelte";
</script>

<div class="container">
  <div class="grid-2">
    <div class="">
      <SGMap />
    </div>

    <div class="">
      <Beeswarm />
    </div>
  </div>

  <div>
    <TextView />
  </div>

</div>

<style>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  .grid-2 {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 2rem;
    margin: 1em 10% 1em;
  }
</style>
