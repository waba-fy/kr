import { Link } from "react-router-dom";
import SEO from "../components/seo/SEO";
export default function NotFound() { return <main className="container" style={{padding:"80px 24px"}}><SEO title="Page not found" description="The requested KeyRoutes page is unavailable." robots="noindex, follow" /><h1>Page not found</h1><p>This page may have moved or is no longer published.</p><Link to="/">Return to KeyRoutes</Link></main>; }
