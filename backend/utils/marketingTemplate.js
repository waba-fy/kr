const escape = (value = '') => String(value).replace(/[&<>"']/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[char]));
const renderMarketingTemplate = (template) => {
  let button = '';
  if (template.buttonLabel && template.buttonUrl) {
    const url = new URL(template.buttonUrl);
    if (!['https:', 'http:'].includes(url.protocol)) throw new Error('Use an HTTP or HTTPS button URL.');
    button = `<p style="margin:28px 0"><a href="${escape(url.href)}" style="background:#e10600;color:#fff;text-decoration:none;padding:13px 22px;border-radius:6px;display:inline-block">${escape(template.buttonLabel)}</a></p>`;
  }
  return `<!doctype html><html><body style="margin:0;background:#f5f6f8;font-family:Arial,sans-serif;color:#171717"><table role="presentation" width="100%"><tr><td align="center" style="padding:28px 12px"><table role="presentation" width="100%" style="max-width:600px;background:#fff;border-radius:12px;${template.style === 'minimal' ? '' : 'border-top:4px solid #e10600;'}"><tr><td style="padding:32px"><img src="https://keyroutes.co/key-routes-logo.png" width="180" alt="KeyRoutes" style="max-width:100%;height:auto">${template.imageUrl ? `<img src="${escape(template.imageUrl)}" width="536" alt="" style="display:block;width:100%;height:auto;margin-top:24px;border-radius:8px">` : ""}<h1 style="font-size:28px;line-height:1.3;margin-top:28px">${escape(template.headline)}</h1>${String(template.body).split(/\n\s*\n/).map(paragraph => `<p style="line-height:1.7;color:#555">${escape(paragraph).replace(/\n/g, '<br>')}</p>`).join('')}${button}<p style="font-size:11px;color:#888">KeyRoutes · A product of Sixedge Innovations</p></td></tr></table></td></tr></table></body></html>`;
};
module.exports = { renderMarketingTemplate };
