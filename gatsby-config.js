require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: "Infinidreams-Blog-Frontend",
  },
  plugins: [`gatsby-plugin-react-helmet`],
};
