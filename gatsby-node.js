
const path = require(`path`)
exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions
  const kategorijeTemplate = path.resolve(`src/pages/kategorije.js`)
  const proizvodiTemplate = path.resolve(`src/pages/proizvodi.js`)
  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              slug
              label
              type
              category
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }
    return result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      if(node.frontmatter.type === "cat") {
        const slug  = node.frontmatter.slug;
        const jpg_filter = "/" + node.frontmatter.label + "/"
        const json_filter = node.frontmatter.label
        createPage({
          path: "/kategorije" + slug,
          component: kategorijeTemplate,
          context: {slug: slug, jpg: jpg_filter, json: json_filter}, // additional data can be passed via context
        })
      }
      else if(node.frontmatter.type === "item") {
        const slug = node.frontmatter.slug;
        const category = node.frontmatter.category
        const jpg = "/" + category + "/"
        const json = category
        const label = node.frontmatter.label
        console.log(slug)
        createPage({
          path: "/proizvodi" + slug,
          component: proizvodiTemplate,
          context: {item_jpg: jpg, item_json: json, label: label}, // additional data can be passed via context
        })
      }
    })
  })
}

/*
const path = require(`path`)
exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions
  const kategorijeTemplate = path.resolve(`src/pages/kategorije.js`)
  const proizvodiTemplate = path.resolve('src/pages/proizvodi.js')
  const markDownQuery = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              slug
              label
            }
          }
        }
      }
    }
  `)

  if(markDownQuery.errors) {
    console.error(markDownQuery.errors)
    throw markDownQuery.errors
  }
  console.log(markDownQuery)
  markDownQuery.data.allMarkdownRemark.edges.forEach(({ node }) => {
        const slug  = node.frontmatter.slug;
        const jpg_filter = "/" + node.frontmatter.label + "/"
        const json_filter = node.frontmatter.label
      createPage({
        path: "/kategorije" + slug,
        component: kategorijeTemplate,
        context: {slug: slug, jpg: jpg_filter, json: json_filter}, // additional data can be passed via context
      })
    })
}
*/