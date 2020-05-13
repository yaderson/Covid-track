<template>
    <div class="wrapper">
        <div class="total-world-grid">
            <div class="total-world-percentage">
                <Doughnut v-if="isLoaded" :chartdata="chartdata" :options="options" height="200px"></Doughnut>
            </div>
            <div class="total-world-stats">
                <div class="affected wrap">
                    <div class="prew">
                        <div class="pre-text">
                            <div class="pre-cases-tittle">
                                <p>Affected</p>
                                <svg fill="#F7B56B" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px">    <path d="M19,15l-7-9l-7,9H19z"/></svg>
                            </div>
                            <small style="display: block; margin-top: 10px;">
                            <strong>{{ afected }}</strong>
                        </small>
                        </div>
                    </div>
                </div>
                <div class="active-cases wrap">
                    <div class="prew">
                        <div class="pre-text">
                            <div class="pre-cases-tittle">
                                <p>Active Cases</p>
                                <svg fill="#82d8ca" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px">    <path d="M19,15l-7-9l-7,9H19z"/></svg>
                            </div>
                            <small style="display: block; margin-top: 10px;">
                                <strong>{{ activeCases }}</strong>
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Doughnut from '@/components/charts/doughnut.vue'
import axios from 'axios'



export default {
    name: 'TotalWorld',
    components: {
        Doughnut
    },
    data: () => ({
        isLoaded: false,
        chartdata: null,
        afected: '...',
        activeCases: '...',
        options: {
            cutoutPercentage: 75,
            responsive: true,
            maintainAspectRatio: false
        }
    }),
    async mounted () {
        const data = await axios.get('https://api.covid19api.com/summary')
        this.afected = data.data.Global.TotalConfirmed
        this.activeCases = 2355803

        const dataCtx = {
            datasets: [{
                data: [this.activeCases,this.afected-this.activeCases],
                backgroundColor: ['rgb(130, 216, 202)', 'rgba(228, 247, 244)'],
                borderRadius: 10,
                
            }],
            borderWidth: [
                0, 0
            ]
            // These labels appear in the legend and in the tooltips when hovering different arcs
        }
        this.chartdata = dataCtx
        this.isLoaded = true
    }
}
</script>

<style scoped>
p {
    margin: 0;
}
.total-world-grid {
    width: 100%;
    height: 200px;
    display: grid;
    grid-template-columns: 50% 50%;
}
.total-world-stats {
    display: grid;
    grid-template-rows: 50% 50%;
}
.wrap {
    padding: 15px 0px 0px 10px;
}
.affected .prew {
    background: linear-gradient(to right, transparent, var(--orange));
    color: var(--orange-text);
    width: 100%;
    height: 100%;
}
.prew {
    border-radius: 5px;
}
.pre-text {
    margin-top: 15px; 
    display: inline-block;
}
.pre-cases-tittle {
    display: flex;
    justify-content: center;
}
.active-cases .prew {
    background: linear-gradient(to right, transparent, var(--green));
    color: var(--green-text);
    width: 100%;
    height: 100%;
}
</style>