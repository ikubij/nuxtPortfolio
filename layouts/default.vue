<template>
  <v-app >
    <app-bar/>
    
    <v-content style="margin-top:80px" >
      <v-container fluid >
        
        <v-fade-transition >
          <nuxt />
        </v-fade-transition>

      </v-container>
    </v-content>

    <v-footer app>
      Made with love
    </v-footer>
  
  </v-app>

</template>

<script>
import AppBar from "../components/AppBar";

export default {
  components: {
    AppBar,
  }
};
</script>
