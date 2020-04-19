<script>
  export let text;
  export let token;

  let reg = new RegExp("", "i");;
  let renderText = text
  $: {
    reg = new RegExp(token+"[a-z]+", "i"); //TODO: cannot match some words
    renderText = text.replace(reg, str => {
      return '<span style="color:white; background-color: #54918d;">' + str + "</span>";
    });
    console.log(renderText);
  }
</script>

<div>
  <h2>Token: {token}</h2>
  <p>{@html renderText}</p>
</div>

<style>
  div {
    width: 60%;
    margin: 0 auto;
    margin-bottom: 50px;
  }
</style>
