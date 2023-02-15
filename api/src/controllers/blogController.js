const { Blog } = require("../db.js");


const getBlogs = async () => {
    const response = await Blog.findAll();
    return response;
}

const getBlog = async (id) => {
    const response = await Blog.findByPk(id);
    return response;
}

const postBlog = async (type, title, image, description, symptoms, tips, extraText) => {
    const response = await Blog.create({type, title, image, description, symptoms, tips, extraText})
    return response;
}

module.exports = {
    getBlogs,
    getBlog,
    postBlog
}