<script>
  "use strict";
  import { TOPIC_COUNT, TOP_TERM } from "./topicCount.js";
  import { scaleLinear } from "d3-scale";
  import { Graphic, Rectangle, XAxis, YAxis } from "@snlab/florence";

  const width = 500;
  const height = 500;

  const data = TOPIC_COUNT.sort((a, b) => a.n - b.n);
  console.log(data[data.length - 1].n);

  const scaleX = scaleLinear().domain([0, data.length + 1]);
  const scaleY = scaleLinear().domain([0, data[data.length - 1].n]);

  let hoverTopic = 0;
  let filteredTerm;

  $: hoverTopic === 0
    ? (filteredTerm = TOP_TERM)
    : (filteredTerm = TOP_TERM.filter(el => el.topic === hoverTopic));
</script>

<Graphic {width} {height} {scaleX} {scaleY} padding={30} flipY>
  {#each data as item, index}
    <Rectangle
      x1={item.topic - 0.4}
      y1={0}
      x2={item.topic + 0.4}
      y2={item.n}
      fill="#b2ded3"
      onMouseover={e => {
        hoverTopic = data[index].topic;
      }}
      onMouseout={e => (hoverTopic = 0)} />
  {/each}
  <XAxis />
  <YAxis />
</Graphic>

<p>
  {#each filteredTerm as item}{item.term + ' / '}{/each}
</p>

<style>
  p {
    font-family: "Acme", sans-serif;
    color: #b2ded3;
  }
</style>
