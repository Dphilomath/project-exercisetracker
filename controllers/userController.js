const { Exercise, User } = require("../model")

const router = require("express").Router()

router.post("/users", async (req, res) => {
    try {
        let exists = await User.exists({ username: req.body.username })
        if (exists) {
            let existing = await User.findOne({ username: req.body.username })
            return res.json(existing)
        }
        let user = new User(({ username: req.body.username }))

        user.save()
            .then(saved => {
                return res.json(saved)
            })
            .catch(err => {
                console.log(err)
                res.json(err)
            })
    } catch (error) {
        res.status(400).json(error)
    }


})

router.post("/users/:_id/exercises", async (req, res) => {
    try {
        let id = req.params._id
        let user = await User.findById(id)

        if (user) {
            let exc = new Exercise({
                username: user.username,
                description: req.body.description,
                duration: req.body.duration,
                date: req.body.date ? new Date(req.body.date) : new Date()
            })

            user.log.push(exc._id)
            exc.save()
                .then(async (saved) => {
                    await user.save()
                    return res.json({
                        username: saved.username,
                        description: saved.description,
                        duration: saved.duration,
                        date: saved.date.toDateString(),
                        _id: user._id
                    })
                })
                .catch(err => {
                    console.log(err)
                    return res.status(400).json(err)
                })
        }
    } catch (error) {
        res.status(400).json(error)
    }
})

router.get("/users", async (req, res) => {
    try {
        let users = await User.find({});
        return res.json(users)
    } catch (error) {
        return res.status(400).json(error)
    }
})

router.get("/users/:_id/logs", async (req, res) => {
    try {
        let { from , to , limit = 0 } = req.query
        if(!from) from = new Date(0)
        else from = new Date(from)
        if(!to) to = new Date()
        else to = new Date(to)

        let id = req.params._id
        let user = await User.findById(id)

        if (user) {
            let populatedUser = await user.populate({path: 'log', select: "-_id -__v"})
            let logs = populatedUser.log, count = logs.length

            logs = logs.filter(l => {
                return (l.date >= from && l.date <= to)
            })

            logs = logs.sort()
            logs = limit > 0 ? logs.slice(0, limit) : logs
            
            logs = logs.map(l =>{
                return {duration: l.duration, description: l.description, date: l.date.toDateString()}
            })
            res.json({
                id:populatedUser._id, username: populatedUser.username, log: logs, count
            })
        }
    } catch (error) {
        res.status(400).json(error)
    }
})

module.exports = router