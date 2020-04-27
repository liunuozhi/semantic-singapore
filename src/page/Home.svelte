<script>
  import SGMap from "./component/SGMap.svelte";
  import Beeswarm from "./component/Beeswarm.svelte";
  import TextView from "./component/TextView.svelte";
</script>

<div class="grid-2">
  <div class="">
    <SGMap />
  </div>

  <div class="">
    <Beeswarm />
  </div>
</div>

<div class="card">
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

/* Utilities */
.container {
  max-width: 800px;
  margin: auto;
  overflow: hidden;
  padding: 0 2rem;
}

/* Cards */
.card {
  padding: 1rem;
  border: #ccc 1px dotted;
  margin: 0.7rem 0;
}

.grid-2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 2rem;
}
</style>
