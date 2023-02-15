const { Router } = require("express");
const {getBlogs , getBlog , postBlog} = require("./../controllers/blogController");


const router = Router()

router.get("/", async (req, res) => {
    try {
        const blogs = await getBlogs();
        res.status(200).send(blogs);
    } catch (error) {
        res.status(404).send("There are no blogs in the DataBase");
    }
});

router.get("/:id", async (req, res) => {
    const {id} = req.params;
    try {
        const blog = await getBlog(id);
        res.status(200).send(blog);
    } catch (error) {
        res.status(404).send("There is no blog with this id in DataBase");
    }
});

router.post("/", async (req, res) => {
    const {type, title, image, description, symptoms, tips, extraText} = req.body;
    try {
        const blog = await postBlog(type, title, image, description, symptoms, tips, extraText);
        res.status(200).send(blog);
    } catch (error) {
        res.status(400).send("The blog was not created");
    }
})

module.exports = router;