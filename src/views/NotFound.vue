<template>
  <v-container>
    <v-card class="mx-auto" max-width="900" style="margin-top: -64px;">
      <v-toolbar flat>
        <v-toolbar-title>Page not Found</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
    </v-card>
    <v-card class="mx-auto" outlined flat>
      <v-list-item three-line>
        <v-list-item-content>
          <div class="overline mb-4">Error 404</div>
          <v-list-item-title class="headline mb-1">Oops!</v-list-item-title>
          <v-list-item-subtitle
            >Sorry! The page does not exist...</v-list-item-subtitle
          >
          <br />
          <v-list-item-subtitle
            >You will be redirected back in 3 seconds...</v-list-item-subtitle
          >
        </v-list-item-content>
      </v-list-item>
    </v-card>
    <v-card class="mx-auto" flat>
      <v-btn :to="{ name: 'home' }" color="blue" text rounded class="my-2"
        >Return Home</v-btn
      >
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "notFound",
  data() {
    return {
      // Timeout data object that can be referenced to clear if user navigates away before timeout
      timeout: setTimeout(
        router => {
          // Navigate back to last location if possible. 2 as user's default home page may not be a blank tab
          if (window.history.length > 2) router.back();
          // Else, redirect back home
          else router.push({ name: "home" });
        },
        3000,
        this.$router
      )
    };
  },
  components: {
    // BackBtn,
  },
  beforeDestroy() {
    // Prevent the timeout from still routing to home if user already navigated away themselves
    clearTimeout(this.timeout);
  }
};
</script>

<style scoped>
#notFound {
  margin: 1em;
  text-align: left;
}
</style>
