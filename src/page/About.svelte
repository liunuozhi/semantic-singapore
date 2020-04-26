<script>
  import { db } from "./component/firebase.js";
  
  let data = null;
  db.ref().orderByChild("hex_id").equalTo(5).once("value", snap => console.log(snap.val()))
  
</script>

<h1>About</h1>
{#if data !== null}
   <p>{data.text}</p>
{/if}
