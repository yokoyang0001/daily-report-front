export const state = () => ({
  projects: []
})

export const getters = {
  projects: state => state.projects
}

export const mutations = {
  addProject(state, { project }) {
    state.projects.push(project)
  },
  updateProject(state, { project }) {
    state.projects = state.projects.map(
      p => (p.id === project.id ? project : p)
    )
  },
  clearProjects(state) {
    state.projects = []
  }
}

export const actions = {
  async fetchProject({ commit }, { id }) {
    const project = await this.$axios.$get(`/projects/${id}`)
    commit('addProject', { project: { ...project, id } })
  },
  async fetchProjects({ commit }) {
    const projects = await this.$axios.$get(`/projects`)
    commit('clearProjects')
    Object.entries(projects)
      .reverse()
      .forEach(([id, content]) =>
        commit('addProject', {
          project: {
            id,
            ...content
          }
        })
      )
  }
}
