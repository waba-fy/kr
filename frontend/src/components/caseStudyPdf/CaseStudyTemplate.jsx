import "../../styles/case-study-template.css";

import CaseStudyCover from "./CaseStudyCover";
import CaseStudyOverview from "./CaseStudyOverview";
import CaseStudyProjects from "./CaseStudyProjects";
import CaseStudyChallenges from "./CaseStudyChallenges";
import CaseStudySolutions  from "./CaseStudySolutions";
import CaseStudyPerformance from "./CaseStudyPerformance";
import CaseStudySEO from "./CaseStudySEO";
import CaseStudyAutomation from "./CaseStudyAutomation";
import CaseStudyEvidence from "./CaseStudyEvidence";
import CaseStudyCTA from "./CaseStudyCTA";

const CaseStudyTemplate = ({ data }) => {
  if (!data) return null;

  return (
    <div className="cs-doc">
      <CaseStudyCover data={data} />

      <CaseStudyOverview data={data} />

      <CaseStudyProjects data={data} />

      <CaseStudyChallenges data={data} />

      <CaseStudySolutions data={data} />
      
      <CaseStudyPerformance data={data} />

      <CaseStudySEO data={data} />

      <CaseStudyAutomation data={data} />

      <CaseStudyEvidence data={data} />

     <CaseStudyCTA data={data} />

    </div>
  );
};

export default CaseStudyTemplate;