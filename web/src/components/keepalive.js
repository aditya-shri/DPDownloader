const axios = require("axios");
const dev = process.env.NODE_ENV !== "production";
const site = "https://gdown.herokuapp.com/";

function keepalive() {
  if (site) {
      var refresh = setInterval(async () => {
	      var fetcher = axios(`https://gdown.herokuapp.com/api/v1/torrent/list`);
	      var arr = fetcher["torrents"];
              var choice = 0;
	      console.warn(arr);
	      for (var i=0; i< arr.length;i++){
		 if(arr[i].status == "Downloaded"){
			 choice += 1;
		 }
	      }
	      if(choice == arr.length && arr.length == 0){
			console.warn("No download remaining");
			clearInterval(refresh); 
	      }
	      console.warn("setInterval applied");
	      const data = await axios(`https://ping-pong-sn.herokuapp.com/pingback?link=${site}`);
	      console.log("keep alive triggred, status: ", data.status);
	    }, 1560000);
  } else {
    console.warn("No torrent to download");
  }
}

export default keepalive;
