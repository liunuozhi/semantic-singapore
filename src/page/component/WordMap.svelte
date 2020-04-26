<script>
  "use strict";
  import { clickHexIdWrite, hoverWordWrite } from "./store.js";
  import { PolygonLayer } from "@snlab/florence";

  ////// set up
  export let hex;
  const hexFill = "black";

  // TODO: filter hexgon by word
  
  ////// event Listener
  // select Hex
  let selectHexId = null;
  let hoverWord = null;
  hoverWordWrite.subscribe(value => hoverWord = value)

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
  fill={hexFill}
  onMouseover={mouseOverHandler}
  onMouseout={e => (selectHexId = null)}
  onClick={mouseClickHandler} />