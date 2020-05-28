<template>
<transition name="fade" mode="out-in">
  <div>
    <h1>About</h1>
    {{expressServer}}

    <v-btn @click="insertPost" color="orange">
      Insert Post
    </v-btn>
    
  </div>
</transition>
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

  transition (to, from) {
    if (!from) { return 'slide-left' }
    return +to.query.page < +from.query.page ? 'slide-right' : 'slide-left'
  },

  data() {
    return {
      jokes: [],
      expressServer:''
    };
  },

  async asyncData(context) {
    // console.log(context.api.get('posts'))
    // const res =  context.$axios.$get("posts/");
        // console.log(res.data);
    
  },

  async created() {
    this.getLaravelPosts();
    this.getExpressPosts();
  },

  methods:{
    async getExpressPosts(){
      try {
        const res = await axios.get("/api/posts/");
        this.expressServer = res.data;
        // console.log(this.expressServer);
      } catch (err) {
        console.log(err);
      }
    },

    async getLaravelPosts(){
      try {
        const config = {
          headers: {
            Accept: "application/json",
            crossDomain: true
          }
        };
        const res = await this.$axios.get("/api/posts/",config);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    },

    insertPost(){
      axios.post("/api/posts/")
      this.getPosts();
    }
  }
};
</script>
