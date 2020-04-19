<script>
  import Beeswarm from "./component/Beeswarm.svelte"
  import Textdemo from "./component/Textdemo.svelte"
  import { data } from "./data_sample.js";

  const pageId = 1385261
  const currentLoc = data.filter(
    el => el.pageid === pageId
  )[0]
  const tokens = currentLoc.count.sort(
    (a, b) => (a.count - b.count)
  )
  
  const dataBoundOffset = 5
  const dataLowerBound = tokens[0].count - dataBoundOffset
  const dataUpperBound = tokens[tokens.length -1].count + dataBoundOffset
  console.log(dataUpperBound);
  
  
</script>

<div>
  <Beeswarm pageTitle={currentLoc.title} data={tokens} {dataLowerBound} {dataUpperBound} text={currentLoc.text}/>
</div>