<script>
  "use strict";
  import { createEventDispatcher } from "svelte";
  import { PolygonLayer } from "@snlab/florence";

  ////// set up
  export let hex;
  const hexFill = "#b2ded3";
  ////// event Listener
  // select Hex
  let selectHexId = null;
  const mouseOverHandler = e => {
    selectHexId = e.key;
  };
  // dispatch selected Hex
  const dispatch = createEventDispatcher();
  const mouseClickHandler = () => {
    dispatch("selectHexID", { selectHexId: selectHexId });
  };
</script>

<PolygonLayer
  geometry={hex.column('$geometry')}
  stroke={k => (k === selectHexId ? 'red' : 'white')}
  strokeWidth={k => (k === selectHexId ? 2 : 1)}
  fill={hexFill}
  onMouseover={mouseOverHandler}
  onMouseout={e => (selectHexId = null)}
  onClick={mouseClickHandler} />
