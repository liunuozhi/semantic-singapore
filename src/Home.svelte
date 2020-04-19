<script>
  import { data } from "./data.js"
  import { scaleLinear } from "d3-scale";
  import { forceSimulation, forceX, forceY, forceCollide } from "d3-force"
  import { Graphic, Point, Symbol_, Label, XAxis } from "@snlab/florence";

  // set up
  const width = 1000;
  const height = 400;
  const radiusforce = 20
  const radius = 19
  const opacityCircle= 0.5
  const opacityText = 0.8
  const fontSize= 12

  // scale the data
  const scaleX = scaleLinear()
    .domain([1000, 6000]) // lower and upper bound of dataset
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
       <Point x={circle.x} y={circle.y}  radius={radius} fill={"white"} opacity={opacityCircle}/>
       <!-- <Symbol_ x={circle.x} y={circle.y} shape="star5" size={radius} fill="white"/> -->
       <Label x={circle.x} y={circle.y} text={circle.data.Name} opacity={opacityText} {fontSize}/>
       
    {/each}
    <XAxis />
  </Graphic>
</div>

<style>
  h1 {
    color: #53aeb6
  }
</style>