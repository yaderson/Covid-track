<template>
    <div>
        <nav class="top">
            <div class="wrapper">
                <div class="top-contain">
                    <div class="top-tittle">
                        <h3>Current Outbreak</h3>
                        
                        <select id="Countries" name="Countries" v-model="countySelected" v-on:change="initializer">
                            <option v-for="Country in Countries" :slug="Country.Slug" :value="Country.Slug"  :key="Country.value">{{ Country.Country }}</option>
                        </select>
                        <label for="Countries" style="color:transparent">|</label>
                        <h4>{{ now }}</h4>
                    </div>
                    <div class="top-notify">
                        <svg v-on:click="subscribe" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24pt" height="24pt" viewBox="0 0 24 24" version="1.1">
                        <g id="surface1488345">
                        <path v-if="!isSubscribe" style=" stroke:none;fill-rule:nonzero;fill:rgb(80%,80%,80%);fill-opacity:1;" d="M 12 2 C 11.171875 2 10.5 2.671875 10.5 3.5 L 10.5 4.195312 C 7.914062 4.863281 6 7.203125 6 10 L 6 16 L 4.464844 17.15625 C 4.175781 17.339844 4 17.65625 4 18 C 4 18.550781 4.449219 19 5 19 L 19 19 C 19.550781 19 20 18.550781 20 18 C 20 17.65625 19.824219 17.339844 19.539062 17.15625 L 18 16 L 18 10 C 18 7.203125 16.085938 4.863281 13.5 4.195312 L 13.5 3.5 C 13.5 2.671875 12.828125 2 12 2 Z M 10 20 C 10 21.101562 10.898438 22 12 22 C 13.101562 22 14 21.101562 14 20 Z M 10 20 "/>
                        <path v-if="isSubscribe" style=" stroke:none;fill-rule:nonzero;fill:#82d8ca;fill-opacity:1;" d="M 12 2 C 11.171875 2 10.5 2.671875 10.5 3.5 L 10.5 4.195312 C 7.914062 4.863281 6 7.203125 6 10 L 6 16 L 4.464844 17.15625 C 4.175781 17.339844 4 17.65625 4 18 C 4 18.550781 4.449219 19 5 19 L 19 19 C 19.550781 19 20 18.550781 20 18 C 20 17.65625 19.824219 17.339844 19.539062 17.15625 L 18 16 L 18 10 C 18 7.203125 16.085938 4.863281 13.5 4.195312 L 13.5 3.5 C 13.5 2.671875 12.828125 2 12 2 Z M 10 20 C 10 21.101562 10.898438 22 12 22 C 13.101562 22 14 21.101562 14 20 Z M 10 20 "/>
                        </g>
                        </svg>
                    </div>
                </div>
            </div>
        </nav>
        <section v-if="isLoaded" class="components">
            <qaBlog />
            <section class="latest-update">
                <div class="wrapper">
                    <div class="latest-update-tittle">
                        <h3>Covid-19 Latest Update</h3>
                    </div>
                    <div class="lastes-update-info">
                        <h4 style="display: inline-block;">Last Upate #{{upNumber}} {{setDate(lastUpdate.Date)}} </h4> 
                        <div style="display: flex; float: right; margin-top: 15px;">
                            <a :href="'/updates/'+'details?Country='+countySelected">Details</a>
                        </div>
                    </div>
                </div>
            </section>
            <currentReport2 :lastData="lastUpdate" />
            <graphic :data="graphicData"/>
        </section>
        <section v-else>
            <div class="wrapper">
                <h4>LOADING...</h4>
            </div>
        </section>
    </div>
</template>

<script>

import Countries from '@/assets/countries.json'
import currentReport2 from '@/components/details/current-report.vue'
import qaBlog from '@/components/details/qaBlog.vue'
import graphic from '@/components/details/graphic.vue'
import { getMyCounty, getAllStatus } from '@/services/api.service.js'

