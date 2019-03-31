module.exports = {
  siteMetadata: {
    title: "Racunalni webshop"
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
		  name: "img",
        path: `${__dirname}/src/resorces/articles`
      }
    },
	`gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
	`gatsby-transformer-json`
  ]
};
