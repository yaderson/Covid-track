<template>
    <div>
        <ReadMore />
        <TotalWorld />
        <TopCountrys />
    </div>
</template>

<script>
// @ is an alias to /src
import ReadMore from '@/components/Home/readMore.vue'
import TotalWorld from '@/components/Home/totalWorld.vue'
import TopCountrys from '@/components/Home/topCountrys.vue'

export default {
  name: 'Home',
  components: {
    ReadMore,
    TotalWorld,
    TopCountrys
  },
  computed: {
    
  },
  data: () =>({
    
  }),

  mounted (){
    console.log('reddy')
  },
  methods: {
      
  }
}
</script>

<style scoped>

</style>