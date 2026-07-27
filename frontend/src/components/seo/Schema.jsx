import { Helmet } from "react-helmet-async";

const Schema = ({ data }) => {
  if (!data) {
    return null;
  }

  const schemas = Array.isArray(data)
    ? data
    : [data];

  return (
    <Helmet>
      {schemas.map((schema, index) => (
        <script
          key={`${schema?.["@type"] || "schema"}-${index}`}
          type="application/ld+json"
        >
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default Schema;