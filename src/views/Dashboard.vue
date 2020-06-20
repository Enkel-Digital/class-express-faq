<template>
  <div>
    <!-- <h1>This is Dashboard</h1> -->
    <!-- Dashboard holds two main things: Support Statistics & FAQs -->
    <!-- Support column shows latest raised tickets, with button to direct to Support.vue -->
    <!-- Manage shows the latest additions to the FAQs & to dos, if any -->

    <v-container>
      <v-card class="mx-auto" max-width="900" style="margin-top: -64px;">
        <v-toolbar flat>
          <v-toolbar-title>Admin Dashboard</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn @click="logout" color="blue" text rounded class="my-2"
            >Log Out</v-btn
          >
        </v-toolbar>
      </v-card>
      <v-card class="mx-auto" max-width="900" outlined flat>
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title class="headline mb-1"
              >FAQ Manager</v-list-item-title
            >
            <v-list-item-subtitle
              >Manage FAQ Content here by editing existing or creating new
              ones.</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
        <v-card-actions>
          <v-btn :to="{ name: 'manage' }" color="blue" text rounded class="my-2"
            >Manage</v-btn
          >
        </v-card-actions>
      </v-card>
      <v-card class="mx-auto" max-width="900" outlined flat>
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title class="headline mb-1"
              >Ticket Support</v-list-item-title
            >
            <v-list-item-subtitle
              >Handle Support Tickets, escalating, dismissing or resolving
              them.</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
        <v-card-actions>
          <v-btn
            :to="{ name: 'support' }"
            color="blue"
            text
            rounded
            class="my-2"
            >View</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import logout from "@/controllers/logout";

export default {
  name: "dashboard",
  methods: {
    logout
  }
};
</script>
