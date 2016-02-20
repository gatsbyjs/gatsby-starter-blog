exports.loadContext = function (callback) {
  let context = require.context('./pages', true)
  if (module.hot) {
    module.hot.accept(context.id, () => {
      context = require.context('./pages', true)
      return callback(context)
    })
  }
  return callback(context)
}
