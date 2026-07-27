import { Link } from "react-router-dom";
import {
  FaWhatsapp,
  FaEnvelopeOpenText,
  FaPhoneAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaArrowRight,
  FaDatabase,
  FaCogs,
  FaChartPie,
  FaRobot,
  FaUsers,
  FaBullhorn,
  FaTable,
  FaPlug,
} from "react-icons/fa";
import SEO from "../components/SEO";
import "../styles/product-solutions.css";

const productData = [
  {
    id: "whatsapp-business-api",
    icon: <FaWhatsapp />,
    label: "WHATSAPP BUSINESS API",
    title: "Automate Buyer Conversations and Follow-ups",
    what:
      "WhatsApp Business API is a professional communication platform that helps businesses automate customer conversations, send approved message templates, instantly respond to enquiries, share project details, schedule site visits and manage follow-ups through a centralized workflow.",
    why:
      "In real estate, response speed directly affects lead quality and buyer trust. Buyers usually contact multiple builders at the same time, so the business that responds faster with clear information has a better chance of converting the enquiry into a site visit.",
    problems: [
      "Delayed replies to new enquiries",
      "Missed WhatsApp messages from interested buyers",
      "No centralized conversation history",
      "Manual follow-up process handled by sales teams",
      "No CRM integration for WhatsApp conversations",
      "Lost opportunities during weekends or non-working hours",
      "No delivery, read or response tracking",
      "Inconsistent communication across sales executives",
    ],
    solutions: [
      "Official WhatsApp Business API setup",
      "Meta-approved message template creation",
      "CRM and website lead integration",
      "Automated lead assignment to sales teams",
      "Instant enquiry notifications from website and campaigns",
      "Follow-up reminder workflows",
      "Delivery, read and response tracking",
      
    ],
    features: [
      "Approved WhatsApp templates",
      "Automated enquiry replies",
      "Lead alerts from website forms",
      "CRM integration",
      "Google Sheet integration",
      "Follow-up reminders",
      "Delivery and read reports",
    ],
    deliverables: [
      "Approved template message structure",
      "Welcome message workflow",
      "Reminder message workflow",
      "Follow-up message workflow",
      "Lead alert integration",
      "CRM or Google Sheet connection",
      "Basic reporting structure",
    ],
   
    businessImpact: [
      "Faster lead response time",
      "Better lead-to-site-visit conversion",
      "Improved buyer confidence",
      "Higher sales team productivity",
      "Reduced enquiry leakage",
      "Clearer follow-up tracking",
      "Improved campaign ROI",
      "More scalable customer communication",
    ],
  
    relatedServices: [
      "CRM Integration",
      "Website Lead Capture",
      "Google Ads",
      "Meta Ads",
      "Lead Management",
      "Automation",
    ],
    flow: [
      "Website Lead",
      "CRM",
      "WhatsApp Alert",
      "Automated Follow-up",
      "Site Visit",
    ],
    outcome:
      "A faster and more reliable communication system that helps your sales team respond quickly, nurture leads properly and convert more enquiries into site visits.",
  },

  {
    id: "google-sheet-automations",
    icon: <FaTable />,
    label: "GOOGLE SHEET AUTOMATIONS",
    title: "Turn Google Sheets into an Automated Business Workflow",

    what:
      "Google Sheet Automations connect your spreadsheets with WhatsApp, email, CRM, forms and other business tools. Every new row, update or status change can automatically trigger actions without manual effort.",

    why:
      "Many businesses already manage enquiries in Google Sheets. Instead of manually sending messages or updating customers, automation ensures every lead receives timely communication and your team spends less time on repetitive tasks.",

    problems: [
      "Manual lead updates",
      "Delayed follow-ups",
      "Repeated data entry",
      "Human errors",
      "No automatic notifications",
      "Sales team dependency",
      "No workflow automation",
      "Missed customer communication",
    ],

    solutions: [
      "Automatic WhatsApp messages",
      "Email triggers",
      "CRM synchronization",
      "Lead assignment workflows",
      "Google Form integration",
      "Status-based automation",
      "Reminder automation",
      "Reporting dashboards",
    ],

    features: [
      "Google Sheets",
      "WhatsApp Integration",
      "Email Automation",
      "CRM Sync",
      "Google Forms",
      "Workflow Triggers",
      "Notifications",
    ],

    deliverables: [
      "Automation workflow",
      "Google Sheet integration",
      "Message templates",
      "Notification setup",
      "CRM connectivity",
      "Reporting dashboard",
    ],

    businessImpact: [
      "Less manual work",
      "Faster response time",
      "Improved lead tracking",
      "Reduced human errors",
      "Higher productivity",
      "Better customer experience",
    ],

    relatedServices: [
      "WhatsApp API",
      "CRM",
      "Email Marketing",
      "Automation",
      "Website Forms",
    ],

    flow: [
      "Google Form",
      "Google Sheet",
      "Automation",
      "WhatsApp",
      "CRM",
      "Sales Team",
    ],

    outcome:
      "An automated workflow that turns Google Sheets into a practical lead-management and communication engine.",
  },

  {
    id: "email-marketing",
    icon: <FaEnvelopeOpenText />,
    label: "EMAIL MARKETING",
    title: "Nurture Leads Through Personalized Email Automation",
    what:
      "Email Marketing enables businesses to build long-term relationships with prospects through personalized campaigns, newsletters, project updates, event invitations and automated lead nurturing journeys. Every interaction is measurable, allowing businesses to understand customer engagement and continuously improve communication strategies.",

    why:
      "Most real estate buyers do not make an immediate purchase decision. They compare multiple projects, locations and builders before making a final choice. Consistent email communication keeps your project visible throughout this decision-making journey and significantly improves buyer trust and recall.",

    problems: [
      "One-time communication after enquiry",
      "Leads forget your project",
      "No structured nurturing journey",
      "Manual email sending",
      "Poor customer engagement",
      "No campaign tracking",
      "Low brochure downloads",
      "Missed remarketing opportunities",
    ],

    solutions: [
      "Automated email workflows",
      "Project launch campaigns",
      "Personalized customer journeys",
      "Lead segmentation",
      "Brochure delivery automation",
      "Event invitation campaigns",
      "Email performance tracking",
      "CRM integrated communication",
    ],

    features: [
      "Responsive email templates",
      "Automation workflows",
      "Project announcements",
      "Open tracking",
      "Click tracking",
      "Campaign reports",
      "A/B testing",
    ],

    deliverables: [
      "Email automation setup",
      "Lead nurturing workflow",
      "Project newsletter template",
      "Brochure email sequence",
      "Site visit reminder emails",
      "Customer engagement reports",
      "Performance dashboard",
   
    ],

   

    businessImpact: [
      "Better long-term customer relationships",
      "Improved enquiry conversion",
      "Higher email engagement",
      "More repeat interactions",
      "Increased project awareness",
      "Better marketing efficiency",
      "Improved lead quality",
      "Measurable campaign performance",
    ],

   
    relatedServices: [
      "Website Development",
      "CRM Integration",
      "Lead Management",
      "Marketing Automation",
      "WhatsApp API",
      "Google Ads",
    ],

    flow: [
      "Lead Capture",
      "Email List",
      "Automation Workflow",
      "Customer Engagement",
      "Sales Follow-up",
    ],

    outcome:
      "Create meaningful customer relationships through automated communication that keeps buyers engaged until they are ready to make a purchasing decision.",
  },

  {
    id: "ivr-voice",
    icon: <FaPhoneAlt />,
    label: "IVR & VOICE SOLUTIONS",
    title: "Professional Call Management & Intelligent Voice Routing",

    what:
      "IVR and Voice Solutions help businesses professionally manage incoming customer calls through automated routing, virtual numbers, department-wise call distribution, call recording and campaign-wise tracking. Every enquiry is captured, monitored and assigned to the appropriate sales representative.",

    why:
      "Even in today's digital world, phone calls remain one of the highest-intent enquiry sources. Missing calls or routing them incorrectly results in lost business opportunities. A professional IVR system ensures every enquiry receives immediate attention while providing management complete visibility into sales communication.",

    problems: [
      "Missed customer calls",
      "No department-wise routing",
      "Manual call transfers",
      "No call recordings",
      "No campaign tracking",
      "Sales executives unavailable",
      "No call reports",
      "Poor customer experience",
    ],

    solutions: [
      "Professional IVR setup",
      "Smart call routing",
      "Virtual business numbers",
      "Department extensions",
      "Call recording support",
      "Campaign-wise call tracking",
      "CRM integration",
     
    ],

    features: [
      "Toll-Free Numbers",
      "Virtual Numbers",
      "Call Routing",
      "Call Recording",
      "Call Analytics",
      "Department Extensions",
      "CRM Connectivity",
    ],

    deliverables: [
      "IVR setup",
      "Call flow planning",
      "Department routing",
      "Virtual number configuration",
      "Call recording support",
      "Analytics dashboard",
      "Campaign source tracking",
    ],

    

    businessImpact: [
      "Higher enquiry conversion",
      "Improved customer satisfaction",
      "Professional communication",
      "Sales productivity improvement",
      "Campaign performance visibility",
      "Better lead management",
      "Reduced missed opportunities",
      "Improved operational efficiency",
    ],

   

    relatedServices: [
      "CRM",
      "WhatsApp API",
      "Email Marketing",
      "Lead Management",
      "Marketing Automation",
      "Analytics Dashboard",
    ],

    flow: [
      "Incoming Call",
      "IVR Menu",
      "Department Routing",
      "Sales Executive",
      "CRM & Follow-up",
    ],

    outcome:
      "A structured communication system that captures every customer enquiry, improves response efficiency and provides complete visibility into business conversations.",
  },


  {
    id: "integrations",
    icon: <FaPlug />,
    label: "BUSINESS INTEGRATIONS",
    title: "Connect Your Business Systems into One Workflow",

    what:
      "Integrations connect websites, CRM platforms, Google Sheets, WhatsApp, email tools, forms and third-party applications into one connected ecosystem where information can move automatically.",

    why:
      "Disconnected systems create duplicate work, delayed communication and inconsistent customer experiences. Integration helps teams maintain accurate information and run faster workflows.",

    problems: [
      "Disconnected software",
      "Duplicate data entry",
      "Manual information transfer",
      "Missed updates",
      "Slow workflows",
      "Different customer records",
      "No centralized data flow",
      "Low productivity",
    ],

    solutions: [
      "CRM integrations",
      "Website and form integrations",
      "WhatsApp connectivity",
      "Email platform integration",
      "Google Workspace integration",
      "API integration",
      "Automation workflows",
      "Reporting integration",
    ],

    features: [
      "API Integration",
      "CRM Connectivity",
      "Website Forms",
      "Google Workspace",
      "Email Platforms",
      "Workflow Automation",
      "Data Synchronization",
    ],

    deliverables: [
      "Integration planning",
      "Workflow mapping",
      "API or connector setup",
      "Testing and validation",
      "Deployment support",
      "Basic monitoring setup",
    ],

    businessImpact: [
      "A more consistent data flow",
      "Better team productivity",
      "Faster communication",
      "Reduced manual work",
      "Improved customer experience",
      "More scalable operations",
    ],

    relatedServices: [
      "CRM",
      "Website Development",
      "WhatsApp API",
      "Email Marketing",
      "Automation",
    ],

    flow: [
      "Website",
      "CRM",
      "Google Sheets",
      "WhatsApp",
      "Email",
      "Reports",
    ],

    outcome:
      "A connected business ecosystem where websites, CRM, communication tools and reporting systems work together more efficiently.",
  },
];
const platformItems = [
  {
    icon: <FaDatabase />,
    title: "CRM Ready",
    desc: "Connect WhatsApp, email, IVR and website enquiries with CRM or Google Sheets for organized lead tracking.",
  },
  {
    icon: <FaCogs />,
    title: "Automation Ready",
    desc: "Reduce manual work by automating alerts, reminders, follow-ups and customer communication workflows.",
  },
  {
    icon: <FaWhatsapp />,
    title: "Buyer Friendly",
    desc: "Communicate with buyers through the channels they already use—WhatsApp, email and phone calls.",
  },
  {
    icon: <FaChartPie />,
    title: "Performance Tracking",
    desc: "Measure lead response time, engagement, follow-up status, call activity and conversion quality.",
  },
];

