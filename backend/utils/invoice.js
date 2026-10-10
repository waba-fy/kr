const words = (number) => {
  const small = ['Zero','One','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten','Eleven','Twelve','Thirteen','Fourteen','Fifteen','Sixteen','Seventeen','Eighteen','Nineteen'];
  const tens = ['','','Twenty','Thirty','Forty','Fifty','Sixty','Seventy','Eighty','Ninety'];
  if(number<20)return small[number];
  if(number<100)return tens[Math.floor(number/10)]+(number%10?' '+small[number%10]:'');
  for(const [value,label] of [[10000000,'Crore'],[100000,'Lakh'],[1000,'Thousand'],[100,'Hundred']]) if(number>=value)return words(Math.floor(number/value))+' '+label+(number%value?' '+words(number%value):'');
};
const calculateInvoice = (body) => {
  const currencies = ['INR','USD','EUR','GBP','AED'];
  if (!currencies.includes(body.currency)) throw new Error('Choose a valid currency.');
  const parseDate = value => {
    if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) throw new Error('Enter valid invoice dates.');
    const date = new Date(`${value}T00:00:00Z`);
    if (Number.isNaN(date.getTime()) || date.toISOString().slice(0,10) !== value) throw new Error('Enter valid invoice dates.');
    return date;
  };
  const issueDate = parseDate(body.issueDate), dueDate = parseDate(body.dueDate);
  if (dueDate < issueDate) throw new Error('Due date cannot be before issue date.');
  if (!Array.isArray(body.items) || !body.items.length || body.items.length > 50) throw new Error('Add 1–50 invoice line items.');
  const items = body.items.map(item => {
    const quantity = Number(item.quantity), unitPrice = String(item.unitPrice);
    if (typeof item.description !== 'string' || !item.description.trim() || item.description.length > 300 || !Number.isFinite(quantity) || quantity <= 0 || quantity > 10000 || !/^\d{1,8}(\.\d{1,2})?$/.test(unitPrice)) throw new Error('Each item needs a description, positive quantity and price with up to two decimals.');
    const unitMinor = Math.round(Number(unitPrice) * 100);
    const discount = String(item.discount || '0');
    if (!/^\d{1,8}(\.\d{1,2})?$/.test(discount)) throw new Error('Enter a nonnegative discount with up to two decimals.');
    const discountMinor = Math.round(Number(discount) * 100);
    const totalMinor = Math.round(unitMinor * quantity) - discountMinor;
    if (totalMinor < 0) throw new Error('Discount cannot exceed the line amount.');
    if (!Number.isSafeInteger(totalMinor) || totalMinor > 100000000000) throw new Error('Invoice line amount is too large.');
    const sacCode = String(item.sacCode || '').trim(), unit = String(item.unit || '').trim();
    if (sacCode.length > 20 || unit.length > 20) throw new Error('SAC/HSN and unit must be at most 20 characters.');
    return { description: item.description.trim(), quantity, unitMinor, totalMinor, discountMinor, sacCode, unit };
  });
  if (!['Split GST','IGST','No tax'].includes(body.taxMode)) throw new Error('Choose a tax mode.');
  const taxRate = body.taxMode === 'No tax' ? 0 : Number(body.taxRate);
  if (!Number.isFinite(taxRate) || taxRate < 0 || taxRate > 100) throw new Error('Tax rate must be between 0 and 100.');
  const adjustment = String(body.adjustment || '0');
  if (!/^-?\d{1,8}(\.\d{1,2})?$/.test(adjustment)) throw new Error('Enter an adjustment with up to two decimals.');
  const adjustmentMinor = Math.round(Number(adjustment) * 100);
  const subtotalMinor = items.reduce((total, item) => total + item.totalMinor, 0), taxMinor = Math.round((subtotalMinor + adjustmentMinor) * taxRate / 100);
  const result = { currency: body.currency, issueDate, dueDate, items, taxRate, subtotalMinor, taxMinor, adjustmentMinor, totalMinor: subtotalMinor + adjustmentMinor + taxMinor };
  if (result.totalMinor < 0) throw new Error("Invoice total cannot be negative.");
  result.taxMode = body.taxMode;
  result.cgstMinor = body.taxMode === 'Split GST' ? Math.round(taxMinor / 2) : 0;
  result.sgstMinor = body.taxMode === 'Split GST' ? taxMinor - result.cgstMinor : 0;
  const major = Math.floor(result.totalMinor / 100), minor = result.totalMinor % 100;
  result.amountInWords = words(major) + (body.currency === 'INR' ? ' Rupees' : ' ' + body.currency) + (minor ? ' and ' + words(minor) + (body.currency === 'INR' ? ' Paise' : ' Cents') : '') + ' Only';
  if (body.number) { if (typeof body.number !== 'string' || !/^[A-Za-z0-9/-]{1,60}$/.test(body.number)) throw new Error('Use an invoice number up to 60 letters, digits, slashes or hyphens.'); result.number = body.number; }
  for (const [key, max] of [['sellerName',120],['sellerAddress',1000],['sellerTaxId',60],['notes',2000],['paymentInstructions',2000],['sellerPan',30],['buyerName',120],['buyerAddress',1000],['buyerTaxId',60],['buyerPan',30],['bankAccountName',120],['bankName',120],['bankBranch',120],['bankAccountNumber',60],['bankIfsc',30],['invoicePeriod',120],['signatoryName',120]]) {
    const value = body[key] ?? ''; if (typeof value !== 'string' || value.length > max) throw new Error(`Enter a valid ${key}.`); result[key] = value.trim();
  }
  if (!result.sellerName) throw new Error('Seller name is required.');
  return result;
};
module.exports = { calculateInvoice };
