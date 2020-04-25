<script>
  "use strict";
  import { createEventDispatcher } from "svelte";
  import { HEX } from "./hex";
  import DataContainer from "@snlab/florence-datacontainer";
  import {
    Graphic,
    PolygonLayer,
    createGeoScales,
    PointLayer
  } from "@snlab/florence";
  import { schemeAccent } from "d3-scale-chromatic";

  // setup geojson
  const hex = new DataContainer(HEX);
  const geoScale = createGeoScales(hex.domain("$geometry"));
  console.log(hex);
  
  // set up canvas
  const width = 700;
  const height = 400;
  const hexFill = "#b2ded3"

  // mouse over Hexgon, return hex_id
  let selectHexId = null;
  const dispatch = createEventDispatcher();
  const mouseOverHandler = e => {
    selectHexId = e.key;
  };

  const mouseClickHandler = () => {
    dispatch("selectHexID", { selectHexId: selectHexId });
  };
</script>

<div id="map">
  <Graphic {width} {height} {...geoScale} flipY >
    <PolygonLayer
      geometry={hex.column('$geometry')}
      stroke={k => (k === selectHexId ? 'red' : 'white')}
      strokeWidth={k => (k === selectHexId ? 2 : 1)}
      fill={hexFill}
      onMouseover={mouseOverHandler}
      onMouseout={e => (selectHexId = null)}
      onClick={mouseClickHandler} />

  </Graphic>
</div>
