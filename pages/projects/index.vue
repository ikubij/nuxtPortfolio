<template>
  <div>
    <h1>Work</h1>
    <v-card
      class="mx-auto mb-6"
      max-width="80%"
      v-for="project in projects"
      :key="project.id"
    >
      <v-img
        :src="project.thumbnail"
        height="200px"
      ></v-img>

      <v-card-title>
        {{project.title}}
      </v-card-title>

      <v-card-subtitle>
        {{project.skills}}
      </v-card-subtitle>

      <v-card-actions>
        <v-btn 
          text 
          :href="project.githubLink.url" 
          target="_blank"
          >
          Github
        </v-btn>

        <v-btn
          color="purple"
          text
          :href="project.link.url" 
          target="_blank"
        >
          Portfolio
        </v-btn>

        <v-btn
          color="purple"
          text
          :href="'projects/'+project.id" 
        >
          View all
        </v-btn>

        <v-spacer></v-spacer>

        <v-btn
          icon
          @click="show = !show"
        >
          <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>

          <v-card-text>
            <!-- <p><span v-html="description"></span></p> -->
              {{project.description}}
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>
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
      show: false,
      jokes: []
    };
  },

  async asyncData(context) {
    return context.app.$storyapi
      .get("cdn/stories", {
        // version: "draft",
        version: context.isDev ? "draft" : "published",
        starts_with: "projects/",
        // per_page: 1,
        // page: 2,
      })
      .then(res => {
        return {
          projects: res.data.stories.map(bp => {
            return {
              id: bp.slug,
              title: bp.content.title,
              skills: bp.content.skills,
              position: bp.content.position,
              description: bp.content.description,
              thumbnail: bp.content.thumbnail,
              images: bp.content.images,
              githubLink: bp.content.githubLink,
              link: bp.content.link,
              
            };
          })
        };
      });    
  },

  mounted(){
      // console.log(this.projects)
    }
};
</script>
