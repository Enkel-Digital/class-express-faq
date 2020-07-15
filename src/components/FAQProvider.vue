<template>
  <v-card>
    <v-card-title>
      FAQs Tables
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>

    <v-data-table
      :headers="headers"
      :items="faq"
      :single-expand="singleExpand"
      :expanded.sync="expanded"
      :search="search"
      sort-by="question"
      group-by="category"
      show-expand
      class="elevation-1"
    >
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">More info about {{ item.question }}</td>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
// @ is an alias to /src

export default {
  name: "faq-provider",
  data() {
    return {
      search: "",
      expanded: [],
      singleExpand: true,
      headers: [
        {
          text: "Question",
          align: "start",
          sortable: false,
          value: "question"
        },
        { text: "Category", value: "category" },
        { text: "", value: "data-table-expand" }
      ],
      faq: []
    };
  },
  created() {
    console.log(typeof this.faq);
    this.initialize();
  },
  methods: {
    // get faq data from firestore
    async initialize() {
      const request = new Request(
        "https://us-central1-class-express-faq-test.cloudfunctions.net/GetAllFAQ",
        {
          method: "GET",
          mode: "cors"
        }
      );
      const result = await fetch(request);
      const data = await result.json();
      this.faq = data;
    }
  }
};
</script>
