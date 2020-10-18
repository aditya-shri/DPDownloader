const axios = require("axios");
const dev = process.env.NODE_ENV !== "production";
const site = dev ? require("../config").site : process.env.SITE;

function keepaliveog() {
  if (site) {
      var refresh = setInterval(async () => {
	      var fetcher = axios(`https://gdown.herokuapp.com/api/v1/torrent/list`);
	      var arr = fetcher.torrents;
              var choice = 0;
	      
	      var keys = Object.keys(fetcher);
	      
	      window.console.log("Array : ",arr);
	      window.console.log(fetcher[keys[1]].length);
	      
	      for (var i=0; i< fetcher[keys[1]].length;i++){
		 if(fetcher[key[1]][i].status == "Downloaded"){
			 choice += 1;
		 }
	      }
	      if(choice == fetcher[keys[1]].length || fetcher[keys[1]].length == 0){
			window.console.log("No download remaining");
			clearInterval(refresh); 
	      }
	      window.console.log("setInterval applied");
	      const data = await axios(`https://ping-pong-sn.herokuapp.com/pingback?link=${site}`);
	      console.log("keep alive triggred, status: ", data.status);
	    }, 1560000);
  } else {
    console.log("No torrent to download");
  }
}

module.exports = keepaliveog;
