import React, { Component } from "react";
import Header from "../components/Header";
import Search from "../components/Search";
import Menu from "../components/Menu";
import ScrollButton from "../components/ScrollToTop";
import Footer from "../components/Footer";
import { graphql } from 'gatsby'
import MdCards from "../components/Mkdwn_cards";
import "../styles/novo_lay.css";

class Kategorije extends Component {
  componentDidMount() {
    document.title = "Kategorije - " + this.props.pageContext.json
  }

  render() {
    
    const data = {
      page: this.props.location.pathname,
      user: this.props.location.state.user
    };
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
            <Footer data={data} />
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