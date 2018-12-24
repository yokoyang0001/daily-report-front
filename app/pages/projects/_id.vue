<template>
  <section class="container projects-page">
    <div style="flex: 1px">
      <v-card v-if="project">
        <h2>{{ project.name }}</h2>
        <div 
          slot="header"
          class="clearfix"
        />
        <p class="text-right">{{ project.code }}</p>
        <p class="text-right">{{ project.created_at }}</p>
      </v-card>
      <p>
        <nuxt-link to="/projects">&lt; プロジェクト一覧へ戻る</nuxt-link>
      </p>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  async asyncData({ store, route, error }) {
    const { id } = route.params
    if (store.getters['projects/projects'].find(p => p.id === id)) {
      return
    }
    try {
      await store.dispatch('projects/fetchProject', { id })
      if (!store.getters['projects/projects'].find(p => p.id === id)) {
        throw new Error('project not found')
      }
    } catch (e) {
      error({ statusCode: 404 })
    }
  },
  computed: {
    project() {
      return this.projects.find(p => p.id === this.$route.params.id)
    },
    ...mapGetters('projects', ['projects'])
  }
}
</script>

<style lang="stylus" scoped>
.nuxt-link-active
  color #ffffff
</style>
