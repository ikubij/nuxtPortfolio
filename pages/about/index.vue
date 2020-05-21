<template>
  <div>
    <h1>About</h1>
    <v-divider></v-divider>
  </div>
</template>

<script>

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
      jokes: []
    };
  },

  async asyncData({ $axios }) {
    // const ip = await $axios.$get('http://icanhazip.com')
    // return { ip }
  },
};
</script>
