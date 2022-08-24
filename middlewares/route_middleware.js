module.exports = {
    notfoundCheckRoute: function (req, res) {
        res.status(404).
        send('404')
    }
}