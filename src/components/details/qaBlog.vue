<template>
    <section class="qa-check">
        <div class="wrapper">
            <div class="qa-check-element">
                <a href="/sdsd">
                    <div class="qa-img" style="width: 100%;">
                        <img src="@/assets/media/check-self.png"  alt="">
                    </div>
                    <div class="qa-text">
                        <h4>Self Check up Covid-19</h4>
                        <p>
                            Contain several list of Question to check your physical condition.
                        </p>
                    </div>
                    <div class="qa-go-to">
                        <svg fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px">    <path d="M 7 1 L 12.511719 12 L 7 23 L 11.488281 23 L 17 12 L 11.488281 1 L 7 1 z"/></svg>
                    </div>
                </a>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    name: 'qaBlog',
    data: () => ({
        a:null
    }),
}
</script>
<style scoped>
.qa-check-element a {
    text-decoration: none;
    color: black;
    width: 100%;
    height: 170px;
    border-radius: 30px;
    background-color: var(--green);
    display: grid;
    grid-template-columns: auto auto auto;
}

.qa-go-to {
    margin-top: 80px;
}
.qa-text {
    margin-top: 5%;
}
.qa-text p {
    font-size: 12px;
}
.qa-img img {
    margin-top: 10px;
    height: 159px;
    width: 150px;
    border-radius: 30px;
}

@media (min-width: 768px) and (max-width: 1024px) {
    .qa-check-element {
        margin: 50px;
    }
  
}



</style>