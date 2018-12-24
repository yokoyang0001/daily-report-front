export const state = () => ({
  reports: []
})

export const getters = {
  reports: state => state.reports
}

export const mutations = {
  addReport(state, { report }) {
    state.reports.push(report)
  },
  updateReport(state, { report }) {
    state.reports = state.reports.map(p => (p.id === report.id ? report : p))
  },
  clearreports(state) {
    state.reports = []
  }
}

export const actions = {
  async fetchReport({ commit }, { id }) {
    const report = await this.$axios.$get(`/reports/${id}`)
    commit('addReport', { report: { ...report, id } })
  },
  async fetchReports({ commit }) {
    const reports = await this.$axios.$get(`/reports`)
    commit('clearReports')
    Object.entries(reports)
      .reverse()
      .forEach(([id, content]) =>
        commit('addReport', {
          report: {
            id,
            ...content
          }
        })
      )
  },
  async publishReport({ commit }, { payload }) {
    const report = await this.$axios.$post('/reports', payload)
    commit('addReport', { report })
  }
}
