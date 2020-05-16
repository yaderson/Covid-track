<template>
  <div class="hello" >
    <center style="display: flex; justify-content: center; align-items: flex-end; margin-bottom: 10px;">
      <div class="card-container">
        <div class="card">
          <div class="card-title">
            <select v-model="selected" v-on:change="cadta">
                <option v-for="opt in opts" :value="opt.val" :key="opt.val">{{opt.name}}</option>
            </select>
          </div>
          
          <div class="chart">
            <line-chart  v-if="loaded" :chartdata="chartdata" :options="options"/>
          </div>
          <div v-if="!loaded" class="load" style="background-color: black">
            <div class="animated-background">
              <div class="background-masker btn-divide-left"></div>
            </div>
          </div>
          <div class="card-body" v-if="loaded">
            <div>
              <button v-on:click="cadta" style="float: right; height: 25px; width: 25px; padding: 0; align-items: center; text-align: center; background-color: transparent; border-color: transparent;"><svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 512 512'><title>ionicons-v5-b</title><path d='M320,146s24.36-12-64-12A160,160,0,1,0,416,294' style='fill:none;stroke:#000;stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px'/><polyline points='256 58 336 138 256 218' style='fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/></svg></button>
              <h2>{{cases}} CASES</h2>
              
            </div>
            <div style="display: flex; margin-left: 10px; margin-right:10px;">
              <h4 style="width: 50%; text-align: left;">New Deaths: <strong v-if="loaded"> {{ NewDeaths }} </strong></h4>
              <h4 style="width: 50%; text-align: right;">Total Deaths: <strong v-if="loaded">{{ TotalDeaths }}</strong></h4>
            </div>
            <div style="display: flex; margin-left: 10px; margin-right:10px;">
              <h4 style="width: 50%; text-align: left;">New Recovered: <strong v-if="loaded">{{ NewRecovered }}</strong></h4>
              <h4 style="width: 50%; text-align: right;">Total Recovered: <strong v-if="loaded">{{ TotalRecovered }}</strong></h4>
            </div>
            <small>Last update: <strong v-if="loaded">{{lastUp}}</strong></small>
          </div>
        </div>
      </div>
    </center>
      <footer style="background-color: #fff; height: 100%; width: 100%;">
        <div style="padding: 10px; ">
          @yader
        </div>
      </footer>
  </div>
</template>

<script>
import LineChart from './Chart.vue'
import request from 'request'

function getData(Path, country, param,a, callback){
  a.cases = 'loading...'
  request(`https://api.covid19api.com/${Path}/country/${country}/status/${param}`,async (err, data)=>{
    if (err) { return callback(err) }
    return callback(JSON.parse(data.body));
  });
}
function setOth(a){

  request('https://api.covid19api.com/summary',(err, data) => {
    let body = JSON.parse(data.body);
    
    function getCountryD(nam){
      return body.Countries.filter(function(data){
        return data.Slug == nam;
      });
    }
    let result = getCountryD(a.selected)[0];
    a.NewDeaths = result.NewDeaths;
    a.TotalDeaths = result.TotalDeaths;
    a.NewRecovered = result.NewRecovered;
    a.TotalRecovered  = result.TotalRecovered;
    a.loaded = true;
  });
}
function setData(result,a){
  
  
  let mounths = ['January', 'February', 'March', 'April', 'May','June', 'July', 'August', 'September', 'October', 'November', 'December'];
  let m = [];
  let points = [];
  
  var mos = null;
  var cont = Number(result[0 ].Date.split('-')[1])-1    
  for(var i=0; i < result.length; i++){
    if(Number(result[i].Date.split('-')[1])-1 != cont){
      mos = i-1;
      let mons = Number(result[mos].Date.split('-')[1])-1
      
      points.push({x: Number(result[mos].Date.split('-')[1])-1, y:result[mos].Cases})
      
      m.push(mounths[mons])
      cont = Number(result[i].Date.split('-')[1])-1;
    }
  }
    
    mos = result.length-1;
    points.push({x: Number(result[mos].Date.split('-')[1])-1, y:result[mos].Cases})
    m.push(mounths[Number(result[mos].Date.split('-')[1])-1])
    a.cases = result[mos].Cases;
    let las = new Date(result[mos].Date);
    a.lastUp = las.toDateString()
    let mydata = {
    labels: m,
    datasets: [
      {
        label: 'Confirmed Cases',
        borderColor: '#f87979',
        backgroundColor: 'rgba(0, 0, 0, 0.0)',
        data: points
      }
    ]
  }

  a.chartdata = mydata;
}
const countries = require('@/assets/countries.json');

export default {
  name: 'HelloWorld',
  props: {
    msg: String,
    
  },
  components: { LineChart },
  computed: {
    opts(){
      return Object.keys(this.con).map(k => {
        let o = this.con[k]
        return {name: o.Country, val: o.Slug};
      })
    }
  },
  data: () => ({
    con: countries,
    cases: String,
    lastUp: String,
    NewDeaths: String,
    TotalDeaths: String,
    NewRecovered: String,
    TotalRecovered:  String,
    selected: null,
    loaded: false,
    chartdata: null,
    options: {
      responsive: false,
      maintainAspectRatio: false
    }
  }),
  methods: {
    cadta: function() {
      this.loaded = false;
      this.NewDeaths = 'loading...';
      this.TotalDeaths = 'loading...';
      this.NewRecovered = 'loading...';
      this.TotalRecovered = 'loading...';
      getData('total',this.selected,'confirmed',this, (data)=>{
        setData(data,this);
        setOth(this);
      });
    }
  },
  async mounted (){
    function getCountry(nam){
      return countries.filter(function(data){
        return data.Slug == nam;
      });
    }

    if(this.$route.query.Country && getCountry(this.$route.query.Country).length){
      this.selected = this.$route.query.Country;
    }else{
      this.selected = countries[186].Slug;

    }
    getData('total',this.selected,'confirmed',this,(data)=>{
      setData(data,this)
    });
    setOth(this);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card2{
  background-color: #fff;
  height: 100%;
  width: 100%;
  margin: 30px;
}
.card-container{
  align-items: center;
  margin: 30px;
}
.hello{
  width: 100%;
  height: 100%;
}
.chart{
  display: inline-block;
  align-items: center;
}
.card{
  background: #fff;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  box-shadow: 0 16px 48px #E2E8ED;
}
.card-title{
  height: 50px;
}
.card-title select{
  padding: 10px;
  width: 100%;
  height: 100%;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  border-color: transparent;
}
.card-body{
  margin-top: 10px;
  text-align: center;
  padding: 10px;  
}
@keyframes placeHolderShimmer {
  0% {
    background-position: -800px 0
  }
  100% {
    background-position: 800px 0
  }
}
.background-masker {
  background-color: #fff;
  
}
.animated-background {
  animation-duration: 2s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: placeHolderShimmer;
  animation-timing-function: linear;
  background-color: #f6f7f8;
  background: linear-gradient(to right, #eeeeee 8%, #d1d1d1 18%, #eeeeee 33%);
  background-size: 800px 104px;
  height: 400px;
  position: relative;
}
</style>
