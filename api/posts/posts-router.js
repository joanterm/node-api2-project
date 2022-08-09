// implement your posts router here
//ROUTER SET UP
const express = require("express")
const router = express.Router()
const Posts = require("./posts-model")

router.get("/", (req, res) => {
    Posts.find()
    .then((result) => {
        res.status(200).json(result)
    })
    .catch(() => {
        res.status(500).json({message: "The posts information could not be retrieved"})
    })
})

router.get("/:id", (req, res) => {
    const id = req.params.id
    Posts.findById(id)
    .then((result) => {
        if(!result) {
            res.status(404).json({message: "The post with the specified ID does not exist"})
        } else {
            res.status(200).json(result)
        }
    })
    .catch(() => {
        res.status(500).json({message: "The post information could not be retrieved"})
    })
})

// router.post("/", (req, res) => {
//     Posts.insert(req.body)
//     .then((result) => {
//         if(!result.title || !result.contents) {
//             res.status(400).json({message: "Please provide title and contents for the post"})
//         } else {
//             res.status(201).json(result)
//         }
//     })
//     .catch(() => {
//         res.status(500).json({message: "There was an error while saving the post to the database"})
//     })
// })

router.post("/", (req, res) => {
    console.log(req.body)
    const {title, contents} = req.body
    if(!title || !contents) {
        res.status(400).json({message: "Please provide title and contents for the post"})
        return
    } else {
        Posts.insert(req.body)
        .then((id) => {
            return Posts.findById(id.id)
        })
        .then((result) => {
            res.status(201).json(result)
        })
        .catch(() => {
            res.status(500).json({message: "There was an error while saving the post to the database"})
        })
    }
})

//need fixing
router.delete("/:id", (req, res) => {
    // const id = req.params.id
    // Posts.remove(id)
    // .then((result) => {
    //     if(!result) {
    //         res.status(404).json({message: "The post with the specified ID does not exist"})
    //     } else {
    //         res.status(200).json(result)
    //     }
    // })
    // .catch(() => {
    //     res.status(500).json({message: "The post could not be removed"})
    // })
    Posts.findById(req.params.id)
    .then((result) => {
        if(!result) {
            res.status(404).json({message: "The post with the specified ID does not exist"})
            return
        } else {
            Posts.remove(req.params.id)
            .then(() => {
                res.status(200).json(result)
            })
        }
    })
        .catch(() => {
        res.status(500).json({message: "The post could not be removed"})
    })
})




module.exports = router