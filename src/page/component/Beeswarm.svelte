<script>
  import { scaleLinear } from "d3-scale";
  import { forceSimulation, forceX, forceY, forceCollide } from "d3-force";
  import { Graphic, Point, Label, XAxis } from "@snlab/florence";
  import DataContainer from "@snlab/florence-datacontainer";
  import { TRIGRAM_HEX } from "./trigram_hex.js";
  import { TRIGRAM_COUNT } from "./trigramCount.js";
  import { hoverWordWrite, clickWordWrite, clickTopicWrite } from "./store.js";

  //////load data
  // const trigramCountContainer = new DataContainer(TRIGRAM_COUNT); // gram, count
  let topicTerms = 0;
  let clickTopic = 0;
  clickTopicWrite.subscribe(val => clickTopic = val)
  const queryTopicTerm = async () => {
    const query = await fetch("data/topicTerms.json")
      .then(res => res.json())
      .then(res => (topicTerms = res));
  };



  ///// set up
  const width = 500; // canvas
  const height = 500; // canvas
  // set color
  // const backgroundColor = "#b2ded3";
  const axisColor = "#54918d";
  const labelColor = "white";
  const circleColor = "white";
  const mouseOverColor = "#FF4D4D";
  // set other aes property
  const opacityCircle = 0.3;
  const opacityText = 0.8; // label of circle
  const fontSize = 12; // label of circle & Axis

  let circles = [];
  const simualateCollision = (data, radiusRange) => {
    let rangeCount = new DataContainer(data).domain("beta");

    // scale the data for x position and radius
    const scaleX = scaleLinear()
      .domain(rangeCount)
      .range([0, width]);
    const scaleRadius = scaleLinear()
      .domain(rangeCount)
      .range(radiusRange);

    // copy data to a new container and format the data structures
    circles = data
      .map(d => ({
        x: scaleX(d.beta),
        y: height / 2,
        radius: scaleRadius(d.beta),
        data: d
      }))
      .sort((a, b) => a.x - b.x);
    // run simulation
    const simulation = forceSimulation(circles)
      .force("collide", forceCollide(d => d.radius))
      .force("x", forceX(width / 2))
      .force("y", forceY(height / 2 + 15))
      .on("tick", () => (circles = circles));
  };

  queryTopicTerm();

  $: {
    if (topicTerms !== 0 ) {
      simualateCollision(topicTerms, [10, 40])
    }

    if (clickTopic !== 0 ) {
      const topicTermsFilter = topicTerms.filter(item => item.topic === clickTopic)
      simualateCollision(topicTermsFilter, [20, 60])
    }
  }

  // event handler
  let hoverWord = 0;
  const mouseoverHandler = e => {
    e.target.style.fontSize = 20;
    e.target.style.fill = mouseOverColor;
    hoverWord = e.target.textContent;
    hoverWordWrite.set(hoverWord);
  };
  const mouseoutHandler = e => {
    e.target.style.fontSize = fontSize;
    e.target.style.fill = labelColor;
    hoverWord = 0;
    hoverWordWrite.set(0);
  };
  const clickHandler = e => {
    clickWordWrite.set(hoverWord);
  };
</script>

<div id="beeswarm">

  <Graphic {width} {height} padding={20} >
    <text
      x={width / 2}
      y="50px"
      text-anchor="middle"
      fill="white"
      font-size="18px"
      font-family="Acme, sans-serif">
      {#if hoverWord !== 0}{hoverWord}{:else}Hover the word{/if}
    </text>
    {#each circles as circle}
      <circle
        cx={circle.x}
        cy={circle.y}
        r={circle.radius - 2}
        fill={circleColor}
        fill-opacity={opacityCircle} />
      <text
        x={circle.x}
        text-anchor="middle"
        y={circle.y}
        fill={labelColor}
        font-size={fontSize}
        opacity={opacityText}
        on:mouseover={mouseoverHandler}
        on:mouseout={mouseoutHandler}
        on:click={clickHandler}>
        {circle.data.term}
      </text>
    {/each}

  </Graphic>

</div>
