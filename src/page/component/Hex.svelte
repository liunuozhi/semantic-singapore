<script>
  import { getContext } from "svelte";
  import { mapbox, key } from "./mapbox.js";
  import { HEX } from "./hex.js";

  const { getMap } = getContext(key);
  const map = getMap();
  console.log(HEX);

  map.on("load", () => {
    map.addSource("hex", {
        "type": "geojson",
        "data": HEX
    });
    map.addLayer({
      id: "hex",
      type: "fill",
      source: "hex",
      paint: {
        "fill-color": "#000"
      }
    });
  });
</script>
