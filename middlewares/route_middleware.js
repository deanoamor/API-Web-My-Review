module.exports = {
    notfoundCheckRoute: function (req, res) {
        res.status(404).
        json('404')
    }
}