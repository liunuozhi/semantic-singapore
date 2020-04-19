<script>
  import { scaleLinear } from "d3-scale";
  import { forceSimulation, forceX, forceY, forceCollide } from "d3-force";
  import { Graphic, Point, Label, XAxis } from "@snlab/florence";
  import Textdemo from "./Textdemo.svelte"

  // data
  export let pageTitle = "";
  export let data = "";
  export let text = ""
  export let dataUpperBound = 10
  export let dataLowerBound = 0

  // set up
  const width = 1200; // canvas
  const height = 300; // canvas
  const radiusUpperBound = 30; // the radius range of circle will between [ radiusLowerBound, radiusUpperBound ]
  const radiusLowerBound = 0;
  // set color
  const backgroundColor = "#b2ded3";
  const axisColor = "#54918d";
  const labelColor = "white";
  const circleColor = axisColor;
  const mouseOverColor = "#FF4D4D";
  // set other aes property
  const opacityCircle = 0.7;
  const opacityText = 0.8; // label of circle
  const fontSize = 12; // label of circle & Axis

  // scale the data for x position and radius
  const scaleX = scaleLinear()
    .domain([dataLowerBound, dataUpperBound]) // TODO: domain of dataset
    .range([0, width]);
  const scaleRadius = scaleLinear()
    .domain([dataLowerBound, dataUpperBound])
    .range([radiusLowerBound, radiusUpperBound]);

  // copy data to a new container and format the data structures
  let circles = data
    .map(d => ({
      x: scaleX(d.count),
      y: height / 2,
      radius: scaleRadius(d.count),
      data: d
    }))
    .sort((a, b) => a.x - b.x);

  // run simulation
  const simulation = forceSimulation(circles)
    .force("collide", forceCollide(d => d.radius))
    .force("x", forceX(d => d.x))
    .force("y", forceY(height / 2))
    .on("tick", () => (circles = circles));

  // mouse over handler
  let hoverWord = "";
  const mouseoverHandler = e => {
    e.target.style.fontSize = 20;
    e.target.style.fill = mouseOverColor;
    hoverWord = e.target.textContent;
  };

  console.log(circles);
  
</script>

<div>
  <div id="beeswarm">
    <Graphic {width} {height} padding={20} {backgroundColor}>
      <!-- name of the page -->
      <Label
        x={30}
        y={30}
        text={pageTitle}
        fill={labelColor}
        anchorPoint="lt"
        fontWeight="bold" />

      {#each circles as circle}
        <circle
          cx={circle.x}
          cy={circle.y}
          r={circle.radius - 3}
          fill={circleColor}
          fill-opacity={opacityCircle} />
        <text
          x={circle.x}
          y={circle.y}
          fill={labelColor}
          font-size={fontSize}
          opacity={opacityText}
          text-anchor="middle"
          on:mouseover={mouseoverHandler}
          on:mouseout={e => {
            e.target.style.fontSize = fontSize;
            e.target.style.fill = labelColor;
          }}>
          {circle.data.word}
        </text>
      {/each}
      <XAxis
        scale={scaleX}
        labelColor={axisColor}
        labelFontSize={fontSize}
        baseLineColor={axisColor} />
    </Graphic>
  </div>

  <h2 class="description">Distribution of words</h2>
  <p class="description">{pageTitle}</p>
  <!-- <Textdemo word={hoverWord}/> -->
  <Textdemo text={text} token={hoverWord}/>
</div>

<style>
  .description {
    color: #53aeb6;
    text-align: center;
  }
</style>
