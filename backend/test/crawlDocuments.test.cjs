const {test}=require('node:test');
const assert=require('node:assert/strict');
const {sitemap,llms,robots,publicPages}=require('../utils/crawlDocuments');
test('Crawl documents include published detail routes, omit disabled/private/invalid routes and use true update dates',()=>{
 const entries=[{section:'case-studies',isActive:true,title:'A & B',data:{slug:'new-client'},updatedAt:'2026-10-10T00:00:00Z'},{section:'client-stories',isActive:true,data:{slug:'/success-stories/another-client',hero:{title:'Another client'}}},{section:'case-studies',isActive:false,data:{slug:'hidden'}},{section:'case-studies',isActive:true,data:{slug:'https://evil.example/x'}},{section:'reviews',isActive:true,data:{slug:'review-no-detail'}}];
 const xml=sitemap(entries);assert.match(xml,/https:\/\/keyroutes.co\/case-studies\/new-client/);assert.match(xml,/2026-10-10T00:00:00.000Z/);assert.match(xml,/success-stories\/another-client/);
 for(const value of ['hidden','evil.example','review-no-detail','/admin','/client/','market-reports']) assert.equal(xml.includes(value),false);
 assert.equal((sitemap([]).match(/<lastmod>/g)||[]).length,0);
 const text=llms(entries);assert.match(text,/\[A & B\]/);assert.equal(text.includes('/hidden'),false);assert.match(robots,/Disallow: \/admin/);assert.match(robots,/Sitemap: https:\/\/keyroutes.co\/sitemap.xml/);
 assert.equal(publicPages([...entries,entries[0]]).filter(page=>page.route==='/case-studies/new-client').length,1);
});
