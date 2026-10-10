import { Helmet } from "react-helmet-async";

const SITE_URL = "https://keyroutes.co";

const SEO = ({
  title,
  description,
  canonical = "/",
  image = "/key-routes-logo.png",
  robots = "index, follow",
  keywords = [],
  type = "website",
}) => {
  const canonicalUrl = canonical.startsWith("https://") ? canonical : `${SITE_URL}${canonical}`;
  const imageUrl = image.startsWith("http")
    ? image
    : `${SITE_URL}${image}`;

  const pageTitle = title
    ? (/KeyRoutes$/i.test(title) ? title : `${title} | KeyRoutes`)
    : "KeyRoutes | Real Estate Strategy, Marketing & Technology";

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <script type="application/ld+json">{JSON.stringify({"@context":"https://schema.org","@graph":[{"@type":"Organization","@id":`${SITE_URL}/#organization`,name:"KeyRoutes",url:SITE_URL,logo:`${SITE_URL}/key-routes-logo.png`,parentOrganization:{"@type":"Organization",name:"Sixedge Innovations"}}, {"@type":"WebSite","@id":`${SITE_URL}/#website`,url:SITE_URL,name:"KeyRoutes",publisher:{"@id":`${SITE_URL}/#organization`}}, {"@type": canonicalUrl.endsWith("/about") ? "AboutPage" : canonicalUrl.endsWith("/contact") ? "ContactPage" : "WebPage","@id":`${canonicalUrl}#webpage`,url:canonicalUrl,name:pageTitle,description,isPartOf:{"@id":`${SITE_URL}/#website`},inLanguage:"en-IN"}]}).replace(/</g,"\\u003c")}</script>

      <meta
        name="description"
        content={description}
      />

      <meta
        name="robots"
        content={robots}
      />

      {keywords.length > 0 && (
        <meta
          name="keywords"
          content={Array.isArray(keywords) ? keywords.join(", ") : keywords}
        />
      )}

      <link
        rel="canonical"
        href={canonicalUrl}
      />

      {/* Open Graph */}

      <meta
        property="og:type"
        content={type}
      />

      <meta
        property="og:site_name"
        content="KeyRoutes"
      />

      <meta
        property="og:title"
        content={pageTitle}
      />

      <meta
        property="og:description"
        content={description}
      />

      <meta
        property="og:url"
        content={canonicalUrl}
      />

      <meta
        property="og:image"
        content={imageUrl}
      />

      {/* Twitter */}

      <meta
        name="twitter:card"
        content="summary_large_image"
      />

      <meta
        name="twitter:title"
        content={pageTitle}
      />

      <meta
        name="twitter:description"
        content={description}
      />

      <meta
        name="twitter:image"
        content={imageUrl}
      />
    </Helmet>
  );
};

export default SEO;