<template>
    <div class="wrapper">
        <div class="read-more-element">
            <div class="read-more-img">
                <img src="@/assets/media/Symptoms.png" alt="Symptoms" height="90%" width="90%">
            </div>
            <div class="read-more-label">
                <h3>5 Symptoms of Covid-19</h3>
                <div style="margin-top: 30px">
                    <a href='/blog/covi-19-symptoms'>Read More</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data: () => ({

    })
}
</script>

<style scoped>

.read-more-element {
    width: 100%;
    height: 170px;
    border-radius: 30px;
    background-color: var(--green);
    display: grid;
    grid-template-columns: 50% 50%;
}
.read-more-label { 
    padding: 20px 20px 0px 0px;
}
.read-more-img {
    margin-top: -20px;
    margin-left: 10px;
}
h3 {
    margin: 10px 0 0 0;
}
.read-more-label a { 
    
    padding: 5% 10% 5% 10%;
    text-decoration: none;
    margin-top: 30px;
    background-color: var(--green-btn);
    border: none;
    color: #ffffff;
    border-radius: 50px;
    width: 100%;
}
</style>