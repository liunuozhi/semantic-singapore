<script>
  import { data } from "./data.js"
  import { scaleLinear } from "d3-scale";
  import { forceSimulation, forceX, forceY, forceCollide } from "d3-force"
  import { Graphic, Point, Symbol_, Label, XAxis } from "@snlab/florence";

  // set up
  const width = 1000;
  const height = 400;
  const radiusforce = 25
  const radius = 23
  const opacityCircle= 0.4
  const opacityText = 0.8
  const fontSize= 12
  const textColor = "#54918d"

  // scale the data
  const scaleX = scaleLinear()
    .domain([1000, 6000]) // lower and upper bound of dataset
    .range([0, width])

  const scaleRadius = scaleLinear()
    .domain([1000, 6000])
    .range([5, radius])
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
  <br>
  <div id="beeswarm">
    <Graphic {width} {height} padding={20} backgroundColor="#b2ded3">
    {#each circles as circle}
       <Point x={circle.x} y={circle.y}  radius={radius} fill={"white"} opacity={opacityCircle}/>
       <!-- <Symbol_ x={circle.x} y={circle.y} shape="star5" size={radius} fill="white"/> -->
       <Label x={circle.x} y={circle.y} text={circle.data.Name} opacity={opacityText} {fontSize} fill={textColor}/>
       
    {/each}
    <XAxis scale={ scaleX } labelColor={textColor} labelFontSize={fontSize} baseLineColor={textColor}/>
  </Graphic>
  </div>

</div>

<style>
  h1 {
    color: #53aeb6;
    text-align: center;
    padding-top: 20 px;
  }

#beeswarm {
  margin: 0 auto;
}

</style>