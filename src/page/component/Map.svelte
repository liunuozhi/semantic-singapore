<script>
  "use strict";
  import { onMount } from "svelte";
  import { mapbox } from "./mapbox.js";

  // set the context here...

  // export let lat;
  // export let lon;
  // export let zoom;

  const lat = 1.342669;
  const lon = 103.818275;
  const zoom = 10;

  let container;
  let map;

  onMount(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/mapbox-gl/dist/mapbox-gl.css";

    link.onload = () => {
      map = new mapbox.Map({
        container,
        style: "mapbox://styles/liunuozhi/ck9f3xv0809k01it36p6ci0e2",
        center: [lon, lat],
        zoom
      });
    };

    document.head.appendChild(link);

    return () => {
      map.remove();
      link.parentNode.removeChild(link);
    };
  });
</script>

<div bind:this={container}>
  {#if map}
    <slot />
  {/if}
</div>

<style>
  div {
    width: 700px;
    height: 400px;
  }
</style>
