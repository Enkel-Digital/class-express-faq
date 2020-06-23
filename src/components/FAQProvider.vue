<template>
  <v-data-table
    :headers="headers"
    :items="faq"
    :single-expand="singleExpand"
    :expanded.sync="expanded"
    sort-by="question"
    group-by="category"
    show-expand
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>FAQs Table</v-toolbar-title>
      </v-toolbar>
    </template>
    <template v-slot:expanded-item="{ headers, item }">
      <td :colspan="headers.length">More info about {{ item.question }}</td>
    </template>
  </v-data-table>
</template>

<script>
// @ is an alias to /src

export default {
  name: "faq-provider",
  data() {
    return {
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
