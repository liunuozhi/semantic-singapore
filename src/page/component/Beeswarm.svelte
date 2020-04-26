<script>
  import { scaleLinear } from "d3-scale";
  import { forceSimulation, forceX, forceY, forceCollide } from "d3-force";
  import { Graphic, Point, Label, XAxis } from "@snlab/florence";
  import DataContainer from "@snlab/florence-datacontainer";
  import { TRIGRAM_HEX } from "./trigram_hex.js";
  import { TRIGRAM_COUNT } from "./trigramCount.js";

  //////load data
  const dataContainer = new DataContainer(TRIGRAM_HEX); // hex, gram, n
  const trigramCountContainer = new DataContainer(TRIGRAM_COUNT); // gram, count 

  ///// set up
  const width = 500; // canvas
  const height = 500; // canvas
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

  // countGram <= count all gram regarding hexID
  let rangeCount = trigramCountContainer.domain("count");
  const rangeCountLowerBound = rangeCount[0] - 100;
  const rangeCountUpperBound = rangeCount[1] + 100;
  rangeCount = [rangeCountLowerBound, rangeCountUpperBound];

  // scale the data for x position and radius
  const scaleX = scaleLinear()
    .domain(rangeCount)
    .range([0, width]);
  const scaleRadius = scaleLinear()
    .domain(rangeCount)
    .range([10, 40]);
  // copy data to a new container and format the data structures
  let circles = TRIGRAM_COUNT.map(d => ({
    x: scaleX(d.count),
    y: height / 2,
    radius: scaleRadius(d.count),
    data: d
  })).sort((a, b) => a.x - b.x);
  // run simulation
  const simulation = forceSimulation(circles)
    .force("collide", forceCollide(d => d.radius))
    .force("x", forceX(width / 2))
    .force("y", forceY(height / 2))
    .on("tick", () => (circles = circles));

  let hoverWord = ""
  const mouseoverHandler = e => {
    e.target.style.fontSize = 20;
    e.target.style.fill = mouseOverColor;
    hoverWord = e.target.textContent;
  };
</script>

<div id="beeswarm">

  <Graphic {width} {height} padding={20} {backgroundColor}>

    {#each circles as circle}
      <circle
        cx={circle.x}
        cy={circle.y}
        r={circle.radius - 2}
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
        {circle.data.gram}
      </text>
    {/each}

  </Graphic>

  <h1>{hoverWord}</h1>

</div>
