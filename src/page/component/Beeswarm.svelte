<script>
  import { data } from "../data.js";
  import { scaleLinear } from "d3-scale";
  import { forceSimulation, forceX, forceY, forceCollide } from "d3-force";
  import { Graphic, Point, Label, XAxis } from "@snlab/florence";

  // data
  export let pageTitle = "";

  // set up
  const width = 1200; // canvas
  const height = 400; // canvas
  const radiusUpperBound = 50; // the radius range of circle will between [ radiusLowerBound, radiusUpperBound ]
  const radiusLowerBound = 3;
  // set color
  const backgroundColor = "#b2ded3"
  const axisColor = "#54918d"
  const labelColor = "white"
  const circleColor = axisColor
  // set other aes property
  const opacityCircle = 0.3;
  const opacityText = 0.8; // label of circle
  const fontSize = 12; // label of circle & Axis

  // scale the data for x position and radius
  const scaleX = scaleLinear()
    .domain([1000, 6000]) // TODO: domain of dataset
    .range([0, width]);

  const scaleRadius = scaleLinear()
    .domain([1000, 6000])
    .range([radiusLowerBound, radiusUpperBound]);
  let circles = data
    .map(d => ({
      x: scaleX(d.Weight_in_lbs),
      y: height / 2,
      radius: scaleRadius(d.Weight_in_lbs),
      data: d
    }))
    .sort((a, b) => a.x - b.x);

  // run simulation
  const simulation = forceSimulation(circles)
    .force("collide", forceCollide(d => d.radius))
    .force("x", forceX(d => d.x))
    .force("y", forceY(height / 2))
    .on("tick", () => (circles = circles));
</script>

<div>
  <div id="beeswarm">
    <Graphic {width} {height} padding={20} {backgroundColor}>
      <!-- name of the page -->
      <Label x={30} y={30} text={pageTitle} fill={labelColor} anchorPoint="lt" fontWeight="bold"/>
      {#each circles as circle}
        <!-- draw circle -->
        <Point
          x={circle.x}
          y={circle.y}
          radius={circle.radius - 3}
          fill={circleColor}
          opacity={opacityCircle} />

        <!-- add label for each circle -->
        <Label
          x={circle.x}
          y={circle.y}
          text={circle.data.Name}
          opacity={opacityText}
          {fontSize}
          fill={labelColor} />
      {/each}
      <XAxis
        scale={scaleX}
        labelColor={axisColor}
        labelFontSize={fontSize}
        baseLineColor={axisColor} />
    </Graphic>
  </div>

  <h2>Distribution of words</h2>
</div>

<style>
  div {
    text-align: center;
  }
  h2 {
    color: #53aeb6;
    /* text-align: center; */
  }
</style>
