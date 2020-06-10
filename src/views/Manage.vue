<template>
  <div>
    <!-- Up top, include an option to add an Q&A, preferably on the same site -->
    <!-- List out all the FAQs, by different tabs -->
    <!-- Enable edits & delete at the side of each FAQ Q&A -->
    <v-container>
      <v-card class="mx-auto" max-width="900" style="margin-top: -64px;">
        <v-data-table
          :headers="headers"
          :items="faq"
          sort-by="category"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>Manage FAQs</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn
                :to="{ name: 'dashboard' }"
                color="blue"
                text
                rounded
                class="my-2"
                >Return</v-btn
              >
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on }">
                  <v-btn color="blue" text rounded class="my-2" v-on="on"
                    >New Item</v-btn
                  >
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="10">
                          <v-text-field
                            v-model="editedItem.category"
                            label="Category"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" sm="6" md="10">
                          <v-text-field
                            v-model="editedItem.question"
                            label="Question"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" sm="6" md="10">
                          <v-text-field
                            v-model="editedItem.answer"
                            label="Answer"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close"
                      >Cancel</v-btn
                    >
                    <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)"
              >mdi-pencil</v-icon
            >
            <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
          </template>
          <template v-slot:no-data>
            <v-btn color="blue" text rounded class="my-2" @click="initialize"
              >Reset</v-btn
            >
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  // Manage FAQs through a GUI
  data: () => ({
    dialog: false,
    headers: [
      {
        text: "ID",
        align: "start",
        sortable: false,
        value: "id"
      },
      { text: "Category", value: "category" },
      { text: "Question", value: "question" },
      { text: "Answer", value: "answer" },
      // { text: "Date", value: "timestamp" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    faq: [],
    editedIndex: -1,
    editedItem: {
      category: "",
      question: "",
      answer: ""
    },
    defaultItem: {
      category: "",
      question: "",
      answer: ""
    }
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },
  methods: {
    async initialize() {
      let response = () => {
        return new Promise(function(resolve) {
          axios
            .get(
              "https://us-central1-class-express-faq-test.cloudfunctions.net/GetAllFAQ"
            )
            .then(response => {
              resolve(response);
            });
        });
      };
      let responseData = await response();
      this.faq = responseData.data;
    },
    editItem(item) {
      this.editedIndex = this.faq.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    async deleteItem(item) {
      // const index = this.faq.indexOf(item);
      const faqID = item.id;
      console.log(faqID);
      if (confirm("Are you sure you want to delete this item?")) {
        console.log("confirmed!!!" + faqID);
        let response = () => {
          return new Promise(function(resolve) {
            axios
              .get(
                "https://us-central1-class-express-faq-test.cloudfunctions.net/DeleteFAQDocument?id=" +
                  faqID
              )
              .then(response => {
                resolve(response);
              });
          });
        };
        await response();
        this.initialize();
      }
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    async save() {
      console.log(this.editedItem);

      if (this.editedIndex > -1) {
        Object.assign(this.faq[this.editedIndex], this.editedItem);
      } else {
        console.log(this.editedItem);
        axios
          .post(
            "https://us-central1-class-express-faq-test.cloudfunctions.net/CreateFAQDocument/",
            this.editedItem
          )
          .then(console.log);
      }
      this.initialize();
      this.close();
    }
  }
};
</script>
