<template>
    <section class="active-cases">
        <div class="wrapper">
            <nav>
                <div class="active-tittle">
                    <h3>Active Cases</h3>   
                </div>
                <div class="active-cases-opt">
                    <button class="cases-btn-select" v-bind:style="{borderColor: borderDaily}" v-on:click="changeMode('borderDaily')">Daily</button>
                    <button class="cases-btn-select" v-bind:style="{borderColor: borderWeekly}" v-on:click="changeMode('borderWeekly')">Weekly</button>
                    <button class="cases-btn-select" v-bind:style="{borderColor: borderMounthly}" v-on:click="changeMode('borderMounthly')">Mounthly</button>
                </div>
            </nav>
            <div class="active-cases-chart" style="margin-top: 10px; margin-bottom: 60px;">
                <reactiveChart :chartData="dchar" :options="options" height="400px"/>
                <!-- <h4 v-else>Load Chart Data...</h4> -->
            </div>
        </div>
    </section>    
</template>
<script>
import reactiveChart from '@/components/charts/reactiveChart.vue'




export default {
    name:'graphic',
    components: { 
        reactiveChart
    },
    props: {
        data: null
    },
    data: ()=> ({
        dchar: {},
        isLoad: false,
        mode: 'Daily',
        borderDaily: '#b4d9d3 !important',
        borderWeekly: 'transparent',
        borderMounthly: 'transparent',
        options: {
            title: {
            display: false
            },
            legend: {
                display: false
            },
            scales: {
                xAxes: [{
                    gridLines: {
                        display:false
                    }
                }],
                yAxes: [{
                    gridLines: {
                        display:false
                    }
                    
                }]
            }
        }
    }),
    created () {
        console.log('...created')
    },
    async mounted () {
        if(this.mode) {
            switch (this.mode) {
                case 'Daily':
                    this.Daily()
                    break
                case 'Weekly':
                    this.Weekly()
                    break
                case 'Mounthly':
                    this.Mounthly()
                    break
            }
        }else {
            this.Daily()
            
        }
        
        this.isLoad = true
    },
    methods: {
        changeMode: function(mode) {
            this.borderDaily = 'transparent'
            this.borderWeekly = 'transparent'
            this.borderMounthly = 'transparent'
            switch (mode){
                case 'borderDaily':
                    this.borderDaily = '#b4d9d3 !important'
                    this.Daily()
                    break
                case 'borderWeekly':
                    this.borderWeekly = '#b4d9d3 !important'
                    this.Weekly()
                    break
                case 'borderMounthly':
                    this.Mounthly()
                    this.borderMounthly = '#b4d9d3 !important'
                    break
            }
        },
        Daily: function () {
            let labels = []
            let activeCases = []
            for (let report of this.data) {
                let day = new Date(report.Date).toLocaleDateString('en-US', {  day : 'numeric',timeZone: 'UTC'})
                let mon = new Date(report.Date).toLocaleDateString('en-US', {  month : 'numeric',timeZone: 'UTC'})
                labels.push(String(day)+'/'+String(mon))
                activeCases.push({y: report.Active, x: Number(new Date(report.Date).toLocaleDateString('en-US', {  day : 'numeric',timeZone: 'UTC'}))})
                
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
                    data: activeCases
                }],
            }
            this.dchar = dataGPC3
        },
        Weekly: function () {
            let labels = []
            let activeCases = []
            let cont  = 0
            let contPass = 0
            for (let report of this.data) {
                if(cont <=6 ){
                    
                    let day = new Date(report.Date).toLocaleDateString('en-US', {  day : 'numeric',timeZone: 'UTC'})
                    
                    labels.push(String(day))
                    activeCases.push({y: report.Active, x: Number(new Date(report.Date).toLocaleDateString('en-US', {  day : 'numeric',timeZone: 'UTC'}))})
                    cont+=1
                }else {
                    if(contPass <= 6) {
                        
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
                    data: activeCases
                }],
            }
            this.dchar = dataGPC3
            this.isLoad = true
        },
        Mounthly: function () {
            let labels = []
            let activeCases = []
            let last = null
            for (let report of this.data) {
                let mon = new Date(report.Date).toLocaleDateString('en-US', {  month : 'short',timeZone: 'UTC'})
                if(mon != last){
                    labels.push(mon)
                    activeCases.push({y: report.Active, x: Number(new Date(report.Date).toLocaleDateString('en-US', {  month : 'numeric',timeZone: 'UTC'}))})
                    last = mon
                }
            }
            let length = this.data.length
            let lengthAct = activeCases.length
            activeCases[lengthAct-1] = {y: this.data[length-1].Active, x: Number(new Date(this.data[length-1].Date).toLocaleDateString('en-US', {  month : 'numeric',timeZone: 'UTC'}))}
            
            const dataGPC3 = {
                labels: labels,
                datasets: [{
                    label: 'Active Cases',
                    borderColor: '#B4D9D3',
                    pointBackgroundColor: 'rgba(0, 0, 0, 0.0)',
                    pointBorderColor: 'rgba(0, 0, 0, 0.0)',
                    backgroundColor: '#B4D9D3',
                    fill: false,
                    data: activeCases
                }],
            }
            this.dchar = dataGPC3
        }
    }
}
</script>
<style scoped>

.active-cases-opt {
    margin-top: 10px;
}
.active-cases-opt {
    margin-bottom: 60px;
}
hr{
    border-color: #cccccc;

}
.active-cases-opt button {
    height: 30px;
    background: transparent;
    border: none;
    outline: none;
    color: var(--text-gray);
    font-size: 15px;
    
}
.cases-btn-select {
    border-bottom: 2px solid transparent !important;
}
</style>