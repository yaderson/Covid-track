<template>
<div class="wrapper">
    <nav class="nav-tops">
        <button class="nav-btn active mark">Cases</button>
        <button class="nav-btn dead">Dead</button>
        <button class="nav-btn recov">Recovered</button>
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
        <div class="g-scrolling-carousel">
            <div class="top-county-cards items">
                <Carousel>
                    <Slide v-for="(country, index) in topContries" v-bind:key="index">
                        <Card v-if="isPar(index)" :ConName="country[0]" :totalCaes="country[1]" maiColor="#fee3ce" lineColor="#6F3A18" />
                        <Card v-else :ConName="country[0]" :totalCaes="country[1]" maiColor="#fbd4e6" lineColor="#934666" />
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
        topContries: [],
        d: null
    }),
    methods: {
        isPar: function(n) {
            if(n%2 == 0){
                return true
            }else {
                return false
            }
        }
    },
    async mounted () {
        const response = await getSummary()
        let SortCounfirmed = []
        
        response.forEach(async element => {
            
            SortCounfirmed.push([element.countryName,element.countyTotalConfirmed])
        });
        const sortedContries = SortCounfirmed.sort(function(a, b) {
            return b[1] - a[1]
        })
        
        let topCon = []
        topCon.push(sortedContries[0], sortedContries[1], sortedContries[2], sortedContries[3], sortedContries[4])
        
        this.topContries = topCon
        
    }
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