import { newContentFromTemplate } from "../components/admin/contentTemplate.mjs";
import { defaultContentFor } from "../components/admin/contentDefaults";
import Invoices from "../components/common/Invoices";
import SupportTickets from "../components/common/SupportTickets";
import MarketingTemplates from "../components/admin/MarketingTemplates";
import PasswordRecovery from "../components/common/PasswordRecovery";
import keyRoutesLogo from "../assets/key-routes-logo.png";
import { useCallback, useEffect, useMemo, useState } from "react";
import StructuredContentEditor from "../components/admin/StructuredContentEditor";
import AdminClients from "../components/admin/AdminClients";
import "../styles/admin.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const sections = ["case-studies", "success-stories", "client-stories", "reviews", "services", "strategy", "products", "about", "careers", "site-settings"];
const navItems = ["dashboard", "clients", "content", "leads", "subscribers", "careers", "jobs", "reports", "support-reports", "tickets", "invoices", "emails", "marketing", "admins", "settings"];
const statuses = {
  leads: ["New", "Contacted", "Qualified", "Converted", "Closed"],
  subscribers: ["Active", "Unsubscribed", "Blocked", "Pending"],
  careers: ["New", "Reviewed", "Shortlisted", "Interview", "Rejected", "Hired"],
  "support-reports": ["New", "In Progress", "Resolved", "Closed"],
};

const initialAdmin = { name: "", email: "", password: "", role: "Admin" };
const initialJob = { title: "", department: "", location: "Hyderabad / Remote", employmentType: "Full Time", workMode: "Hybrid", summary: "", skills: "", openings: 1, status: "Draft" };
const emptySettings = { site: { companyName: "KeyRoutes", legalName: "Sixedge Innovations", websiteUrl: "https://keyroutes.co", supportEmail: "", phone: "", whatsapp: "", address: "", city: "", region: "", postalCode: "", country: "India", facebook: "", instagram: "", linkedin: "", youtube: "", x: "", defaultTitle: "", defaultDescription: "", defaultOgImage: "", robotsIndex: true, googleTagManagerId: "", googleAnalyticsId: "", searchConsoleVerification: "" }, email: { smtpHost: "smtp.gmail.com", smtpPort: 465, smtpSecure: true, smtpUser: "", smtpPassword: "", fromName: "KeyRoutes", fromEmail: "", adminEmail: "" } };

