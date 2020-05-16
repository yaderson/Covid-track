<template>
    <section class="active-cases">
        <div class="wrapper">
            <nav>
                <div class="active-title">
                    <h3 style="display:inline">Active Cases</h3>   
                    <svg v-if="isIncrease" fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="15px" height="24px"><path d="M 4.40625 1.9921875 L 2.9921875 3.40625 L 8.4003906 8.8144531 L 9.9003906 7.3144531 L 13.578125 10.992188 L 15.177734 9.4921875 L 18.275391 12.589844 L 16.699219 14.199219 L 22 14.900391 L 21.199219 9.5996094 L 19.673828 11.160156 L 15.222656 6.7089844 L 13.623047 8.2089844 L 9.9003906 4.4863281 L 8.4003906 5.9863281 L 4.40625 1.9921875 z M 3 8 L 3 21 L 5 21 L 5 8 L 3 8 z M 7 11 L 7 21 L 9 21 L 9 11 L 7 11 z M 11 13 L 11 21 L 13 21 L 13 13 L 11 13 z M 15 16 L 15 21 L 17 21 L 17 16 L 15 16 z M 19 18 L 19 21 L 21 21 L 21 18 L 19 18 z"/></svg>
                    <svg v-else fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="15px" height="24px">    <path d="M 22 2 L 16.699219 2.8007812 L 18.242188 4.34375 L 15.177734 7.4082031 L 13.568359 5.9003906 L 9.4921875 10.078125 L 8.0078125 8.59375 L 3.3027344 13.203125 L 4.703125 14.630859 L 7.9921875 11.40625 L 9.5078125 12.921875 L 13.630859 8.6992188 L 15.222656 10.191406 L 19.65625 5.7578125 L 21.199219 7.3007812 L 22 2 z M 19 10 L 19 21 L 21 21 L 21 10 L 19 10 z M 15 12 L 15 21 L 17 21 L 17 12 L 15 12 z M 11 14 L 11 21 L 13 21 L 13 14 L 11 14 z M 7 16 L 7 21 L 9 21 L 9 16 L 7 16 z M 3 18 L 3 21 L 5 21 L 5 18 L 3 18 z"/></svg>
                </div>
                <div class="active-cases-opt">
                    <button class="cases-btn-select" v-bind:style="{borderColor: borderDaily}" v-on:click="changeMode('borderDaily')">Daily</button>
                    <button class="cases-btn-select" v-bind:style="{borderColor: borderWeekly}" v-on:click="changeMode('borderWeekly')">Weekly</button>
                    <button class="cases-btn-select" v-bind:style="{borderColor: borderMounthly}" v-on:click="changeMode('borderMounthly')">Mounthly</button>
                </div>
            </nav>
            <div class="active-cases-chart" style="margin-top: 10px; margin-bottom: 60px;">
                <reactiveChart :chartData="dchar" :options="options" height="400px" />
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
        isIncrease: true,
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
        setIncrease: function (ant,las) {
            if(las < ant) {
                this.isIncrease = false
            }
        },
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
            this.setIncrease(activeCases[activeCases.length-1].y, activeCases[activeCases.length-2].y)
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
                if(cont <1 ){
                    
                    let day = new Date(report.Date).toLocaleDateString('en-US', {  day : 'numeric',timeZone: 'UTC'})
                    
                    labels.push(String(day))
                    activeCases.push({y: report.Active, x: Number(new Date(report.Date).toLocaleDateString('en-US', {  day : 'numeric',timeZone: 'UTC'}))})
                    cont+=1
                }else {
                    if(contPass < 5) {
                        
                        contPass+=1
                    }else {
                        cont = 0
                        contPass = 0
                    }
                }
            }
            this.setIncrease(activeCases[activeCases.length-1].y, activeCases[activeCases.length-2].y)
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
            this.setIncrease(activeCases[activeCases.length-1].y, activeCases[activeCases.length-2].y)
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
.active-title {
    margin: 18px 0 18px;
}

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