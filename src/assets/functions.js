import request from 'request'



module.exports = {
	 function getData(Path, country, param){
	
		request(`https://api.covid19api.com/${Path}/country/${country}/status/${param}`,(err, data)=>{
	      let result = JSON.parse(data.body);
	      console.log(result)
	    });

	}
};