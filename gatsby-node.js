const path = require("path");

exports.onCreatePage = async ({page, actions}) =>{
    const {createPage} = actions;
    console.log(page.path.match("/blog"))
    if(page.path.match("/blog")){
        createPage({
            path: "/blog",
            matchPath: "/blog/:id",
            component: path.resolve("src/pages/blog.js")
        })
    }
    if(page.path.match("/admin/update")){
        createPage({
            path: "/admin/update",
            matchPath: "/admin/update/:id",
            component: path.resolve("src/pages/admin/update.js")
        })
    }
}

// exports.onCreatePage = async ({page, actions}) =>{
//     const {createPage} = actions
//     if(page.path.match("/admin/update")){
//         createPage({
//             path: "/admin/update",
//             matchPath: "/admin/update/:id",
//             component: path.resolve("src/pages/admin/update.js")
//         })
//     }
// }
