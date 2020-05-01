<script>
  import Home from "./page/Home.svelte";
  import About from "./page/About.svelte";
  export let nav = "home";

  let class1, class2;

  $: {
    if (nav) {
      if (nav === "home") {
        class1 = "topnav-active";
      } else {
        class1 = "";
      }
      if (nav === "about") {
        class2 = "topnav-active";
      } else {
        class2 = "";
      }
    }
  }
</script>

<main>
  <ul class="topnav">
    <a href="/" on:click|preventDefault={() => (nav = 'home')} class={class1}>
      Home
    </a>
    <a href="/" on:click|preventDefault={() => (nav = 'about')} class={class2}>
      About
    </a>
  </ul>

  <div>
    {#if nav === 'home'}
      <Home />
    {:else if nav === 'about'}
      <About />
    {/if}
  </div>

</main>

<style>
  * {
    margin: 0;
    padding: 0;
  }

  main {
    background-color: #9ac5c5;
    height: 100%;
    width: 100%;
  }

  .topnav {
    background-color: #008494;
    overflow: hidden;
    margin-bottom: 0;
    border: 0;
    box-shadow: 0px 3px 5px #006f7d;
  }

  /* Style the links inside the navigation bar */
  .topnav a {
    float: left;
    color: #f2f2f2;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    font-family: "Hind Siliguri", sans-serif;
    font-size: 17px;
  }

  /* Change the color of links on hover */
  .topnav a:hover {
    color: rgb(124, 124, 124);
  }

  /* Add a color to the active/current link */
  .topnav-active {
    background-color: #036874;
    color: white;
  }
</style>