const Admin = () => {
  const [emailPreview, setEmailPreview] = useState("");
  const [marketingRecipients, setMarketingRecipients] = useState([]);
  const [subscriberFilter, setSubscriberFilter] = useState("All");
  const [recovering, setRecovering] = useState(false);
  const [token, setToken] = useState(() => localStorage.getItem("kr_admin_token") || "");
  const [admin, setAdmin] = useState(null);
  const [view, setView] = useState("dashboard");
  const [items, setItems] = useState([]);
  const [stats, setStats] = useState(null);
  const [settings, setSettings] = useState(emptySettings);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [section, setSection] = useState("case-studies");
  const [editing, setEditing] = useState(null);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [newAdmin, setNewAdmin] = useState(initialAdmin);
  const [newJob, setNewJob] = useState(initialJob);
  const [selectedReport, setSelectedReport] = useState(null);
  const [reportResult, setReportResult] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [bulkStatus, setBulkStatus] = useState("");
  const [actionBusy, setActionBusy] = useState(false);
  const selectable = ["leads", "subscribers"].includes(view);
  const selectedItems = items.filter((item) => selectedIds.includes(item._id));
  const toggleSelection = (id) => setSelectedIds((ids) => ids.includes(id) ? ids.filter((value) => value !== id) : [...ids, id]);
  const [reportForm, setReportForm] = useState(() => {
    const to = new Date(); const from = new Date(to.getTime() - 30 * 86400000);
    return { from: from.toISOString().slice(0,10), to: to.toISOString().slice(0,10), name: "" };
  });

  const request = useCallback(async (path, options = {}) => {
    const response = await fetch(`${API_URL}/admin${path}`, {
      ...options,
      headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}), ...options.headers },
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(result.message || "Request failed.");
    return result;
  }, [token]);

  const load = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setSelectedIds([]);
    setMessage("");
    try {
      const me = await request("/auth/me");
      setAdmin(me.data);
      if (view === "dashboard") setStats((await request("/dashboard")).data);
      else if (["clients", "marketing", "tickets", "invoices"].includes(view)) setItems([]);
      else if (view === "content") setItems((await request(`/content?section=${section}`)).data);
      else if (view === "emails") setItems((await request("/emails/logs?limit=100")).data);
      else if (view === "jobs") setItems((await request("/jobs/manage")).data);
      else if (view === "reports") setItems((await request("/reports/generated")).data);
      else if (view === "subscribers") setItems((await request(`/subscribers?limit=100${subscriberFilter === "All" ? "" : `&status=${encodeURIComponent(subscriberFilter)}`}`)).data);
      else if (view === "support-reports") setItems((await request("/reports?limit=100")).data);
      else if (view === "settings") setSettings((await request("/settings/manage")).data);
      else setItems((await request(`/${view}?limit=100`)).data);
    } catch (error) {
      setMessage(error.message);
      if (/token|session|authenticate|password changed/i.test(error.message)) {
        localStorage.removeItem("kr_admin_token");
        setToken("");
      }
    } finally { setLoading(false); }
  }, [request, section, subscriberFilter, token, view]);

  useEffect(() => {
    const timer = window.setTimeout(load, 0);
    return () => window.clearTimeout(timer);
  }, [load]);

  const login = async (event) => {
    event.preventDefault(); setLoading(true); setMessage("");
    try {
      const response = await fetch(`${API_URL}/admin/auth/login`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(credentials) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);
      localStorage.setItem("kr_admin_token", result.data.token);
      setAdmin(result.data.admin); setToken(result.data.token);
    } catch (error) { setMessage(error.message); }
    finally { setLoading(false); }
  };

  const run = async (operation, success) => {
    setActionBusy(true);
    try { await operation(); await load(); setMessage(success); }
    catch (error) { setMessage(error.message); }
    finally { setActionBusy(false); }
  };

  const updateStatus = (resource, item, status) => run(
    () => request(`/${resource}/${item._id}`, { method: "PATCH", body: JSON.stringify({ status }) }),
    "Status updated successfully."
  );

  const deleteRecord = (resource, item) => {
    if (!window.confirm(`Permanently delete ${item.name || item.email || "this record"}? This cannot be undone.`)) return;
    run(() => request(`/${resource}/${item._id}`, { method: "DELETE" }), "Record permanently deleted.");
  };

  const saveContent = async (event) => {
    event.preventDefault();
    try {
      const data = editing.data;
      if (editing._id) await request(`/content/${editing._id}`, { method: "PATCH", body: JSON.stringify({ title: editing.title, data, isActive: editing.isActive === true }) });
      else await request("/content", { method: "POST", body: JSON.stringify({ section, key: editing.key, title: editing.title, data, isActive: editing.isActive === true, sortOrder: items.length }) });
      setEditing(null); setMessage("Content saved successfully."); await load();
    } catch (error) { setMessage(error.message); }
  };

  const createAdmin = (event) => {
    event.preventDefault();
    run(async () => { await request("/admins", { method: "POST", body: JSON.stringify(newAdmin) }); setNewAdmin(initialAdmin); }, "Admin created successfully.");
  };

  const createJob = (event) => {
    event.preventDefault();
    const payload = { ...newJob, skills: newJob.skills.split(",").map((value) => value.trim()).filter(Boolean) };
    run(async () => { await request("/jobs/manage", { method: "POST", body: JSON.stringify(payload) }); setNewJob(initialJob); }, "Job created successfully.");
  };

  const saveSettings = (kind) => run(
    () => request(`/settings/${kind}`, { method: "PATCH", body: JSON.stringify(settings[kind]) }),
    `${kind === "site" ? "Site integrations" : "Email settings"} saved successfully.`
  );

  const exportCsv = (rows = items) => {
    if (!rows.length) return;
    const keys = Array.from(new Set(rows.flatMap((item) => Object.keys(item).filter((key) => !["__v", "ipAddress", "userAgent"].includes(key)))));
    const escape = (value) => `"${String(value ?? "").replaceAll('"', '""')}"`;
    const csv = [keys.map(escape).join(","), ...rows.map((item) => keys.map((key) => escape(typeof item[key] === "object" ? JSON.stringify(item[key]) : item[key])).join(","))].join("\n");
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    link.download = `keyroutes-${view}-${new Date().toISOString().slice(0,10)}.csv`;
    link.click(); URL.revokeObjectURL(link.href);
  };

  const bulkAction = async (kind) => {
    const rows = selectedItems;
    if (!rows.length || actionBusy || (kind === "status" && !bulkStatus)) return;
    if (kind === "delete" && !window.confirm(`Permanently delete ${rows.length} selected ${view}? This cannot be undone.`)) return;
    setActionBusy(true);
    const failed = [];
    let failureMessage = "";
    for (const item of rows) {
      try {
        await request(`/${view}/${item._id}`, kind === "delete"
          ? { method: "DELETE" }
          : { method: "PATCH", body: JSON.stringify({ status: bulkStatus }) });
      } catch (error) { failed.push(item._id); failureMessage = error.message; }
    }
    await load();
    setSelectedIds(failed);
    setActionBusy(false);
    setMessage(`${rows.length - failed.length} of ${rows.length} records ${kind === "delete" ? "deleted" : "updated"}.${failed.length ? ` ${failed.length} failed: ${failureMessage}` : ""}`);
  };

  const generateReport = async (save = false) => {
    if (actionBusy) return;
    if (!reportForm.from || !reportForm.to || reportForm.from > reportForm.to) {
      setMessage("Please select a valid report date range."); return;
    }
    setActionBusy(true); setMessage("");
    try {
      const result = await request("/reports/generate", { method: "POST", body: JSON.stringify({ ...reportForm, save }) });
      setReportResult(result.data);
      if (save) await load();
      setMessage(save ? "Report generated and saved." : "Report preview generated successfully.");
    } catch (error) { setMessage(error.message); }
    finally { setActionBusy(false); }
  };

  const exportManagementReport = () => {
    if (!reportResult) return;
    const rows = [["Metric","Value"], ...Object.entries(reportResult.totals), ...Object.entries(reportResult.rates).map(([key,value]) => [`${key}Rate`, `${value}%`])];
    const csv = rows.map((row) => row.map((value) => `"${String(value).replaceAll('"','""')}"`).join(",")).join("\n");
    const link = document.createElement("a"); link.href = URL.createObjectURL(new Blob([csv],{type:"text/csv"})); link.download = `keyroutes-management-report-${new Date(reportResult.period.from).toISOString().slice(0,10)}-${new Date(reportResult.period.to).toISOString().slice(0,10)}.csv`; link.click(); URL.revokeObjectURL(link.href);
  };

  const columns = useMemo(() => ({
    leads: ["name", "email", "fullPhone", "company", "service", "status", "createdAt"],
    subscribers: ["email", "name", "status", "subscribedAt"],
    careers: ["name", "email", "phone", "role", "status", "createdAt"],
    "support-reports": ["name", "email", "issueType", "status", "createdAt"],
    emails: ["to", "subject", "type", "status", "errorMessage", "openedAt", "openCount", "clickedAt", "clickCount", "sentAt"],
    admins: ["name", "email", "role", "isActive", "lastLoginAt"],
    jobs: ["title", "department", "location", "employmentType", "status", "isFeatured"],
  })[view] || [], [view]);

  if (!token && recovering) return <main className="kr-admin-login"><div className="kr-recovery-card"><img className="kr-portal-login-logo" src={keyRoutesLogo} alt="KeyRoutes" /><PasswordRecovery apiUrl={API_URL} portal="admin" initialEmail={credentials.email} onClose={() => setRecovering(false)} /></div></main>;
  if (!token) return <main className="kr-admin-login"><form onSubmit={login} className="kr-admin-login-card"><img className="kr-portal-login-logo" src={keyRoutesLogo} alt="KeyRoutes" />
    <span>KEYROUTES CONTROL CENTER</span><h1>Admin sign in</h1><p>Manage website content, leads, subscribers, careers and email engagement.</p>
    <label>Email<input type="email" required value={credentials.email} onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}/></label>
    <label>Password<input type="password" required value={credentials.password} onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}/></label>
    {message && <div className="kr-admin-alert">{message}</div>}<button disabled={loading}>{loading ? "Signing in…" : "Sign in securely"}</button><button type="button" className="kr-recovery-link" onClick={() => setRecovering(true)}>Forgot password?</button>
  </form></main>;

  const visibleNav = navItems.filter((item) => !["admins", "settings", "invoices"].includes(item) || admin?.role === "Super Admin");
  return <main className="kr-admin-shell">
    <aside className="kr-admin-sidebar"><div><img className="kr-portal-logo" src={keyRoutesLogo} alt="KeyRoutes" /><small>Admin Dashboard</small></div>
      <nav>{visibleNav.map((item) => <button key={item} className={view === item ? "active" : ""} onClick={() => { setView(item); setEditing(null); setSelectedIds([]); setBulkStatus(""); }}>{item === "support-reports" ? "Report a problem" : item === "tickets" ? "Support tickets" : item}</button>)}</nav>
      <div className="kr-admin-user"><span>{admin?.name}</span><small>{admin?.role}</small><button onClick={() => { localStorage.removeItem("kr_admin_token"); setToken(""); }}>Sign out</button></div>
    </aside>
    <section className="kr-admin-main"><header><div><span>CONTROL CENTER</span><h1>{view === "support-reports" ? "Report a problem" : view === "tickets" ? "Support tickets" : view}</h1></div><button onClick={load} disabled={loading || actionBusy}>Refresh</button></header>
      {message && <div className="kr-admin-alert">{message}</div>}{loading && <div className="kr-admin-loading">Loading latest data…</div>}

      {view === "dashboard" && stats && <div className="kr-admin-stats">
        <button type="button" className="kr-admin-stat-card kr-admin-client-stat" onClick={() => setView("clients")}><small>Clients</small><strong>{stats.clients?.total || 0}</strong><span>{stats.clients?.active || 0} active · {stats.clients?.inactive || 0} inactive · {stats.clients?.landingPages || 0} landing pages</span><em>Manage clients →</em></button>
        {[["Leads",stats.leads,"leads"],["Subscribers",stats.subscribers,"subscribers"],["Applications",stats.applications,"careers"],["Active jobs",stats.jobs,"jobs"],["Report a problem",stats.reports,"support-reports"],["Content",stats.content,"content"],["Active admins",stats.admins,"admins"],["Emails sent",stats.emails.sent,"emails"],["Emails opened",stats.emails.opened,"emails"],["Links clicked",stats.emails.clicked,"emails"],["Support tickets",stats.ticketCount || 0,"tickets"],["Marketing templates",stats.templateCount || 0,"marketing"],["Unsubscribed",stats.unsubscribedCount || 0,"subscribers"]].map(([label,value,target]) => <button type="button" className="kr-admin-stat-card" key={label} onClick={() => { if(label === "Unsubscribed") setSubscriberFilter("Unsubscribed"); setView(target); }}><small>{label}</small><strong>{value}</strong><span>Open section →</span></button>)}
        {admin?.role === "Super Admin" && <><button className="kr-admin-stat-card" onClick={()=>setView("invoices")}><small>Pending invoices</small><strong>{stats.pendingInvoiceCount || 0}</strong><span>Open invoices →</span></button><button className="kr-admin-stat-card" onClick={()=>setView("settings")}><small>Site and email settings</small><strong>Configure</strong><span>Open settings →</span></button></>}
        <div className="kr-admin-note">Email opens are approximate because Gmail may proxy images. Link clicks are a stronger signal.</div>
      </div>}

      {view === "invoices" && admin?.role === "Super Admin" && <Invoices request={request} admin />}
      {view === "tickets" && <SupportTickets request={request} admin />}
      {view === "marketing" && <MarketingTemplates request={request} notify={setMessage} initialRecipients={marketingRecipients} />}
      {view === "subscribers" && <div className="kr-subscriber-tabs" role="tablist" aria-label="Subscriber status">{["All","Active","Unsubscribed","Blocked","Pending"].map(status=><button role="tab" aria-selected={subscriberFilter===status} className={subscriberFilter===status?"active":""} key={status} onClick={()=>{setSubscriberFilter(status);setSelectedIds([]);}}>{status}</button>)}</div>}
      {view === "clients" && <AdminClients request={request} notify={setMessage} />}

      {view === "content" && <><div className="kr-admin-toolbar"><select value={section} onChange={(e) => { if (e.target.value === "site-settings") { setView("settings"); return; } setEditing(null); setItems([]); setLoading(true); setSection(e.target.value); }}>{sections.map((value) => <option key={value} disabled={value === "site-settings" && admin?.role !== "Super Admin"}>{value}</option>)}</select><button disabled={loading} onClick={() => setEditing(newContentFromTemplate(items[0]?.data || defaultContentFor(section), items[0]?._id || ""))}>Add new item</button></div>
        <div className="kr-admin-cards">{items.map((item) => <article key={item._id}><div><small>{item.key}</small><h3>{item.title}</h3><span className={item.isActive ? "on" : "off"}>{item.isActive ? "Published" : "Disabled"}</span></div><div><button onClick={() => setEditing({ ...item, data: structuredClone(item.data) })}>Edit fields</button><label className="kr-admin-check"><input type="checkbox" aria-label={`Visible on website: ${item.title}`} checked={item.isActive === true} disabled={loading || actionBusy} onChange={(event) => { const visible = event.target.checked; run(() => request(`/content/${item._id}`, { method: "PATCH", body: JSON.stringify({ isActive: visible }) }), visible ? "Content is now visible on the website." : "Content is hidden from the website. Its data is kept."); }}/><span>Visible on website</span></label></div></article>)}</div>
        {editing && <div className="kr-admin-modal kr-admin-content-modal"><form onSubmit={saveContent}><h2>{editing._id ? "Edit content" : "Add content"}</h2>{!editing._id && <><p>The fields below match an existing item in this section. Values are blank so you can enter the new client’s content, including IDs, slugs and image URLs.</p>{items.length > 0 && <label>Use fields from<select value={editing.sourceKey || ""} onChange={(event) => { const source = items.find(item => item._id === event.target.value); if (source && window.confirm("Replace the new item’s fields with this template? Unsaved values will be cleared.")) setEditing(newContentFromTemplate(source.data, source._id)); }}>{items.map(item => <option key={item._id} value={item._id}>{item.title || item.key}</option>)}</select></label>}</>}{!editing._id && <label>Unique key<input required value={editing.key} onChange={(e) => setEditing({ ...editing, key: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-") })}/></label>}<label>Admin title<input required value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })}/></label><label className="kr-admin-check"><input type="checkbox" checked={editing.isActive === true} onChange={(event) => setEditing({ ...editing, isActive: event.target.checked })}/><span>Visible on website</span></label><p>{editing.isActive ? "This item will be published when you save." : "This item will stay hidden until you select Visible on website and save."}</p><StructuredContentEditor key={editing._id || editing.sourceKey || section} value={editing.data} onChange={(data) => setEditing({ ...editing, data })}/><div className="kr-admin-modal-actions"><button type="button" onClick={() => setEditing(null)}>Cancel</button><button>Save changes</button></div></form></div>}</>}

      {view === "admins" && <form className="kr-admin-create" onSubmit={createAdmin}><input placeholder="Name" required value={newAdmin.name} onChange={(e) => setNewAdmin({...newAdmin,name:e.target.value})}/><input placeholder="Email" type="email" required value={newAdmin.email} onChange={(e) => setNewAdmin({...newAdmin,email:e.target.value})}/><input placeholder="Strong password" type="password" required value={newAdmin.password} onChange={(e) => setNewAdmin({...newAdmin,password:e.target.value})}/><select value={newAdmin.role} onChange={(e) => setNewAdmin({...newAdmin,role:e.target.value})}><option>Admin</option><option>Super Admin</option></select><button>Create admin</button></form>}
      {view === "jobs" && <form className="kr-admin-create kr-admin-create-job" onSubmit={createJob}>{["title","department","location","employmentType","workMode","summary","skills"].map((field) => <input key={field} placeholder={field === "skills" ? "Skills, comma separated" : field} required={["title","location","employmentType"].includes(field)} value={newJob[field]} onChange={(e) => setNewJob({...newJob,[field]:e.target.value})}/>)}<select value={newJob.status} onChange={(e) => setNewJob({...newJob,status:e.target.value})}><option>Draft</option><option>Active</option><option>Closed</option></select><button>Create job</button></form>}

      {view === "reports" && <div className="kr-admin-report-generator"><section className="kr-admin-report-controls"><h2>Generate management report</h2><p>Build a live report from leads, subscribers, careers, emails, content and jobs.</p><label>From<input type="date" value={reportForm.from} onChange={(e) => setReportForm({...reportForm,from:e.target.value})}/></label><label>To<input type="date" value={reportForm.to} onChange={(e) => setReportForm({...reportForm,to:e.target.value})}/></label><label>Report name<input placeholder="Monthly management report" value={reportForm.name} onChange={(e) => setReportForm({...reportForm,name:e.target.value})}/></label><div><button disabled={actionBusy || loading} onClick={() => generateReport(false)}>{actionBusy ? "Generating…" : "Generate preview"}</button><button disabled={actionBusy || loading} onClick={() => generateReport(true)}>Generate and save</button></div></section>
        {reportResult && <section className="kr-admin-report-output"><header><div><small>MANAGEMENT REPORT</small><h2>{new Date(reportResult.period.from).toISOString().slice(0,10)} to {new Date(reportResult.period.to).toISOString().slice(0,10)}</h2></div><div><button onClick={exportManagementReport}>Export CSV</button><button onClick={() => window.print()}>Print / Save PDF</button></div></header><div className="kr-admin-report-metrics">{Object.entries(reportResult.totals).map(([key,value]) => <article key={key}><small>{key.replace(/([A-Z])/g," $1")}</small><strong>{value}</strong></article>)}</div><h3>Performance rates</h3><div className="kr-admin-report-rates">{Object.entries(reportResult.rates).map(([key,value]) => <article key={key}><span>{key.replace(/([A-Z])/g," $1")}</span><strong>{value}%</strong></article>)}</div>{Object.entries(reportResult.breakdowns).map(([group,values]) => <div className="kr-admin-report-breakdown" key={group}><h3>{group}</h3>{Object.entries(values).map(([status,count]) => <p key={status}><span>{status}</span><strong>{count}</strong></p>)}</div>)}</section>}
        <section className="kr-admin-saved-reports"><h2>Saved reports</h2>{items.length === 0 ? <div className="kr-admin-empty"><h3>No saved reports yet</h3><p>Generate and save a report to keep a permanent snapshot.</p></div> : items.map((item) => <article key={item._id}><div><strong>{item.name}</strong><small>{new Date(item.period.from).toLocaleDateString()} – {new Date(item.period.to).toLocaleDateString()}</small></div><div><button onClick={() => { setReportResult(item.snapshot); setReportForm({...reportForm,from:new Date(item.period.from).toISOString().slice(0,10),to:new Date(item.period.to).toISOString().slice(0,10),name:item.name}); }}>View</button><button className="kr-admin-delete" onClick={() => { if(window.confirm("Delete this saved report?")) run(() => request(`/reports/generated/${item._id}`,{method:"DELETE"}),"Saved report deleted."); }}>Delete</button></div></article>)}</section></div>}

      {["leads","subscribers","careers","support-reports","emails","admins","jobs"].includes(view) && <><div className="kr-admin-list-actions"><button onClick={() => exportCsv()} disabled={loading || actionBusy || !items.length}>Export CSV</button>{selectable && <><span aria-live="polite">{selectedItems.length} selected · {items.length} displayed</span><select aria-label="Bulk status" value={bulkStatus} onChange={(event) => setBulkStatus(event.target.value)} disabled={loading || actionBusy}><option value="">Choose status</option>{statuses[view].map((status) => <option key={status}>{status}</option>)}</select><button disabled={loading || actionBusy || !selectedItems.length || !bulkStatus} onClick={() => bulkAction("status")}>{actionBusy ? "Processing…" : "Apply to selected"}</button><button disabled={!selectedItems.length || loading || actionBusy} onClick={()=>{const kind=view==="leads"?"lead":"subscriber";setMarketingRecipients(selectedItems.map(item=>({...item,kind,key:`${kind}:${item._id}`})));setView("marketing");}}>Send marketing email to selected</button><button disabled={loading || actionBusy || !selectedItems.length} onClick={() => exportCsv(selectedItems)}>Export selected</button>{admin?.role === "Super Admin" && <button className="kr-admin-delete" disabled={loading || actionBusy || !selectedItems.length} onClick={() => bulkAction("delete")}>Delete selected</button>}<small>Select all selects only the displayed records (up to 100).</small></>}</div><div className="kr-admin-table-wrap"><table><thead><tr>{selectable && <th><input type="checkbox" aria-label="Select all displayed records" disabled={loading || actionBusy || !items.length} checked={items.length > 0 && selectedItems.length === items.length} ref={(node) => { if (node) node.indeterminate = selectedItems.length > 0 && selectedItems.length < items.length; }} onChange={(event) => setSelectedIds(event.target.checked ? items.map((item) => item._id) : [])} /></th>}{columns.map((column) => <th key={column}>{column.replace(/([A-Z])/g," $1")}</th>)}{["leads","subscribers","support-reports"].includes(view) && <th>Actions</th>}</tr></thead><tbody>{items.map((item) => <tr key={item._id}>{selectable && <td><input type="checkbox" aria-label={`Select ${item.email || item.name || item._id}`} checked={selectedIds.includes(item._id)} disabled={loading || actionBusy} onChange={() => toggleSelection(item._id)} /></td>}{columns.map((column) => <td key={column}>{column === "status" && statuses[view] ? <select disabled={loading || actionBusy} value={item.status} onChange={(e) => updateStatus(view === "support-reports" ? "reports" : view,item,e.target.value)}>{statuses[view].map((status) => <option key={status}>{status}</option>)}</select> : column === "status" && view === "jobs" ? <select disabled={loading || actionBusy} value={item.status} onChange={(e) => run(() => request(`/jobs/manage/${item._id}`, {method:"PATCH",body:JSON.stringify({status:e.target.value})}),"Job publishing status updated.")}><option>Draft</option><option>Active</option><option>Closed</option></select> : column === "isActive" ? <button onClick={() => run(() => request(`/admins/${item._id}`, {method:"PATCH",body:JSON.stringify({isActive:!item.isActive})}),"Admin access updated.")}>{item.isActive ? "Active" : "Disabled"}</button> : column === "isFeatured" ? (item.isFeatured ? "Yes" : "No") : item[column] !== null && item[column] !== undefined && item[column] !== "" ? (column.endsWith("At") ? new Date(item[column]).toLocaleString() : String(item[column])) : "—"}</td>)}{["leads","subscribers","support-reports"].includes(view) && <td><div className="kr-admin-row-actions">{view === "support-reports" && <button onClick={() => setSelectedReport({...item})}>View</button>}<button className="kr-admin-delete" disabled={loading || actionBusy} onClick={() => deleteRecord(view === "support-reports" ? "reports" : view,item)}>Delete</button></div></td>}</tr>)}</tbody></table></div></>}

      {selectedReport && <div className="kr-admin-modal"><form onSubmit={(event) => { event.preventDefault(); run(() => request(`/reports/${selectedReport._id}`, { method:"PATCH", body:JSON.stringify({ status:selectedReport.status, notes:selectedReport.notes || "" }) }), "Report updated successfully."); setSelectedReport(null); }}><h2>Support report details</h2><div className="kr-admin-report-detail"><p><strong>Name:</strong> {selectedReport.name}</p><p><strong>Email:</strong> {selectedReport.email}</p><p><strong>Issue:</strong> {selectedReport.issueType}</p><p><strong>Page:</strong> {selectedReport.pageUrl || "Not provided"}</p><p className="wide"><strong>Description:</strong><span>{selectedReport.description}</span></p></div><label>Status<select value={selectedReport.status} onChange={(e) => setSelectedReport({...selectedReport,status:e.target.value})}>{statuses["support-reports"].map((status) => <option key={status}>{status}</option>)}</select></label><label>Internal notes<textarea rows="5" value={selectedReport.notes || ""} onChange={(e) => setSelectedReport({...selectedReport,notes:e.target.value})}/></label><div className="kr-admin-modal-actions"><button type="button" onClick={() => setSelectedReport(null)}>Close</button><button>Save report</button></div></form></div>}

      {view === "emails" && admin?.role === "Super Admin" && <section className="kr-email-resend"><h2>Email preview and send again</h2><p>New sent and failed emails keep their content for preview and resend. Marketing opt-outs are checked again. Older logs without saved content cannot be resent.</p>{items.map(item=><div key={item._id}><span>{item.to} · {item.subject}</span><div><button disabled={!item.canResend || actionBusy} onClick={async()=>{try{const result=await request(`/marketing/emails/${item._id}/preview`);setEmailPreview(result.data.html);}catch(error){setMessage(error.message);}}}>Preview</button><button disabled={actionBusy || !item.canResend} title={!item.canResend?"No saved content for this older email":"Resend this email"} onClick={()=>{if(window.confirm(`Send this email again to ${item.to}?`))run(()=>request(`/marketing/emails/${item._id}/resend`,{method:"POST",body:"{}"}),"Email sent again.");}}>Send again</button></div></div>)}</section>}
      {emailPreview && <div className="kr-admin-modal"><section className="kr-email-preview-modal"><button onClick={()=>setEmailPreview("")}>Close preview</button><iframe title="Saved email preview" sandbox="" srcDoc={emailPreview}/></section></div>}
      {view === "settings" && <div className="kr-admin-settings">
        <section><h2>SEO defaults</h2><p>Fallback metadata used when a page has no specific values.</p>{[["defaultTitle","Default page title"],["defaultDescription","Default description"],["defaultOgImage","Default sharing image URL"]].map(([field,label]) => <label key={field}>{label}{field === "defaultDescription" ? <textarea rows="4" value={settings.site?.[field] || ""} onChange={(e) => setSettings({...settings,site:{...settings.site,[field]:e.target.value}})}/> : <input value={settings.site?.[field] || ""} onChange={(e) => setSettings({...settings,site:{...settings.site,[field]:e.target.value}})}/>}</label>)}<label className="kr-admin-check"><input type="checkbox" checked={settings.site?.robotsIndex !== false} onChange={(e) => setSettings({...settings,site:{...settings.site,robotsIndex:e.target.checked}})}/> Allow search engines to index the site</label></section>
        <section><h2>Google integrations</h2><p>Paste only verified IDs or verification values. Scripts are loaded safely by the website.</p>{[["googleTagManagerId","Google Tag Manager ID (GTM-XXXX)"],["googleAnalyticsId","Google Analytics ID (G-XXXX)"],["searchConsoleVerification","Search Console verification value"]].map(([field,label]) => <label key={field}>{label}<input value={settings.site?.[field] || ""} onChange={(e) => setSettings({...settings,site:{...settings.site,[field]:e.target.value}})}/></label>)}<button onClick={() => saveSettings("site")}>Save all site settings</button></section>
        <section><h2>Email and SMTP</h2><p>The app password is encrypted before storage and is never returned to the browser.</p>{[["smtpHost","SMTP host"],["smtpPort","SMTP port"],["smtpUser","SMTP username"],["fromName","Sender name"],["fromEmail","Sender email"],["adminEmail","Default admin recipient"],["smtpPassword","New app password (leave blank to keep current)"]].map(([field,label]) => <label key={field}>{label}<input type={field === "smtpPassword" ? "password" : "text"} value={settings.email?.[field] || ""} onChange={(e) => setSettings({...settings,email:{...settings.email,[field]:e.target.value}})}/></label>)}<label className="kr-admin-check"><input type="checkbox" checked={Boolean(settings.email?.smtpSecure)} onChange={(e) => setSettings({...settings,email:{...settings.email,smtpSecure:e.target.checked}})}/> Use secure SMTP/TLS</label><div className="kr-admin-setting-actions"><button onClick={() => saveSettings("email")}>Save email settings</button><button onClick={() => run(() => request("/settings/email/test",{method:"POST"}),"SMTP connection verified successfully.")}>Test connection</button></div></section>
      </div>}
    </section>
  </main>;
};

export default Admin;
