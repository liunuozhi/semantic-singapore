<script>
  import Beeswarm from "./component/Beeswarm.svelte";
  import Textdemo from "./component/Textdemo.svelte";
  import SGMap from "./component/SGMap.svelte";
  import { data } from "./data_sample.js";

  const dataBoundOffset = 5;
  let pageId = 1455972;
  let tokens;
  let dataLowerBound;
  let dataUpperBound;
  let currentLoc
  const currentPageidHanlder = e => {
    pageId = e.detail.pageid;
  };

  currentLoc = data.filter(el => el.pageid === pageId)[0];
  tokens = currentLoc.count.sort((a, b) => a.count - b.count);
  dataLowerBound = tokens[0].count - dataBoundOffset;
  dataUpperBound = tokens[tokens.length - 1].count + dataBoundOffset;
  $: {
    currentLoc = data.filter(el => el.pageid === pageId)[0];
    tokens = currentLoc.count.sort((a, b) => a.count - b.count);
    dataLowerBound = tokens[0].count - dataBoundOffset;
    dataUpperBound = tokens[tokens.length - 1].count + dataBoundOffset;
  }
</script>

<div>
    <p class="">
    The map shows the location which has wiki page.<br>
    Click the point, it will give you the name of location. <br>
    Once you click show more, it should give you the word tokens. Hover the bubble, see the word on the article. <br>
    Currently, the bubble cannot automatically update. Also, the token only works for Hwa Chong School.
  </p>
  <SGMap locs={data} on:currentPageid={currentPageidHanlder} />
  <Beeswarm
    pageTitle={currentLoc.title}
    data={tokens}
    {dataLowerBound}
    {dataUpperBound}
    text={currentLoc.text} />

</div>
