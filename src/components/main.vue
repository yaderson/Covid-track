
<template>
  <div class="card" v-bind:style="{background: maiColor}">
      <a href="./current-report.html?county=italy"  style="text-decoration: none; color: black;">
          <div class="card-top">
              <div class="card-top1-county">
                  <div class="cardt-cont">
                    <img v-bind:src="falgName" width="20"/>
                    <small>{{ ConName }}</small>
                  </div>
              </div>
              <div class="card-top-county">
                  <h6>{{ totalCaes }}</h6>
                  <svg fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="14px"><path d="M 6 3 L 6 5 L 17.59375 5 L 3.75 18.84375 L 5.15625 20.25 L 19 6.40625 L 19 18 L 21 18 L 21 3 Z"/></svg>
              </div>
          </div>
          <div class="card-body">
            <line-chart  v-if="loaded" :chartdata="chartdata" :options="options" height="300px" />
          </div>
      </a>
      
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

function setData(result,a){
  
  //console.log(result)
  
  let mounths = ['January', 'February', 'March', 'April', 'May','June', 'July', 'August', 'September', 'October', 'November', 'December'];
  let m = [];
  let points = [];
  //console.log(mounths[0])
      
      
  var mos = null;

  var cont = Number(result[0 ].Date.split('-')[1])-1
  //console.log('c: ',cont);
  
  for(var i=0; i < result.length; i++){
    
    if(Number(result[i].Date.split('-')[1])-1 != cont){

      
      mos = i-1;
      let mons = Number(result[mos].Date.split('-')[1])-1


      //console.log(Number(result[mos].Date.split('-')[1])-1,' - ',result[mos].Cases);

      points.push({x: Number(result[mos].Date.split('-')[1])-1, y:result[mos].Cases})
      //console.log('mounths',mons)
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
        borderColor: null,
        pointBackgroundColor: 'rgba(0, 0, 0, 0.0)',
        pointBorderColor: 'rgba(0, 0, 0, 0.0)',
        
        fill: false,
        data: points
      }
    ]
  }


  a.chartdata = mydata;
    
}


export default {
  name: 'HelloWorld',
  props: {
    ConName: null,
    totalCaes: null,
    maiColor: null,
    lineColor: null
  },
  components: { LineChart },
  computed: {
    
  },
  data: () => ({
    
    selected: null,
    falgName: null,
    loaded: false,
    chartdata: null,
    options: {
        title: {
          display: false,
          text: 'World population per region (in millions)'
        },
        legend: {
            display: false
        },
        scales: {
            xAxes: [{
                gridLines: {
                    display:false
                },
                ticks: {
                    display: false
                }
            }],
            yAxes: [{
                gridLines: {
                    display:false
                },
                ticks: {
                    display: false
                }
            }]
        },
        showLines: true
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
        //console.log(data[0])
        setData(data,this);
        
      });
    }
  },
  async mounted (){
    
    if(this.ConName == 'united-states'){
      this.falgName = `https://img.icons8.com/color/48/000000/usa.png`
    }else {
      if(this.ConName == 'russia'){
        this.falgName = 'https://img.icons8.com/color/48/000000/russian-federation.png'
      }else {
        if(this.ConName == 'united-kingdom'){
          this.falgName = 'https://img.icons8.com/color/48/000000/great-britain.png'
        }else{
          this.falgName = `https://img.icons8.com/color/48/000000/${this.ConName}.png`
        }
        
      }
    }
    
    this.selected = this.ConName

    getData('total',this.selected,'confirmed',this,(data)=>{
      setData(data,this)
      this.chartdata.datasets[0].borderColor = this.lineColor
      this.loaded = true
    });
    
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/** Card **/
.cardt-cont {
  display: flex;
  justify-content: center;
}
.cardt-cont small {
  margin-left: 5px;
  text-transform: uppercase;
}
.card {
  height: 180px;
  width: 150px;
  border-radius: 20px;
  text-align: center;
}
.card-top-county h6 {
  margin: 0;
}
.card-top1-county {
  display: inline-block;
  margin-top: 15px;
}
.card-top-county {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
.card-top-county img {
  margin-right: 4px;
}
.card-top h6 {
  margin: 1;
}
</style>
