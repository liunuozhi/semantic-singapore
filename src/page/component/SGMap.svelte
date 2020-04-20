<script>
  "use strict";
  import { singaporeShape } from "../singaporeShape.js";
  import DataContainer from "@snlab/florence-datacontainer";
  import {
    Graphic,
    PolygonLayer,
    createGeoScales,
    PointLayer
  } from "@snlab/florence";
  import { schemeAccent } from "d3-scale-chromatic";
  import { createEventDispatcher } from "svelte";

  export let locs = "";
  const lats = locs.map(el => el.lat);
  const lons = locs.map(el => el.lon);
  const pageids = locs.map(el => el.pageid);
  const titles = locs.map(el => el.title);
  const myData = new DataContainer({
    lat: lats,
    lon: lons,
    pageid: pageids,
    title: titles
  });
  console.log(myData);

  // setup geojson
  const map = new DataContainer(singaporeShape);
  const geoScale = createGeoScales(map.domain("$geometry"));
  // set up canvas
  const width = 1000;
  const height = 600;

  // emit current page id to parent

  let currentObjIndex = null;
  let currentPageid = null;
  let currentPageTitle = null;
  const onClickHandler = e => {
    currentObjIndex = e.key;
  };
  $: currentPageTitle = myData.column("title")[currentObjIndex];
  $: currentPageid = myData.column("pageid")[currentObjIndex];

  const dispatch = createEventDispatcher();
  const sendParent = () => {
    dispatch("currentPageid", { pageid: currentPageid });
  };
</script>

<div id="map">
  <Graphic {width} {height} {...geoScale} flipY padding={20}>
    <PolygonLayer
      geometry={map.column('$geometry')}
      stroke={'white'}
      strokeWidth={1}
      fill="#b2ded3" />

    <PointLayer
      x={myData.column('lon')}
      y={myData.column('lat')}
      radius={5}
      onClick={onClickHandler} />

  </Graphic>
  <p>{currentPageTitle}</p>
  <button on:click={sendParent}>show more</button>
</div>

<style>
  #map {
    display: block;
    margin: 0 auto;
  }
</style>
