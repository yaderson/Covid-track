<template>
<div class="wrapper">
    <nav class="nav-tops">
        <!-- Change for class mark -->
        <button class="nav-btn active mark" v-on:click="chageTocases()" v-bind:style="{background: casesColor}">Cases</button>
        <button class="nav-btn dead" v-on:click="change()" v-bind:style="{background: deathsColor}">Deaths</button>
        <!-- <button class="nav-btn dead">Deaths</button> -->
        <button class="nav-btn recov" v-on:click="Recovered()" v-bind:style="{backgroundColor: recoveredColor}">Recovered</button>
    </nav>
    <div class="top-county">
        <div class="top-county-title">
            <div>
                <h4>Top Country</h4>
            </div>
            <div> 
                <a href="./allCountys.html"><small>View All</small></a> 
            </div>
        </div>
        <div class="g-scrolling-carousel" v-if="loaded">
            <div class="top-county-cards items">
                <Carousel>
                    <Slide v-for="(country, index) in topContries" v-bind:key="index">
                        <Card v-if="isPar(index)" :ConName="country[0]" :totalCaes="country[1]" :kind="kind" maiColor="#fee3ce" lineColor="#6F3A18" />
                        <Card v-else :ConName="country[0]" :totalCaes="country[1]" :kind="kind" maiColor="#fbd4e6" lineColor="#934666" />
                    </Slide>
                </Carousel>
            </div>
        </div>
    </div>
</div>    
</template>
<script>
import { Carousel, Slide } from 'vue-carousel';
import Card from '@/components/shared/card.vue';
import { getSummary } from '@/services/api.service.js'




export default {
    name: 'TopCountrys',
    components: {
        Carousel,
        Slide,
        Card
    },
    data: () => ({
        kind: 'confirmed',
        topContries: [],
        d: null,
        loaded: false,
        response: [],
        casesColor: 'var(--red-btn)',
        deathsColor: 'transparent',
        recoveredColor: 'transparent'
    }),
    //TODO: Change for sort object
    async mounted () {
        this.response = await getSummary()
        this.chageTocases()
        this.loaded = true
    },
    methods: {
        isPar: function(n) {
            if(n%2 == 0){
                return true
            }else {
                return false
            }
        },
        chageTocases: function () {
            this.casesColor = 'var(--red-btn)'
            this.deathsColor = 'transparent'
            this.recoveredColor = 'transparent'

            let SortCounfirmed = []
        
            this.response.forEach(element => {
                
                SortCounfirmed.push([element.countryName,element.countyTotalConfirmed])
            });
            const sortedContries = SortCounfirmed.sort(function(a, b) {
                return b[1] - a[1]
            })
            
            let topCon = []
            this.kind = 'confirmed'
            topCon.push(sortedContries[0], sortedContries[1], sortedContries[2], sortedContries[3], sortedContries[4])
            
            this.topContries = topCon
        },
        change: function () {
            this.casesColor = 'transparent'
            this.deathsColor = 'var(--red-btn)'
            this.recoveredColor = 'transparent'
            let deaths = []
            this.response.forEach(element => {
                deaths.push([element.countryName, element.countyTotalDeaths])
            })
            
            const sortedDeaths = deaths.sort(function (a, b){
                return b[1] - a[1]
            })
            this.loaded = false
            const newData = []
            this.kind = 'deaths'
            newData.push(sortedDeaths[0], sortedDeaths[1], sortedDeaths[2], sortedDeaths[3], sortedDeaths[4])
            this.topContries = newData
            this.loaded = true
        },
        Recovered: function () {
            this.casesColor = 'transparent'
            this.deathsColor = 'transparent'
            this.recoveredColor = 'var(--red-btn)'
            let deaths = []
            this.response.forEach(element => {
                deaths.push([element.countryName, element.countyTotalRecovered])
            })
            
            const sortedDeaths = deaths.sort(function (a, b){
                return b[1] - a[1]
            })
            this.loaded = false
            const newData = []
            this.kind = 'recovered'
            newData.push(sortedDeaths[0], sortedDeaths[1], sortedDeaths[2], sortedDeaths[3], sortedDeaths[4])
            this.topContries = newData
            this.loaded = true
        }
    },
}
</script>

<style scoped>
.nav-tops {
    display: flex;
    flex-direction: row;
}
.nav-btn {
    outline: 0;
    width: 40%;
    height: 30px;
    border: none;
    background-color: transparent;
    border-radius: 50px;
}
.mark {
    background-color: var(--red-btn);
    color: var(--red-btn-text);
}
.top-county-title {
    display: grid;
    grid-template-columns: 50% 50%;
    align-items: center;
}
.top-county-title a {
    display: block;
    float: right;
    color: black;
}

</style>