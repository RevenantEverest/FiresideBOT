module.exports = {
    checkStatus(req, res, next) { 
        res.json({ message: "Online", data: { online: true } })
    } 
};