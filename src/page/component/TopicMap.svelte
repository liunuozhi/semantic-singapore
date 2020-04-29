<script>
  "use strict";
  import { PolygonLayer } from "@snlab/florence";
  import DataContainer from "@snlab/florence-datacontainer";
  import { TOPIC_HEX } from "./topic_hex.js";
  import { scaleOrdinal } from "d3-scale";
  import { schemeAccent } from "d3-scale-chromatic";

  ////// set up
  const hexFill = "black";

  // load data
  const topicHex = new DataContainer(TOPIC_HEX);

  // obtain bins from DataContainer method
  const myColorScale = scaleOrdinal()
    .domain(topicHex.domain("topic"))
    .range(schemeAccent);

  let hoverTopic = 0;
  let selectHexId;

  const mouseOverHandler = e => {
    selectHexId = e.key
    hoverTopic = topicHex.column("topic")[selectHexId];
  };
</script>

<PolygonLayer
  geometry={topicHex.column('$geometry')}
  fill={topicHex.map('topic', myColorScale)}
  stroke={k => (k === selectHexId ? 'red' : 'white')}
  strokeWidth={k => (k === selectHexId ? 2 : 1)}
  onMouseover={mouseOverHandler}
  onMouseout={e => {hoverTopic = 0; selectHexId = null}} />

<text
  x="650px"
  y="450px"
  text-anchor="right"
  fill="black"
  font-size="18px"
  font-family="Acme, sans-serif">
  {#if hoverTopic !== 0}{hoverTopic}{/if}
</text>
