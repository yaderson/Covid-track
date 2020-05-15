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
  title: 'mome meo',
  components: {
    ReadMore,
    TotalWorld,
    TopCountrys
  },
  data: () =>({
    
  }),

  mounted (){
  },
  methods: {
      
  }
}
</script>

<style scoped>

</style>