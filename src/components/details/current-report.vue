<template>
    <section class="current-report">
        <div class="wrapper">
            <div class="card-report-container">
                <div class="card-report" style="background-color: #FCCEBF;">
                    <div class="card-report-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20pt" height="20pt" viewBox="0 0 30 30" version="1.1">
                            <g id="surface2039605">
                            <path style=" stroke:none;fill-rule:nonzero;fill:rgba(255, 255, 255, 0.5);fill-opacity:1;" d="M 15 30 C 6.714844 30 0 23.285156 0 15 C 0 6.714844 6.714844 0 15 0 C 23.285156 0 30 6.714844 30 15 C 30 23.285156 23.285156 30 15 30 Z M 15 30 "/>
                            <path style=" stroke:none;fill-rule:nonzero;fill:rgb(69.019608%,32.54902%,19.607843%);fill-opacity:1;" d="M 14.980469 6.941406 C 14.242188 6.953125 13.648438 7.5625 13.660156 8.300781 L 13.660156 13.660156 L 8.300781 13.660156 C 7.816406 13.652344 7.367188 13.90625 7.125 14.324219 C 6.878906 14.742188 6.878906 15.257812 7.125 15.675781 C 7.367188 16.09375 7.816406 16.347656 8.300781 16.339844 L 13.660156 16.339844 L 13.660156 21.699219 C 13.652344 22.183594 13.90625 22.632812 14.324219 22.875 C 14.742188 23.121094 15.257812 23.121094 15.675781 22.875 C 16.09375 22.632812 16.347656 22.183594 16.339844 21.699219 L 16.339844 16.339844 L 21.699219 16.339844 C 22.183594 16.347656 22.632812 16.09375 22.875 15.675781 C 23.121094 15.257812 23.121094 14.742188 22.875 14.324219 C 22.632812 13.90625 22.183594 13.652344 21.699219 13.660156 L 16.339844 13.660156 L 16.339844 8.300781 C 16.34375 7.9375 16.203125 7.589844 15.945312 7.332031 C 15.691406 7.078125 15.34375 6.9375 14.980469 6.941406 Z M 14.980469 6.941406 "/>
                            </g>
                        </svg>
                    </div>
                    <div class="card-report-body">
                        <h4 style="color: #B05332;">{{lastData.Confirmed}}</h4>
                        <small>Infected</small>
                    </div>
                </div>
            
                <div class="card-report" style="background-color: #FBC1D0;">
                    <div class="card-report-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20pt" height="20pt" viewBox="0 0 50 50" version="1.1">
                            <g id="surface1996858">
                            <path style=" stroke:none;fill-rule:nonzero;fill:rgb(84.313725%,21.176471%,38.431373%);fill-opacity:1;" d="M 25 50 C 11.191406 50 0 38.808594 0 25 C 0 11.191406 11.191406 0 25 0 C 38.808594 0 50 11.191406 50 25 C 50 38.808594 38.808594 50 25 50 Z M 25 50 "/>
                            <path style=" stroke:none;fill-rule:nonzero;fill:rgb(98.431373%,75.686275%,81.568627%);fill-opacity:1;" d="M 25 37.496094 L 24.609375 37.171875 C 23.992188 36.664062 23.167969 36.101562 22.214844 35.449219 C 18.429688 32.867188 12.707031 28.964844 12.707031 22.738281 C 12.707031 18.910156 15.839844 15.800781 19.691406 15.800781 C 21.75 15.800781 23.679688 16.695312 25 18.230469 C 26.320312 16.695312 28.25 15.800781 30.308594 15.800781 C 34.160156 15.800781 37.292969 18.910156 37.292969 22.738281 C 37.292969 28.964844 31.570312 32.867188 27.785156 35.449219 C 26.828125 36.101562 26.007812 36.664062 25.390625 37.171875 Z M 25 37.496094 "/>
                            </g>
                        </svg>
                    </div>
                    <div class="card-report-body">
                        <h4 style="color: #D73662;">{{lastData.Recovered}}</h4>
                        <small>Recovered</small>
                    </div>
                </div>

                <div class="card-report" style="background-color: #FCCEBF;">
                    <div class="card-report-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20pt" height="20pt" viewBox="0 0 24 24" version="1.1">
                            <g id="surface2050971">
                            <path style=" stroke:none;fill-rule:nonzero;fill:rgb(100%,100%,100%);fill-opacity:1;" d="M 12 24 C 5.371094 24 0 18.628906 0 12 C 0 5.371094 5.371094 0 12 0 C 18.628906 0 24 5.371094 24 12 C 24 18.628906 18.628906 24 12 24 Z M 12 24 "/>
                            <path style=" stroke:none;fill-rule:nonzero;fill:rgb(69.019608%,32.54902%,19.607843%);fill-opacity:1;" d="M 7.847656 6.914062 L 6.914062 7.847656 L 11.066406 12 L 6.914062 16.152344 L 7.847656 17.085938 L 12 12.933594 L 16.152344 17.085938 L 17.085938 16.152344 L 12.933594 12 L 17.085938 7.847656 L 16.152344 6.914062 L 12 11.066406 Z M 7.847656 6.914062 "/>
                            </g>
                        </svg>    
                    </div>
                    <div class="card-report-body">
                        <h4 style="color: #B05332;">{{lastData.Deaths}}</h4>
                        <small>Deaths</small>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    name: 'currentReport2',
    props: {
        lastData: null
    },
    data: ()=> ({
        
    }),
    mounted () {
    }
}
</script>
<style scoped>
.card-report-container {
    display: flex;
    justify-content: center;
    
}
.card-report {
    width: 110px;
    height: 120px;
    margin-right: 5px;
    text-align: center;
    border-radius: 20px;
}
.card-report-icon {
    margin-top: 15px;
}
.card-report h4 {
    margin: 0;   
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
    border-bottom: 2px solid var(--green) !important;
}
</style>