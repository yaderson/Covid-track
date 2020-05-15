<template>
  <div class="card" v-bind:style="{background: maiColor}">
      <a :href="'./Current-report?country='+ConName"  style="text-decoration: none; color: black;">
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
            <line-chart  v-if="loaded" :chartData="chartdata" :options="options" height="300px" />
            
          </div>
      </a>
      
  </div>
  
</template>

<script>
import LineChart from '@/components/charts/reactiveChart.vue'
import { getCountryDataChart } from '@/services/api.service.js'



export default {
  name: 'Card',
  props: {
    kind: null,
    ConName: null,
    totalCaes: null,
    maiColor: null,
    lineColor: null
  },

  components: { LineChart },

  data: () => ({
    data: null,
    selected: null,
    falgName: null,
    loaded: false,
    chartdata: {},
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
              display: false
            },
            ticks: {
              display: false
            }
          }]
      },
      showLines: true
    }
  }),
  created () {
  },
  
  watch: {
    kind: function () {
      this.imgFlg()
      this.changeD()
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
    this.data = await getCountryDataChart(this.selected,'confirmed')
    this.setData()
    this.chartdata.datasets[0].borderColor = this.lineColor
    this.loaded = true
    
  },
  methods: {
    imgFlg: function () {
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
    },
    changeD: async function() {
      this.data = await getCountryDataChart(this.ConName, this.kind)
      this.setData()
      this.chartdata.datasets[0].borderColor = this.lineColor
    },
    setData: function () {
      let labels = []
      let confirmed = []
      let cont  = 0
      let contPass = 0
      
      for (let report of this.data) {
          if(cont <1 ){  
            let day = new Date(report.Date).toLocaleDateString('en-US', {  day : 'numeric',timeZone: 'UTC'})
            labels.push(String(day))
            confirmed.push({y: report.Cases, x: Number(new Date(report.Date).toLocaleDateString('en-US', {  day : 'numeric',timeZone: 'UTC'}))})
            cont+=1
          }else{
            if(contPass < 5) {  
              contPass+=1
            }else {
              cont = 0
              contPass = 0
            }
          }
      }
      
      const dataGPC3 = {
          labels: labels,
          datasets: [{
              label: 'Active Cases',
              borderColor: '#B4D9D3',
              pointBackgroundColor: 'rgba(0, 0, 0, 0.0)',
              pointBorderColor: 'rgba(0, 0, 0, 0.0)',
              backgroundColor: '#B4D9D3',
              fill: false,
              data: confirmed
          }],
      }
      this.chartdata = dataGPC3
      this.isLoad = true
    }
  }
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
