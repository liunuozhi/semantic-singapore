<script>
  import SGTopic from "./component/SGTopic.svelte";
  import TextView from "./component/TextView.svelte";
  import { clickHexIdWrite } from "./component/store.js";

  let clickHex = 0;
  clickHexIdWrite.subscribe(val => (clickHex = val));
</script>

<div class="home">
  <div>
    <SGTopic />
  </div>

  {#if clickHex !== 0}
    <div class="text-view">
      <TextView />
    </div>
  {/if}

</div>

<style>
  .text-view {
    border: 2px solid white;
    border-radius: 25px;
    padding: 40px 40px 40px;
    margin: 1em 10% 1em;
    background-color: #01839480;
  }
</style>
