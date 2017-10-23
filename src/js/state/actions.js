const actions = {
  setObiAdvice: (context, text) => {
    context.commit('setObiAdvice', text)
  },
  setAnakinThreat: (context, text) => {
    context.commit('setAnakinThreat', text)
  }
}

module.exports = actions
