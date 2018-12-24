<template>
  <v-layout>
    <v-flex text-xs-center>
      <v-data-table
        :headers="headers"
        :items="projects"
        :rows-per-page-items="[projects.length]"
        class="elevation-1"
      >
        <template
          slot="items"
          slot-scope="props"
        >
          <tr @click="linkToDetail(props.item.id)">
            <td class="text-xs-left">{{ props.item.id }}</td>
            <td class="text-xs-left">{{ props.item.code }}</td>
            <td class="text-xs-left">{{ props.item.name }}</td>
            <td class="text-xs-left">{{ props.item.start_date }}</td>
            <td class="text-xs-left">{{ props.item.end_date }}</td>
            <td class="text-xs-left">{{ props.item.status }}</td>
          </tr>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>

<script >
import { mapGetters } from 'vuex'
export default {
  async asyncData({ store }) {
    await store.dispatch('projects/fetchProjects')
  },
  data() {
    return {
      headers: [
        { text: 'id', value: 'id', align: 'left' },
        { text: 'code', value: 'code', align: 'left' },
        { text: 'name', value: 'name', align: 'left' },
        { text: 'start_date', value: 'start_date', align: 'left' },
        { text: 'end_date', value: 'end_date', align: 'left' },
        { text: 'status', value: 'status', align: 'left' }
      ],
      days: ['2018/12', '2019/01', '2019/02', '2019/03', '2019/04']
    }
  },
  computed: {
    ...mapGetters('projects', ['projects'])
  },
  methods: {
    linkToDetail(id) {
      this.$router.push({ path: `/projects/${id}` })
    }
  }
}
</script>

<style lang="stylus" scoped>
.userInfo 
  margin 0 0 10px 0
  
  table
    width 180px

.days
  width: 180px;
  margin 0 0 10px 0

</style>
