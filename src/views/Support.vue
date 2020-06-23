<template>
  <!-- List out all the tickets raised -->
  <!-- Allow for replies to each in the GUI, folling up with email notifications -->
  <!-- Allow for resolving on each ticket -->
  <!-- Resolving of ticket is updated and placed in another tab under "resolved"/log -->
  <!-- Flag is an option, where administrators can "flag" up to devs or business users through email notifications -->
  <div>
    <v-container>
      <v-card class="mx-auto" max-width="900" style="margin-top: -64px;">
        <v-data-table
          :headers="headers"
          :items="supportCases"
          sort-by="calories"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>Support Cases</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <!-- <v-dialog v-model="dialog" max-width="500px">                
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.name"
                            label="Dessert name"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.calories"
                            label="Calories"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.fat"
                            label="Fat (g)"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.carbs"
                            label="Carbs (g)"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedItem.protein"
                            label="Protein (g)"
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
              </v-dialog> -->
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="viewCase(item)">
              mdi-alert-circle-outline
            </v-icon>
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">Reset</v-btn>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    headers: [
      { text: "ID", align: "start", sortable: false, value: "id" },
      { text: "Category", value: "category" },
      { text: "Email", value: "email" },
      { text: "Name", sortable: false, value: "name" },
      { text: "Resolved?", value: "resolved" },
      { text: "Time Stamp", value: "timestamp" },
      { text: "View", value: "actions", sortable: false }
    ],
    supportCases: [],
    editedIndex: -1,
    editedItem: {
      id: "",
      category: "",
      email: "",
      name: "",
      resolved: "",
      timestamp: ""
    },
    defaultItem: {
      id: "",
      category: "",
      email: "",
      name: "",
      resolved: "",
      timestamp: ""
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
      const request = new Request(
        "https://us-central1-class-express-faq-test.cloudfunctions.net/GetAllTickets",
        {
          method: "GET",
          mode: "cors"
        }
      );
      const result = await fetch(request);
      const data = await result.json();
      this.supportCases = data;
    },
    viewCase(item) {
      console.log("clicked!");
      this.editedItem = Object.assign({}, item);
      let id = this.editedItem.id;
      this.$router.push({ name: "support-case", params: { caseID: id } });
      // this.dialog = true;
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.supportCases[this.editedIndex], this.editedItem);
      } else {
        this.supportCases.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>
