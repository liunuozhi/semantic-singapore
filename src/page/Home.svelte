<script>
  import SGTopic from "./component/SGTopic.svelte";
  import TextView from "./component/TextView.svelte";
</script>

<div class="home">
  <div>
    <SGTopic />
  </div>

  <div class="text-view">
    <TextView />
  </div>

</div>

<style>
  .text-view {
    height: 100vh;
    border: 2px solid white;
    border-radius: 25px;
    padding: 40px 40px 40px;
    margin: 1em 10% 1em;
    background-color: #01839480;
  }
</style>
