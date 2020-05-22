<template>
  <div>
    <h1>About</h1>
    {{expressServer}}
    
  </div>
</template>

<script>
import axios from "axios";

export default {
  head() {
    return {
      title: "James Web developer",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Best web developer, web designer, Laravel, Vue...."
        }
      ]
    };
  },

  data() {
    return {
      jokes: [],
      expressServer:''
    };
  },

  async asyncData({ $axios }) {
    // const ip = await $axios.$get('http://icanhazip.com')
    // return { ip }
  },

  async mounted() {
    // const config = {
    //   headers: {
    //     Accept: "application/json"
    //   }
    // };
    try {
      const res = await axios.get("/api/");
      this.expressServer = res.data;
      // console.log(this.expressServer);
    } catch (err) {
      console.log(err);
    }
  },
};
</script>
