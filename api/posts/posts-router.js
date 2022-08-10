// implement your posts router here
//ROUTER SET UP
const express = require("express")
const router = express.Router()
const Posts = require("./posts-model")

//GET
router.get("/", (req, res) => {
    Posts.find()
    .then((result) => {
        res.status(200).json(result)
    })
    .catch(() => {
        res.status(500).json({message: "The posts information could not be retrieved"})
    })
})

//GET BY ID
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

//POST
router.post("/", (req, res) => {
    const {title, contents} = req.body
    if(!title || !contents) {
        res.status(400).json({message: "Please provide title and contents for the post"})
        return
    } 
    Posts.insert(req.body)
    .then((item) => { //????
        return Posts.findById(item.id) //??????
    })
    .then((result) => {
        res.status(201).json(result)
    })
    .catch(() => {
        res.status(500).json({message: "There was an error while saving the post to the database"})
    })
})

//PUT
router.put("/:id", (req, res) => {
    const {title, contents} = req.body
    if(title == null || contents == null) {
        res.status(400).json({message: "Please provide title and contents for the post"})
    }
    Posts.update(req.params.id, req.body)
    .then(() => {
        return Posts.findById(req.params.id)
    })
    .then((result) => {
        if(result == null) {
            res.status(404).json({message: "The post with the specified ID does not exist"})
            return
        } else {
            res.status(200).json(result)
        }
    })
    .catch(() => {
        res.status(500).json({message: "The user information could not be modified"})
    })
})

//DELETE
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
        if(result == null){
            res.status(404).json({ message: "The post with the specified ID does not exist" })
            return;
        }
        Posts.remove(req.params.id)
        .then(() => {
            res.status(200).json(result)
        })
    })
    .catch(() => {
        res.status(500).json({message: "The post could not be removed"})
    })
})

router.get("/:id/comments", (req, res) => {
    Posts.findPostComments(req.params.id)
    .then((result) => {
        if(!result.length > 0) {
            res.status(404).json({message: "The post with the specified ID does not exist"})
        } else {
            res.status(200).json(result)
        }
    })
    .catch((err) => {
        res.status(500).json({message: "The comments information could not be retrieved"})
    })
})


// server.put("/api/users/:id", (req, res) => {
//     update(req.params.id, req.body)
//     .then((result) => {
//         if(!result) {
//             res.status(404).json({message: "The user with the specified ID does not exist"})
//         } else if(!result.name || !result.bio) {
//             res.status(400).json({message: "Please provide name and bio for the user"})
//         } else {
//             res.json(result)
//         }
//     })
//     .catch(() => {
//         res.status(500).json({message: "The user information could not be modified"})
//     })
// })




module.exports = router