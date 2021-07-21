import * as React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

const SEO = ({ description, lang, meta, title, slug}) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            keywords
            siteUrl
            lang
          }
        }
      }
    `
  )

  // const description = site.siteMetadata.description
  const defaultTitle = site.siteMetadata?.title

  const canonical = site.siteMetadata.siteUrl || null
  // const title = site.siteMetadata.title;
  // const lang = site.siteMetadata.lang;


  return (
    <Helmet
      htmlAttributes={{
        lang, title, meta, description
      }}
      title={`${defaultTitle ? defaultTitle : "ReviewMate"}`}
      titleTemplate={`${defaultTitle ? defaultTitle : "ReviewMate"} ${slug ? '| ' + slug : ''}`}
      link={
        canonical
          ? [
              {
                rel: "canonical",
                href: canonical,
              },
            ]
          : []
      }
      meta={[
        {
          name: `description`,
          content: description,
        },
        {
          name: "keywords",
          content: site.siteMetadata.keywords.join(","),
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: description,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:title`,
          content: title,
        },
      ].concat(
          {
            name: "twitter:card",
            content: "summary",
          }
        )
      .concat(meta)}
    >
      {/*<title>{slug ? `${defaultTitle} | ${slug}` : defaultTitle}</title>*/}
    </Helmet>
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object)

}
// title: PropTypes.string.isRequired,
export default SEO
