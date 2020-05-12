<template>
    <div class="wrapper">
        <center>
            <h1>404</h1>
            <h3>Page not found</h3>
            <router-link to="/" >come back</router-link>
        </center>
    </div>
</template>

<script>

export default {
    name: 'notFound',
    components: {
        
    },
    data: () => ({
       
    }),
    
    methods: {
      
    },
    mounted () {
      
    }
}
</script>
<style scoped>
center {
    margin-top: 60%;
    font-size: 50px;
    color: var(--text-gray);
    margin-bottom: 100px;
}
a {
   font-size: 25px;
   background-color: var(--green-text);
   text-decoration: none;
   color: white;
   padding: 10px;
   border-radius: 10px;
}
</style>