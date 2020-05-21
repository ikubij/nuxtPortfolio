<template>
  <v-navigation-drawer
    top
    color="white"
    fixed
    height="100%"
    overlay-color="secondary"
    overlay-opacity=".8"
    temporary
    v-bind="$attrs"
    v-on="$listeners"
  >
    <v-list
      color="white"
      shaped
    >
      <v-list-item>

        <v-img
            src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
            gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
            max-width="128"
            width="100%"
            class="mb-2"
        ></v-img>

      </v-list-item>

      <v-divider></v-divider>

      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :to="item.link"
        color="primary"
      >
        <v-list-item-content>
          <v-list-item-title v-text="item.name" />
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  export default {
    name: 'Drawer',

    props: {
      items: {
        type: Array,
        default: () => ([]),
      },
    },
  }
</script>
