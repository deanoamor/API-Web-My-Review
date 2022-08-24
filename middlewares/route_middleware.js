module.exports = {
    notfoundRouteCheck : function (req, res) {
        res.status(404).
        send('Not allowed')
    }
}