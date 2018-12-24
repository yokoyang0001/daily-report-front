<template>
  <v-layout>
    <v-flex>
      <div>
        <h1>こんにちは、{{ loggedInUser.name }}さん！！</h1>
      </div>
      <v-card>
        <v-card-title class="headline">Remaining Task</v-card-title>
        <hr>
        <v-card-text>
          <p>Nothing...</p>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  middleware: 'auth',
  computed: {
    loggedInUser() {
      return this.$auth.user
    }
  }
}
</script>
