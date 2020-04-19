<script>
  import { data } from "./data.js"
  import { scaleLinear } from "d3-scale";
  import { forceSimulation, forceX, forceY, forceCollide } from "d3-force"
  import { Graphic, Point } from "@snlab/florence";

  // set up
  const width = 1000;
  const height = 240;
  const radiusforce = 10
  const radius = 2
  const opacity= 1

  // scale the data
  const scaleX = scaleLinear()
    .domain([0, 6000]) // lower and upper bound of dataset
    .range([0, width])
  let circles = data.map(d => ({x: scaleX(d.Weight_in_lbs), y: height/2, data: d})).sort((a, b) => a.x - b.x);
  console.log(circles)

  // init simulation
  const simulation = forceSimulation(circles)
    .force("collide", forceCollide(radiusforce))
    .force("x", forceX(d => d.x))
    .force("y", forceY(height / 2))
    .on("tick", () => circles=circles)

</script>

<div>
  <h1>Home</h1>
  <Graphic {width} {height} backgroundColor="#b2ded3">
    {#each circles as circle}
       <Point x={circle.x} y={circle.y}  radius={radius} fill={"white"} {opacity}/>
    {/each}
  </Graphic>
</div>

<style>
  h1 {
    color: #53aeb6
  }
</style>