const ecosystemFlow = [
  "Lead Capture",
  "CRM Entry",
  "WhatsApp Alert",
  "Email Nurturing",
  "IVR / Call",
  "Follow-up",
  "Site Visit",
  "Sales Report",
];

const outcomes = [
  "Faster lead response",
  "Lower missed enquiry rate",
  "Better sales team coordination",
  "Improved buyer communication",
  "Higher site visit intent",
  "Clearer campaign attribution",
  "More consistent follow-ups",
  "Measurable lead performance",
];

const industries = [
  "Real Estate",
  "Education",
  "Healthcare",
  "Hospitality",
  "Professional Services",
  "Retail",
  "Finance",
  "Local Businesses",
];

const faqs = [
  {
    q: "Can these products connect with my existing website?",
    a: "Yes. KeyRoutes product solutions can connect with website forms, landing pages, CRM systems, Google Sheets and campaign lead sources.",
  },
  {
    q: "Do you help with WhatsApp template approval?",
    a: "Yes. We help prepare clean WhatsApp template content suitable for Meta approval and business communication.",
  },
  {
    q: "Can I use these products only for real estate?",
    a: "KeyRoutes focuses mainly on real estate, but these product solutions can also support education, healthcare, hospitality and service businesses.",
  },
  {
    q: "Can leads be tracked from Google Ads and Meta Ads?",
    a: "Yes. We can structure workflows to capture lead source, campaign source and follow-up status for better sales reporting.",
  },
];

