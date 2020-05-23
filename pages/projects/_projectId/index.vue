<template >
  <div>
    <v-card
      class="mx-auto mb-6"
      max-width="80%"
      v-editable="blok"
    >
      <v-img
        :src="thumbnail"
        height="200px"
      ></v-img>

      <v-card-title>
        {{title}}
      </v-card-title>

      <v-card-subtitle>
        {{skills}}
      </v-card-subtitle>

      <v-card-actions>
        <v-btn 
          text 
          :href="githubLink.url" 
          target="_blank"
          >
          Github
        </v-btn>

        <v-btn
          color="purple"
          text
          :href="link.url" 
          target="_blank"
        >
          Portfolio
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
             <div v-html="description"></div>
              {{description}}
              <markdown 
                :markdown="description"
              >
              </markdown>
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>
  </div>
</template>

<script>
import Markdown from "../../../components/Markdown";

export default {
  components: {
    Markdown,
  },
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

  asyncData(context) {
    return context.app.$storyapi
      .get("cdn/stories/projects/" + context.params.projectId, {
        // version: "draft",
        version: context.isDev ? "draft" : "published",
      })
      .then(res => {
        var richDesc=res.data.story.content.description;
        var renderedDesc=context.app.$storyapi.richTextResolver.render(richDesc);
        // console.log(res)
        // console.log(renderedDesc)
        return {
            blok: res.data.story.content,
            id: res.data.story.content.slug,
            title: res.data.story.content.title,
            thumbnail: res.data.story.content.thumbnail,
            skills: res.data.story.content.skills,
            description: renderedDesc,
            githubLink: res.data.story.content.githubLink,
            link: res.data.story.content.link,
            images: res.data.story.content.images,
        };
      });
  },

  mounted() {
    this.$storybridge.on("change", () => {
      location.reload(true);
    });

    const doc = {
      type: 'doc',
      content: [
        {
          type: 'rich_text',
          content: [{
            text: '***code***',
            type: 'text'
          }]
        }
      ]
    }
    var renderedDesc=this.$storyapi.richTextResolver.render(doc);
    console.log(renderedDesc)
  },

};
</script>
