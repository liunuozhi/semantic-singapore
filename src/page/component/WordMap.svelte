<script>
  "use strict";
  import { hoverWordWrite } from "./store.js";
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

  let filterHex;
      
  hoverWordWrite.subscribe(value => (hoverWord = value));

  const mouseOverHandler = e => {
    selectHexId = e.key;
  };


  $: {
    if (hoverWord !== 0) {
     const wordHex = trigramHexContainer
        .filter(row => row.gram === hoverWord)
        .column("hex_id");
      console.log(wordHex);
      filterHex = hex.filter(row => {
        return wordHex.includes(Number(row.hex_id))
      })
    } 
  }
</script>

<PolygonLayer
  geometry={filterHex.column('$geometry')}
  stroke={k => (k === selectHexId ? 'red' : 'white')}
  strokeWidth={k => (k === selectHexId ? 2 : 1)}
  fill={hexFill}
  onMouseover={mouseOverHandler}
  onMouseout={e => (selectHexId = null)}/>
