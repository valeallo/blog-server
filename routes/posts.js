const express = require("express");
const router = express.Router();
const Posts = require("../models/posts");

router.get("/posts", async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const posts = await Posts.find()
    .limit(limit * 1)
    .skip((page - 1) * limit)
    const count = await Posts.countDocuments();
    res.status(200).send(posts);
  } catch (error) {
    res.status(500).send({
      message: "an error has occurred",
    });
  }
});

router.get("/posts/:id", async (req, res) => {
  const {id} = req.params
    try{
        const post = await Posts.findById(id)
        if (!post){
        return res
            .status(404)
            .send(`post with id ${id} not found`)}
        res.status(200).send(post)
    }
    catch(error){
        res.status(500).send({
            message: "an error has occurred",
            error: error
        })
    }
});

router.post("/posts", async(req, res) => {
    const newPost = new Posts({
        title: req.body.title,
        img: req.body.img,
        body: req.body.body,
        author: req.body.author,
        featured: req.body.featured,
        category: req.body.category
    })
  try {
    const savePost = await newPost.save()
    res.status(200).send({
        message: "post saved successfully",
        payload: savePost
    })
  } catch (error) {
    res.status(500).send({
        message: "an error has occurred",
        error: error
    })
  }
});


router.delete("/posts/del/:id", async (req, res) => {
    const {id} = req.params
    try{
        const post = await Posts.findById(id).deleteOne()
        if (!post){
        return res
            .status(404)
            .send(`post with id ${id} not found`)}
        res.status(200).send(`post ${id} deleted successfully`)
    }
    catch(error){
        res.status(500).send({
            message: "an error has occurred",
            error: error
        })
    }
})

router.patch("/posts/:id", async(req, res)=>{
   
    try {
        const {id} = req.params
        const updatePost = req.body
        const options = {new: true}

        const result = await Posts.findByIdAndUpdate(id, updatePost, options)
        if(!result){
            return res
                .status(404)
                .send(`post with id ${id} not found`)}
                
        res.status(200).send({
            message: "post info updated successfully",
            payload: result
        })
    }
    catch(error){
        res.status(500).send({
            message: "an error has occurred",
            error: error
        })
    }
})



router.get("/posts/:id", async (req, res) => {
    const {id} = req.params
    try {
      const post = await Posts.findById(id);
      if (!post){
      return res
          .status(404)
          .send(`post with id ${id} not found`)}
      res.status(200).send(post);
    } catch (error) {
      res.status(500).send({
        message: "an error has occurred",
      });
    }
  });

  router.get('/featured', async (req,res)=>{
    try {
        const posts = await Posts.find({featured:true})
        res.status(200).send(posts)
    } catch (error) {
        res.status(500).send({
            message:'an error has occurred',
            error: error
        })
    }
})


router.get('/post/type', async (req,res)=>{
    const { featured } = req.query
  try {
    console.log(req.query)
      const posts = await Posts.find({featured: featured})
      console.log(posts)
      res.status(200).send(posts)
  } catch (error) {
      res.status(500).send({
          message:'an error has occurred',
          error: error
      })
  }
})




module.exports = router;
