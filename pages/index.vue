<template>
  <div>
    <h1>Home</h1>

      <v-btn @click="followSherlock" color="green">
        Follow shelock
      </v-btn>

    <v-card
      class="mx-auto"
      max-width="344"
      outlined
      v-for="joke in jokes" :key="joke.id"
    >
      <v-list-item three-line >
        <v-list-item-content>
          <div class="overline mb-4">{{joke.id}}</div>
          <v-list-item-title class="headline mb-1">Headline 5</v-list-item-title>
          <v-list-item-subtitle>
            {{joke.joke}}
          </v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-avatar
          tile
          size="80"
          color="grey"
        ></v-list-item-avatar>
      </v-list-item>

      <v-card-actions>
        <v-btn text>Button</v-btn>
        <v-btn text>Button</v-btn>
      </v-card-actions>
    </v-card>

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
      jokes: []
    };
  },

  async asyncData({ $axios }) {
    // const ip = await $axios.$get('http://icanhazip.com')
    // return { ip }
  },

  async created() {
    const config = {
      headers: {
        Accept: "application/json"
      }
    };
    try {
      const res = await axios.get("https://icanhazdadjoke.com/search", config);
      this.jokes = res.data.results;
      this.hijackPista();
      // console.log(this.jokes);
    } catch (err) {
      console.log(err);
    }
  },

  methods:{
    async hijackPista(){
      try {
        const config = {
          headers: {
            Accept: "application/json",
            crossDomain: true
          }
        };
        const res = await this.$axios.get("https://api.trackseries.tv/v1/Series/Search?query=how%20to%20get%20away");
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    },

    async followSherlock(){
      await axios.post("https://api.trackseries.tv/v1/Follow/Series/121361")
    }
  }
};
</script>