const ProductSolutions = () => {
  return (
    <main className="kr-ps-page">
      <SEO
        title="Product Solutions | WhatsApp API, Email Marketing, IVR & CRM | KeyRoutes"
        description="Explore KeyRoutes product solutions for real estate lead follow-up including WhatsApp Business API, email marketing, IVR, CRM workflows and automation."
        keywords="WhatsApp Business API real estate, email marketing for builders, IVR for real estate, real estate CRM automation, lead follow-up automation, real estate product solutions"
        canonical="https://keyroutes.in/product-solutions"
        schema={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: "KeyRoutes Product Solutions",
          brand: {
            "@type": "Brand",
            name: "KeyRoutes",
          },
          description:
            "Product solutions for WhatsApp API, email marketing, IVR, CRM automation and real estate lead management.",
        }}
      />

      <section className="kr-ps-hero">
        <div className="kr-ps-bg"></div>

        <div className="kr-ps-container">
          <div className="kr-ps-breadcrumb">
            <Link to="/">Home</Link> <span>›</span>
            <Link to="/products">Products</Link> <span>›</span> Product Solutions
          </div>

          <span>PRODUCT SOLUTIONS</span>

          <h1>
            Business Communication & Automation Solutions for{" "}
            <strong>Lead Follow-up and Sales Growth.</strong>
          </h1>

          <p>
            Explore WhatsApp API, Google Sheet automation, email marketing, IVR and integrations built to help
            real estate businesses respond faster, track leads better, reduce
            missed enquiries and improve enquiry-to-site-visit conversion.
          </p>

          <div className="kr-ps-actions">
            <a href="#whatsapp-business-api">WhatsApp API</a>
            <a href="#google-sheet-automations">Google Sheets</a>
            <a href="#email-marketing">Email Marketing</a>
            <a href="#ivr-voice">IVR & Voice</a>
            <a href="#integrations">Integrations</a>
          </div>
        </div>
      </section>

      <section className="kr-ps-intro">
        <div className="kr-ps-container kr-ps-intro-grid">
          <div>
            <span>WHY PRODUCT SOLUTIONS MATTER</span>
            <h2>Real Estate Growth Needs Faster Communication.</h2>
          </div>

          <p>
            Enquiries are valuable only when they are handled quickly and
            consistently. KeyRoutes product solutions help connect website leads,
            campaign leads, calls, WhatsApp messages, email campaigns and
            follow-ups into one structured communication system.
          </p>
        </div>

        <div className="kr-ps-container">
          <div className="kr-ps-platform-grid">
            {platformItems.map((item, index) => (
              <div className="kr-ps-platform-card" key={index}>
                <div>{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="kr-ps-ecosystem">
        <div className="kr-ps-container">
          <div className="kr-ps-head center">
            <span>PRODUCT ECOSYSTEM</span>
            <h2>
              From Lead Capture to <strong>Sales Follow-up</strong>
            </h2>
            <p>
              These product solutions work together to create a complete buyer
              communication route from first enquiry to final sales action.
            </p>
          </div>

          <div className="kr-ps-ecosystem-grid">
            {ecosystemFlow.map((item, index) => (
              <div className="kr-ps-ecosystem-card" key={index}>
                <span>0{index + 1}</span>
                <h3>{item}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
            <section className="kr-ps-deep">
        <div className="kr-ps-container">
          {productData.map((item, index) => (
            <div
              className={`kr-ps-block ${index % 2 !== 0 ? "reverse" : ""}`}
              id={item.id}
              key={item.id}
            >
              <div className="kr-ps-content">
                <div className="kr-ps-icon">{item.icon}</div>
                <span>{item.label}</span>
                <h2>{item.title}</h2>

                <div className="kr-ps-explain">
                  <h3>What is it?</h3>
                  <p>{item.what}</p>

                  <h3>Why do you need it?</h3>
                  <p>{item.why}</p>

                  <h3>Expected outcome</h3>
                  <p>{item.outcome}</p>
                </div>

                <div className="kr-ps-flow">
                  {item.flow.map((step, i) => (
                    <div className="kr-ps-flow-item" key={i}>
                      <span>{i + 1}</span>
                      <p>{step}</p>
                    </div>
                  ))}
                </div>

                <div className="kr-ps-related">
                  <h3>Frequently Integrated With</h3>
                  <div>
                    {item.relatedServices.map((service, i) => (
                      <small key={i}>{service}</small>
                    ))}
                  </div>
                </div>

                <Link to="/success-stories" className="kr-ps-link">
                  View Related Success Stories <FaArrowRight />
                </Link>
              </div>

              <div className="kr-ps-side">
                <div className="kr-ps-list danger">
                  <h3>If ignored, what happens?</h3>
                  {item.problems.map((point, i) => (
                    <p key={i}>
                      <FaTimesCircle /> {point}
                    </p>
                  ))}
                </div>

                <div className="kr-ps-list success">
                  <h3>How KeyRoutes helps</h3>
                  {item.solutions.map((point, i) => (
                    <p key={i}>
                      <FaCheckCircle /> {point}
                    </p>
                  ))}
                </div>

                <div className="kr-ps-bottom-grid">
  <div className="kr-ps-mini-box">
    <h3>Key Features</h3>

    {item.features.map((point, i) => (
      <p key={i}>
        ✓ {point}
      </p>
    ))}
  </div>

  <div className="kr-ps-mini-box">
    <h3>What You Receive</h3>

    {item.deliverables.map((point, i) => (
      <p key={i}>
        ✓ {point}
      </p>
    ))}
  </div>
</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="kr-ps-outcomes">
        <div className="kr-ps-container">
          <div className="kr-ps-head center">
            <span>BUSINESS OUTCOMES</span>
            <h2>
              What Product Automation Helps <strong>Improve</strong>
            </h2>
            <p>
              Product solutions are not only about tools. They help improve
              response speed, visibility, follow-up discipline and measurable
              sales performance.
            </p>
          </div>

          <div className="kr-ps-outcome-grid">
            {outcomes.map((item, index) => (
              <div className="kr-ps-outcome-card" key={index}>
                <FaCheckCircle />
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="kr-ps-industries">
        <div className="kr-ps-container">
          <div className="kr-ps-head center">
            <span>BEST FIT INDUSTRIES</span>
            <h2>
              Built for Real Estate, Useful for <strong>Lead-Driven Businesses</strong>
            </h2>
          </div>

          <div className="kr-ps-industry-grid">
            {industries.map((item, index) => (
              <div className="kr-ps-industry-card" key={index}>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="kr-ps-faq">
        <div className="kr-ps-container">
          <div className="kr-ps-head center">
            <span>FAQS</span>
            <h2>
              Product Solution <strong>Questions</strong>
            </h2>
          </div>

          <div className="kr-ps-faq-grid">
            {faqs.map((item, index) => (
              <div className="kr-ps-faq-card" key={index}>
                <h3>{item.q}</h3>
                <p>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="kr-ps-cta">
        <div className="kr-ps-container">
          <h2>Want to Automate Your Lead Follow-up?</h2>
          <p>
            Let’s review your current enquiry process and suggest the right
            WhatsApp, email, IVR and CRM automation setup.
          </p>

          <a
            href="https://wa.me/918309436998"
            target="_blank"
            rel="noreferrer"
          >
            Ask for Product Demo ›
          </a>
        </div>
      </section>
    </main>
  );
};

export default ProductSolutions;