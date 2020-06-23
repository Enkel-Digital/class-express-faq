<template>
  <!-- <div v-if="supportCase"> -->
  <div>
    <v-card class="mx-auto" max-width="900" style="margin-top: -64px;">
      <v-card-title>
        <span class="headline">Support Case Details</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                label="Support Case Id"
                readonly
                v-bind:value="getID"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                label="Category"
                v-bind:value="supportCase.category"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-bind:value="supportCase.email"
                readonly
                label="Email"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-bind:value="supportCase.name"
                readonly
                label="Name"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                readonly
                label="Resolved"
                v-bind:value="supportCase.resolved"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                readonly
                label="Resolved"
                v-bind:value="TimeStampToDate(supportCase.timestamp)"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="resolve()">Resolve</v-btn>
      </v-card-actions>
    </v-card>
    <v-card class="mx-auto" max-width="900" outlined flat>
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title class="headline mb-1"
            >Support Chat</v-list-item-title
          >
          <v-list-item-subtitle>Chat with customer here</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-card-actions> </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      supportCase: []
    };
  },
  mounted() {
    this.initialize();
  },
  computed: {
    getID() {
      return this.$route.params.caseID;
    }
  },
  methods: {
    async initialize() {
      this.supportCase = await fetch(
        "https://us-central1-class-express-faq-test.cloudfunctions.net/GetIndividualTicket?id=" +
          this.$route.params.caseID
      )
        .then(response => response.text())
        .catch(error => console.log("error", error));
      this.supportCase = JSON.parse(this.supportCase);
    },
    TimeStampToDate(timeStamp) {
      return new Date(timeStamp._seconds * 1000);
    },
    async resolve() {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var raw = JSON.stringify({
        id: this.$route.params.caseID
      });
      var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        origin: "*",
        redirect: "follow"
      };
      await fetch(
        "https://us-central1-class-express-faq-test.cloudfunctions.net/CloseTicket",
        requestOptions
      )
        .then(response => response.text())
        .catch(error => console.log("error", error));
      this.supportCase.resolved = "true";
    }
  }
};
</script>
