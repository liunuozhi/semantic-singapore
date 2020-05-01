<script>
  "use strict";
  import { PolygonLayer } from "@snlab/florence";
  import DataContainer from "@snlab/florence-datacontainer";
  import { TOPIC_HEX } from "./topic_hex.js";
  import { scaleOrdinal } from "d3-scale";
  import { schemeAccent } from "d3-scale-chromatic";
  import { clickHexIdWrite } from "./store.js"

  // load data
  const topicHex = new DataContainer(TOPIC_HEX);

  // obtain bins from DataContainer method
  const myColorScale = scaleOrdinal()
    .domain(topicHex.domain("topic"))
    .range(schemeAccent);

  let hoverTopic = 0;
  let selectHex;

  const mouseOverHandler = e => {
    selectHex = e.key
    hoverTopic = topicHex.column("topic")[selectHex];
  };

  const onClickHandler = e => {
    selectHex = e.key
    const clickHexId = topicHex.column("hex_id")[selectHex];
    clickHexIdWrite.set(clickHexId) // store
  }
</script>

<PolygonLayer
  geometry={topicHex.column('$geometry')}
  fill={topicHex.map('topic', myColorScale)}
  stroke={k => (k === selectHex ? 'red' : 'white')}
  strokeWidth={k => (k === selectHex ? 2 : 1)}
  onMouseover={mouseOverHandler}
  onMouseout={e => {hoverTopic = 0; selectHex = null}} 
  onClick={onClickHandler}/>

<text
  x="650px"
  y="450px"
  text-anchor="right"
  fill="black"
  font-size="18px"
  font-family="Acme, sans-serif">
  {#if hoverTopic !== 0}{hoverTopic}{/if}
</text>
