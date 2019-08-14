import React, { Component } from "react";
import Header from "../components/Header";
import Search from "../components/Search";
import Menu from "../components/Menu";
import ScrollButton from "../components/ScrollToTop";
import Footer from "../components/Footer";
import { graphql } from 'gatsby'
import MdCards from "../components/Mkdwn_cards";
import "../styles/novo_lay.css";

/*
 class Kategorije extends Component {
     render() {
        const data = {page: this.props.location.pathname, 
            user: this.props.location.state.user};

        return(
            <body>
                <div className="site_kategorije">
                    <Header data={data} />
                    <main className="item main">
                        <Search />
                        <Menu d={data} />
                        <NovoCards num="a" a={data} tag="" label="Novo" />
                        <ScrollButton scrollStepInPx="50" delayInMs="16.66" />
                    </main>
                    <Footer />
                </div>
            </body>
        );
     }
 }

export const query = graphql`
  query kategorije {
    allFile(filter: {extension: {eq: "jpg"}}) {
        edges {
          node {
            relativePath
            childImageSharp {
              fixed(width: 125, height: 125) {
                width
              }
            }
            name
          }
        }
      }
  }
`
export default Kategorije
*/

/*
export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  console.log(data)
  const { markdownRemark } = data // data.markdownRemark holds our post data
  const { frontmatter, html } = markdownRemark
  return (
    <div className="blog-post-container">
      OK
    </div>
  )
}
*/

class Kategorije extends Component {
  componentDidMount() {
    document.title = "Kategorije - " + this.props.pageContext.json
  }

  render() {
    
    const data = {
      page: this.props.location.pathname,
      user: this.props.location.state.user
    };
    console.log(this.props)
    const json = this.props.data.json.edges[0].node.articles
    const jpg = this.props.data.jpg.edges
    const label = this.props.pageContext.json

    return (
      <body>
        <div className="site_kategorije">
            <Header data={data} />
              <main className="item main">
                <Search d={data} />
                <Menu d={data} />
                <ScrollButton scrollStepInPx="50" delayInMs="16.66" />
                <MdCards jpg={jpg} json={json} num="a" tag={[]} label={label} a={data} />
            </main>
            <Footer />
        </div>
      </body>
    );
  }
}

export const pageQuery = graphql`
query MyQuery($slug: String!, $jpg: String!, $json: String!) {
  markdownRemark(frontmatter: {slug: {eq: $slug}}) {
    html
    frontmatter {
      slug
      label
    }
  }
  jpg: allFile(filter: {relativePath:{regex:$jpg}, extension:{eq:"jpg"}})
            {
                edges
                {
                    node
                    {
                            relativePath
                            childImageSharp {
                                fixed(width: 125, height: 125) {
                                    ...GatsbyImageSharpFixed
                                }
                                f2: fluid(maxWidth: 400, maxHeight: 400) {
                                  ...GatsbyImageSharpFluid
                              }
                        }
                        name
                    }
                }
            }
            json: allArticlesJson(filter: {name: {eq: $json}}) {
              edges {
                node {
                  articles {
                    node {
                      avelable
                      description
                      details
                      name
                      payment
                      price
                      warranty
                      new
                      action
                    }
                  }
                  name
                }
              }
            }
}
`

export default Kategorije

/*
<NovoCards num="a" a={data} tag="" label={frontmatter.label} />
allArticlesJson(filter: {name: {eq: "Laptopi"}}) {
    edges {
      node {
        articles {
          node {
            description
            name
            payment
            price
          }
        }
        name
      }
    }
  }
*/