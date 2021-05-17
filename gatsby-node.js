const path = require("path");

exports.onCreatePage = async ({page, actions}) =>{
    const {createPage} = actions
    console.log('Page - ' + page.page);
    if(page.path.match(/^\/blog/)){
        createPage({
            path: "/blog",
            matchPath: "/blog/:id",
            component: path.resolve("src/pages/blog.js"),
            context: {
                title: "Yo man",
                description: "This is a description"
            }
        })
    }
}