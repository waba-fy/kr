import {
  Navigate,
  useParams,
} from "react-router-dom";

import SEO from "../components/seo/SEO";
import CaseStudyTemplate from "../components/caseStudyPdf/CaseStudyTemplate";

import { caseStudies as fallbackCaseStudies } from "../data/caseStudiesData";
import useManagedContent from "../hooks/useManagedContent";

const normalizeSlug = (value = "") => {
  return String(value)
    .trim()
    .replace(/^\/+/, "")
    .replace(/^success-stories\//, "")
    .replace(/^case-studies\//, "");
};

const CaseStudyDetails = () => {
  const { items: caseStudies, loading } = useManagedContent("case-studies", fallbackCaseStudies);
  const { slug } = useParams();

  const currentSlug = normalizeSlug(slug);

  const validCaseStudies = Array.isArray(caseStudies)
    ? caseStudies.filter(Boolean)
    : [];

  const caseStudy = validCaseStudies.find(
    (item) =>
      normalizeSlug(item.slug) === currentSlug
  );

  if (!caseStudy && loading) return null;

  if (!caseStudy) {
    return (
      <Navigate
        to="/case-studies"
        replace
      />
    );
  }

  const description =
    caseStudy.executiveSummary?.description ||
    caseStudy.cover?.description ||
    `Explore the ${caseStudy.cover?.title || "project"} case study.`;

  return (
    <main className="kr-case-study-details-page">
      <SEO
        title={`${
          caseStudy.cover?.title || "Project"
        } Case Study`}
        description={description}
        canonical={`/case-studies/${currentSlug}`}
      />

      <CaseStudyTemplate data={caseStudy} />
    </main>
  );
};

export default CaseStudyDetails;
