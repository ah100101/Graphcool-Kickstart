const mutations = function (state) {
  return {
    setObiAdvice (state, text) {
      state.obiAdvice = text
    },
    setAnakinThreat (state, text) {
      state.anakinThreat = text
    }
  }
}

module.exports = mutations
