<script>
  "use strict";
  import { PolygonLayer } from "@snlab/florence";
  import DataContainer from "@snlab/florence-datacontainer";
  import { TOPIC_HEX } from "./topic_hex.js";
  import { scaleOrdinal } from "d3-scale";
  import { schemeAccent } from "d3-scale-chromatic";
  import {
    clickHexIdWrite,
    hoverTopicWrite,
    clickTopicWrite
  } from "./store.js";

  // load data
  const topicHex = new DataContainer(TOPIC_HEX);

  // obtain bins from DataContainer method
  const myColorScale = scaleOrdinal()
    .domain(topicHex.domain("topic"))
    .range(schemeAccent);

  // event listener
  let hoverTopic = 0;
  hoverTopicWrite.subscribe(value => (hoverTopic = value));
  let filterTopicHex;

  // clickTopic from barchart
  let clickTopic = 0;
  clickTopicWrite.subscribe(value => (clickTopic = value));

  $: {
    if (hoverTopic !== 0) {
      filterTopicHex = topicHex.filter(
        row => row.topic === "topic".concat(String(hoverTopic))
      );
    } 
    if (clickTopic !== 0) {
      filterTopicHex = topicHex.filter(
        row => row.topic === "topic".concat(String(clickTopic))
      );
    } else {
      filterTopicHex = topicHex;
    }
  }

  let selectHex = 0;
  let selectHexKey;
  let clickHexId = 0;
</script>

<PolygonLayer
  geometry={filterTopicHex.column('$geometry')}
  fill={filterTopicHex.map('topic', myColorScale)}
  stroke={k => (k === selectHexKey ? 'red' : 'white')}
  strokeWidth={k => (k === selectHexKey ? 2 : 1)}
  onMouseover={e => {
    selectHexKey = e.key
    selectHex = filterTopicHex.column('hex_id')[e.key];
  }}
  onMouseout={e => {
    selectHexKey = null;
    selectHex = 0;
  }}
  onClick={e => {
    clickHexId = topicHex.column('hex_id')[e.key];
    clickHexIdWrite.set(clickHexId);
  }} />

<text
  x="650px"
  y="450px"
  text-anchor="right"
  fill="black"
  font-size="18px"
  font-family="Acme, sans-serif">
  {#if clickHexId !== 0}{clickHexId}{/if}
</text>
