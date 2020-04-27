<script>
  export let text;
  export let token;

  let reg = new RegExp("", "gi");;
  let renderText = text
  $: {
    reg = new RegExp(token+"[a-z]+", "gi"); //TODO: cannot match some words
    renderText = text.replace(reg, str => {
      return '<span style="color:white; background-color: #b2ded3; >' + str + "</span>";
    });
  }
</script>

<div>
  <h2 class="title">Token: {token}</h2>
  <p class="content">{@html renderText}</p>
</div>

<style>
  div {
    width: 60%;
    margin: 0 auto;
    margin-bottom: 50px;
  }

</style>
