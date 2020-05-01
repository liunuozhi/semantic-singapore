<script>
  "use strict";
  import { clickHexIdWrite } from "./store.js";
  import { PolygonLayer } from "@snlab/florence";

  ////// set up
  export let hex;
  const hexFill = "#fff";

  ////// event Listener
  // select Hex
  let selectHexId = null;
  const mouseOverHandler = e => {
    selectHexId = e.key;
  };

  const mouseClickHandler = () => {
    clickHexIdWrite.set(selectHexId);
  };
</script>

<PolygonLayer
  geometry={hex.column('$geometry')}
  stroke={k => (k === selectHexId ? 'red' : 'white')}
  strokeWidth={k => (k === selectHexId ? 2 : 1)}
  fill="url(#pattern-stripe)"
  fillOpacity="0.4"
  onMouseover={mouseOverHandler}
  onMouseout={e => (selectHexId = null)}
  onClick={mouseClickHandler} />
