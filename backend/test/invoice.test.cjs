const test=require('node:test');
const assert=require('node:assert/strict');
const {calculateInvoice}=require('../utils/invoice');
const {invoiceEmail}=require('../utils/invoiceEmail');
test('SCC invoice totals use discounts, adjustments and integer currency amounts',()=>{
 const input={currency:'INR',issueDate:'2026-10-04',dueDate:'2026-10-05',sellerName:'Sixedge Innovations',taxMode:'No tax',taxRate:0,items:[{description:'Social Media Maintenance',quantity:1,unitPrice:'15000.00',discount:'5000',sacCode:'998365'},{description:'Performance Marketing',quantity:1,unitPrice:'20000',discount:'5000',sacCode:'998365'}]};
 const invoice=calculateInvoice(input);assert.equal(invoice.totalMinor,2500000);assert.equal(invoice.items[0].totalMinor,1000000);assert.equal(invoice.amountInWords,'Twenty Five Thousand Rupees Only');
 assert.equal(calculateInvoice({...input,adjustment:'-500.50'}).totalMinor,2449950);
 const taxed=calculateInvoice({...input,taxMode:'Split GST',taxRate:18});assert.equal(taxed.totalMinor,2950000);assert.equal(taxed.cgstMinor+taxed.sgstMinor,taxed.taxMinor);
 for(const invalid of [{...input,dueDate:'2026-10-03'},{...input,issueDate:'2026-02-30'},{...input,items:[{description:'Bad',quantity:-1,unitPrice:'10'}]},{...input,items:[{description:'Bad',quantity:1,unitPrice:'10',discount:'11'}]},{...input,adjustment:'-9999999'}])assert.throws(()=>calculateInvoice(invalid));
 const pending={...invoice,number:'INV26-048',status:'Pending'};assert.match(invoiceEmail(pending).subject,/Payment reminder/);assert.match(invoiceEmail({...pending,status:'Paid'}).html,/Thank you for your payment/);
});
