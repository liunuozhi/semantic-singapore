<script>
  export let text;
  export let token;

  let reg = new RegExp("", "gi");;
  let renderText = text
  $: {
    reg = new RegExp(token+"[a-z]+", "gi"); //TODO: cannot match some words
    renderText = text.replace(reg, str => {
      return '<span style="color:white; background-color: #54918d; >' + str + "</span>";
    });
  }
</script>

<div>
  <h2 class="title">Token: {token}</h2>
  <p class="content">{@html renderText}</p>
</div>

<style>
  div {
    width: 80%;
    margin: 0 auto;
    margin-bottom: 50px;
    margin-top: 50px;
  }
  h2 {
    font-family: "Acme", sans-serif;
  }

  p {
    font-family: 'Hind Siliguri', sans-serif
  }

</style>
