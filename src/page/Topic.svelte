<script>
  import SGTopic from "./component/SGTopic.svelte";
</script>

<h1>Topic</h1>
<div class="grid-2">
  <SGTopic />
</div>

<style>
  h1 {
    font-family: "Acme", sans-serif;
  }

  .grid-2 {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 2rem;
    margin: 1em 10% 1em;
  }
</style>
