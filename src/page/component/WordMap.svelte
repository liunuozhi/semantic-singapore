<script>
  "use strict";
  import { hoverWordWrite, clickWordWrite } from "./store.js";
  import { PolygonLayer } from "@snlab/florence";
  import { TRIGRAM_HEX } from "./trigram_hex.js";
  import DataContainer from "@snlab/florence-datacontainer";

  ////// set up
  export let hex;
  const hexFill = "#54918d";

  // TODO: filter hexgon by word
  const trigramHexContainer = new DataContainer(TRIGRAM_HEX);
  ////// event Listener
  // select Hex
  let selectHexId = null;
  let hoverWord = 0;
  let clickWord = 0;

  let filterHex;

  hoverWordWrite.subscribe(value => (hoverWord = value));
  clickWordWrite.subscribe(value => (clickWord = value));

  const mouseOverHandler = e => {
    selectHexId = e.key;
  };

  const showWordHex = word => {
    const wordHex = trigramHexContainer
      .filter(row => row.gram === word)
      .column("hex_id");
    filterHex = hex.filter(row => {
      return wordHex.includes(Number(row.hex_id));
    });
  };

  $: {
    if (hoverWord !== 0) {
      showWordHex(hoverWord);
    } else {
      showWordHex(clickWord);
    }
  }
</script>

<PolygonLayer
  geometry={filterHex.column('$geometry')}
  stroke={k => (k === selectHexId ? 'red' : 'white')}
  strokeWidth={k => (k === selectHexId ? 2 : 1)}
  fill={hexFill}
  onMouseover={mouseOverHandler}
  onMouseout={e => (selectHexId = null)} />
