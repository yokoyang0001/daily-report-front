<template>
  <section
    class="container reports-page"
  >
    <v-card
      style="flex: 1"
    >
      <div>
        <v-text-field 
          v-model="formData.title"
          label="タイトル"
          required
        />
        <v-text-field
          v-model="formData.content"
          type="textarea"
          label="本文"
          required
          rows="15"
        />
      </div>
      <div
        class="text-right"
        style="margin-top: 16px;"
      >
        <v-btn
          type="primary"
          round
          @click="publish" 
        >
          <span class="v-icon-upload2" />
          <span>Publish</span>
        </v-btn>
      </div>
    </v-card>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  asyncData({ redirect, store }) {
    // if (!store.getters['user']) {
    //   redirect('/')
    // }
    return {
      formData: {
        title: '',
        content: ''
      }
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    async publish() {
      const payload = {
        userId: this.$auth.user.id,
        ...this.formData
      }
      await this.publishReport({ payload })
      this.$router.push('/reports')
    },
    ...mapActions('reports', ['publishReport'])
  }
}
</script>

<style>
.reports-page .v-table__row {
  cursor: pointer;
}
</style>
