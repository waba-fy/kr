const escape = value => String(value ?? '').replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const invoiceEmail = invoice => {
  const paid = invoice.status === 'Paid';
  const title = paid ? 'Thank you for your payment' : 'Your invoice is pending payment';
  const message = paid ? 'We have marked your invoice as paid. Thank you for your payment and for choosing KeyRoutes.' : 'Your invoice is available in your dashboard. Please arrange payment using the bank details on the invoice.';
  const amount = new Intl.NumberFormat('en-IN',{style:'currency',currency:invoice.currency}).format(invoice.totalMinor/100);
  return { subject: `${paid ? 'Payment received' : 'Payment reminder'} · ${invoice.number}`, html: `<html><body style="font-family:Arial,sans-serif;background:#f5f6f8;padding:24px"><div style="max-width:580px;margin:auto;background:#fff;border-top:4px solid #e10600;padding:32px;border-radius:10px"><img src="https://keyroutes.co/key-routes-logo.png" width="180" alt="KeyRoutes"><h1 style="font-size:24px">${title}</h1><p>${message}</p><p><strong>Invoice:</strong> ${escape(invoice.number)}</p><p><strong>Amount:</strong> ${escape(amount)}</p><p><strong>Status:</strong> ${escape(invoice.status)}</p><p><strong>Due date:</strong> ${invoice.dueDate.toISOString().slice(0,10)}</p><p><a href="https://keyroutes.co/client" style="display:inline-block;padding:12px 18px;background:#e10600;color:#fff;text-decoration:none;border-radius:6px">View invoice</a></p><p style="color:#777;font-size:12px">KeyRoutes<br>A product of Sixedge Innovations</p></div></body></html>` };
};
module.exports = { invoiceEmail };
