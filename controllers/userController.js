const { Exercise, User } = require("../model")

const router = require("express").Router()

router.post("/users", async (req, res) => {
    try {
        let exists = await User.exists({ username: req.body.username })
        console.log(exists)
        if (exists) {
            console.log("hi")
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
                date: req.body.date ? new Date(req.body.date).toDateString() : new Date().toDateString()
            })
            exc.save()
                .then(saved => {
                    return res.json({
                        username: saved.username,
                        description: saved.description,
                        duration: saved.duration,
                        date: saved.date,
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
        let id = req.params._id
        let user = await User.findById(id)

        if (user) {
            let log = await Exercise.find({ username: user.username })
            log = log.map(l => {
                return {
                    description: l.description,
                    duration: l.duration,
                    date: l.date
                }
            })
            res.json({
                username: user.username,
                count: log.length,
                _id: user._id,
                log: log
            })
        }
    } catch (error) {
        res.status(400).json(error)
    }
})

module.exports = router