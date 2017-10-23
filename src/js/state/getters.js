const mapGetters = function (state, defaultObject) {
  let gettersObj = {}
  let keys = Object.keys(defaultObject)

  for (var key in keys) {
    let prop = keys[key]
    gettersObj[prop] = (state) => { return state[prop] }
  }

  return gettersObj
}

module.exports = { mapGetters: mapGetters }
