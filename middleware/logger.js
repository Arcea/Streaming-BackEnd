module.exports = {
    myLogger: function (req, res, next) {
      console.log('logger called')
      next()
    }
}