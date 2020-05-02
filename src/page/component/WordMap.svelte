<script>
  "use strict";
  import { clickTopicWrite } from "./store.js";
  import { PolygonLayer } from "@snlab/florence";
  import DataContainer from "@snlab/florence-datacontainer";

  ////// set up
  const hexFill = "white";
  export let hex;
  export let selectWord;
  let clickTopic = 0;
  clickTopicWrite.subscribe(val => (clickTopic = val));

  let hexTerms = 0;
  const queryHexTerm = async () => {
    const res = await fetch("data/hexTerm.json")
      .then(res => res.json())
      .then(res => (hexTerms = new DataContainer(res)));
  };

  let filterHex = hexTerms;
  const filterHexTerm = word => {
    const wordHexId = hexTerms
      .filter(row => row.gram === word)
      .column("hex_id");
    filterHex = hex.filter(row => {
      return wordHexId.includes(row.hex_id);
    });
  };

  queryHexTerm();
  $: {
    if (selectWord !== 0 && hexTerms !== 0) {
      filterHexTerm(selectWord);
    }
  }

  ////// event Listener
  // select Hex
  let selectHexId = null;
  const mouseOverHandler = e => {
    selectHexId = e.key;
  };
</script>

{#if hexTerms !== 0}
  <PolygonLayer
    geometry={filterHex.column('$geometry')}
    stroke={k => (k === selectHexId ? 'red' : 'white')}
    strokeWidth={k => (k === selectHexId ? 2 : 1)}
    fill={hexFill}
    onMouseover={mouseOverHandler}
    onMouseout={e => (selectHexId = null)} />
{/if}
