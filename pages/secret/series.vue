<template>
  <div>
    <h1>Home</h1>
     <v-card
        elevation="4"
        shaped
        class="mx-auto pa-4 col-md-6 col-10 mb-5"
    >
        <form>
            <v-text-field
            v-model="token"
            label="Token"
            required
            ></v-text-field>

            <v-btn @click="setToken" color="purple">
                Set Token
            </v-btn>
        </form>
    </v-card>

    <v-card
        elevation="4"
        shaped
        class="mx-auto pa-4 col-md-6 col-10"
    >
        <form>
            <v-text-field
            v-model="searchData"
            label="Series Name"
            required
            ></v-text-field>

            <v-btn @click="searchSeries" color="green">
                Search Series
            </v-btn>

            <v-btn @click="setToken" color="purple">
                Set Token
            </v-btn>
        </form>

        <v-card
            class="mx-auto mb-3"
            max-width="90%"
            outlined
            v-for="ser in series" :key="ser.id"
        >
        <v-list-item three-line >
             <v-img
            :src=ser.banner
            size="80"
            color="grey"
            ></v-img>

        </v-list-item>

        <v-card-actions>
            <v-list-item-title class="headline mb-1"> {{ser.name}}</v-list-item-title>
                <v-list-item-subtitle>
                ...
                </v-list-item-subtitle>
        </v-card-actions>
        </v-card>

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
      series: [],
      searchData:'',
      token:'',
    };
  },

  async created() {
    
  },

  methods:{

    async searchSeries(){
        const res = await this.$axios.get(`https://api.trackseries.tv/v1/Series/Search?query=${this.searchData}`);
        console.log(res.data);
        this.series=res.data
    },

    setToken(){
        var TrackToken='be8x8VA_VvDsMzv80bMNeSpsXBo2vEyt94ufc4ZhTdWyTGPQc-KZNPXTRxp7r4H6giPwrFv9jOt3BiPyb5ltnF8bF_hgA1csP2TFViJB60IxDCLS3Xp6hKFnv1YS_RJf2wWXyK6l08MbSHmVsLbXe_g1dWiXDGtI-PAqEpK4fBvIynQLp__xnQcqVlpFwdY5MlgVjq0v6uOGHPSpYDlnyXzW1XYe_rF8RJMM5x_zuSBKX5Y-br4KX8u9FMNtzNznkTE6GyX9kTk5XcLLWI322pEIawHI77_ZTrWIqQVwAoWIRNUh7Kc5CmaZ4eWg092lnsFwfGjFtY4Uibw-rTAAz_s8XaiR2ZNcmfjI8Vqj2x2U7UouompYMvS4PlGHvKWY9_10Lsg0PRIzWmlnpJCKmj3IZDwo2g999IIcDtAJ_vTcAjemMESsgx_V_lvaC487F8ljjA';
        this.$auth.setToken(this.$store.state.auth.strategy, `Bearer ${this.token}`)
        this.$auth.strategy._setToken(`Bearer ${this.token}`)
        // return this.$auth.fetchUser()
    }
  }
};
</script>
