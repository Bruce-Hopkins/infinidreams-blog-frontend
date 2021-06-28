const path = require("path");

exports.onCreatePage = async ({page, actions}) =>{
    const {createPage} = actions;

    // Creates a route for the page /blog
    if(page.path.match("/blog")){
        createPage({
            path: "/blog",
            matchPath: "/blog/:id",
            component: path.resolve("src/pages/blog.jsx")
        })
    }
    // Creates a route for the page /update
    if(page.path.match("/admin/update")){
        createPage({
            path: "/admin/update",
            matchPath: "/admin/update/:id",
            component: path.resolve("src/pages/admin/update.js")
        })
    }
}

