<template>
  <div>
    <v-content class="Home">
      <v-container>
        <v-card class="mx-auto" max-width="900" style="margin-top: -64px;">
          <!-- @todo Integrate FAQ Provider with autocomplete -->
          <!-- Displays FAQ using tabs and expansion panels, through a component -->
          <FAQProvider />
        </v-card>
      </v-container>
    </v-content>
  </div>
</template>

<script>
// @ is an alias to /src
import FAQProvider from "@/components/FAQProvider.vue";

export default {
  name: "Home",
  components: {
    FAQProvider
  },
  data() {
    return {
      // @todo Move searchText to watch or computed, so when this is not empty, show search results
      searchText: "",
      collapseSuggestions: false,
      loading: false,
      items: [],
      select: null,
      faqTopics: [
        "Application",
        "Account",
        "General",
        "Misc",
        "Partner",
        "Provider",
        "Billing"
      ]
    };
  },
  watch: {
    searchText(searchText) {
      // Allow suggestions again
      this.collapseSuggestions = false;

      this.loading = true;
      setTimeout(() => {
        this.items = this.faqTopics.filter(
          e =>
            (e || "").toLowerCase().indexOf((searchText || "").toLowerCase()) >
            -1
        );
        this.loading = false;
      }, 500);
    }
  },
  methods: {
    //Search method for autocomplete
    search() {
      console.log("searching ...");
      // Collapse suggestions dropdown
      this.collapseSuggestions = true;
    }
  }
};
</script>
