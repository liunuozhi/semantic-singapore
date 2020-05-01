<script>
  "use strict";
  import { TOPIC_COUNT } from "./topicCount.js";
  import { scaleLinear } from "d3-scale";
  import { Graphic, Rectangle, XAxis, YAxis } from "@snlab/florence";
  import { hoverTopicWrite, clickTopicWrite } from "./store.js";

  export let width = 500;
  export let height = 250;

  const data = TOPIC_COUNT.sort((a, b) => a.n - b.n);

  const scaleX = scaleLinear().domain([0, data.length + 1]);
  const scaleY = scaleLinear().domain([0, data[data.length - 1].n]);

  let hoverTopic = null;
  let selectChartKey;
</script>

<div class="bar">
  <Graphic {width} {height} {scaleX} {scaleY} padding={30} flipY>

    <defs>
      <pattern
        id="pattern-stripe"
        width="4"
        height="4"
        patternUnits="userSpaceOnUse"
        patternTransform="rotate(45)">
        <rect width="2" height="4" transform="translate(0,0)" fill="white" />
      </pattern>
    </defs>

    {#each data as item, index}
      <Rectangle
        x1={item.topic - 0.4}
        y1={0}
        x2={item.topic + 0.4}
        y2={item.n}
        stroke={selectChartKey !== index ? 'white' : 'red'}
        strokeWidth="2px"
        fill="url(#pattern-stripe)"
        fillOpacity="0.5"
        onMouseover={e => {
          selectChartKey = index;
          hoverTopic = data[selectChartKey].topic;
          hoverTopicWrite.set(hoverTopic);
        }}
        onMouseout={e => {
          hoverTopic = 0;
          selectChartKey = null;
        }}
        onClick={e => {
          const clickTopic = data[index].topic;
          clickTopicWrite.set(clickTopic);
        }} />
    {/each}
    <XAxis tickColor="white" baseLineColor="white" labelColor="white" />
  </Graphic>
</div>

<style>
  .bar {
    border: 2px solid white;
    border-radius: 25px;
    margin-top: 40px;
    padding: 20px;
  }
</style>
