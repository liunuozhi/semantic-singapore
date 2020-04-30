<script>
  import SGTopic from "./component/SGTopic.svelte";
</script>

<div class="grid-2">
  <SGTopic />
</div>

<style>
  .grid-2 {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 2rem;
    margin: 1em 10% 1em;
  }
</style>