export default {
    name: 'CurrentReport',
    components: {
        currentReport2,
        qaBlog,
        graphic
    },
    computed: {
        da: ()=> {
            return this.graphicData
        },
        now: ()=> {
            return new Date().toLocaleDateString('en-US', {  
            weekday : 'short',
            day : 'numeric',
            month : 'short'
        })
        }
    },
    data: () => ({
        chartload: false,
        isLoaded: false,
        Countries,
        countySelected: null,
        isSubscribe: false,
        lastUpdate: null,
        upNumber: null,
        graphicData: null,
        options: null,
        dchar: null
    }),
    
    async mounted () {
        navigator.serviceWorker.getRegistration().then((registration) => {
            registration.pushManager.getSubscription().then(this.verifySubscription)
        })
        //*********** ASINGNAR IP COUNTRY */
        let ip
        ip = this.$route.query.country
        
        if(!ip){
            const r = await getMyCounty()
            
            Countries.filter(con => {
                if (con.ISO2 == r){
                    ip = con.Slug
                }
            })
        }
        this.countySelected = ip

        //******************************** */
        this.chartload = true
        this.initializer()
    },
    methods: {
        initializer: async function() {
            this.isLoaded = false
            const result = await getAllStatus(this.countySelected)
            const length = result.length
            this.upNumber = length-1
            this.lastUpdate = result[length-1]
            this.graphicData = result
            
            this.isLoaded = true
            this.chartload = true
        },
        getPublicKey: function () {
            return fetch('https://push-notifications-yader.herokuapp.com/Key')
                .then(res => res.arrayBuffer())
                .then(key => new Uint8Array(key) )
        },
        verifySubscription: function(status)  {
            if(status) {
                this.isSubscribe = true
            }
        },
        subscribe: function() {
            if(!this.isSubscribe) {
                this.isSubscribe = true
                
                //new Notification('HOLA')
                
                if ('PushManager' in window) {
                    Notification.requestPermission()
                    navigator.serviceWorker.getRegistration().then(registration => {
                        registration.pushManager.getSubscription().then((sub) => {
                            if(!sub) {
                                this.getPublicKey().then((key) => {
                                    registration.pushManager.subscribe({
                                        userVisibleOnly: true,
                                        applicationServerKey: key
                                    })
                                    .then(res => res.toJSON())
                                    .then((subscription) => {
                                        const mySub  = {
                                            sub: subscription,
                                            condition: this.countySelected
                                        }
                                        fetch('https://push-notifications-yader.herokuapp.com/Subscribe',{method: 'POST', headers:{'Content-Type': 'application/json'} ,body: JSON.stringify(mySub)})
                                        .then( this.verifySubscription )
                                    })
                                })
                            }
                        })
                    })
                }else {
                    window.alert('Cannot Activete Notifications in this Browsers :(')
                    return
                }
                
            }else {
                this.isSubscribe = false
            }
        },
        setDate: function(date) {
            return new Date(date).toLocaleDateString('en-US', {  
                day : 'numeric',
                month : 'short',
                hour: 'numeric',
                minute: 'numeric',
                timeZone: 'UTC', 
                timeZoneName: 'short' 
            })
        }
    }
}
</script>
<style scoped>

.top-tittle h3 {
    font-weight: 100;
    margin: 0;
}
.top-tittle h4 {
    font-weight: 100;
    color: var(--text-gray);
    margin: 15px 0 0 0;
}
.top-tittle select {
    background: transparent;
    border: none;
    font-size: 20px;
    margin-top: 15px;
    text-decoration: none;
    outline: 0;
    width:110px;
}
.top-tittle option{
    width:110px;
}
.top-contain {
    display: grid;
    justify-content: center;
    grid-template-columns: 80% auto;
}
.lastes-update-info h4 {
    font-weight: 100;
    color: var(--text-gray);
    margin: 15px 0 0 0;
}
.lastes-update-info a {
    font-size: 12px;
}
.lastes-update-info h4 {
    font-size: 82%;
}
a {
    color:black;
}

</style>
