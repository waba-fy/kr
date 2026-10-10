const express = require('express');
const ContentEntry = require('../models/ContentEntry');
const documents = require('../utils/crawlDocuments');
const router = express.Router();
for (const [path, format, mime] of [['sitemap.xml','sitemap','application/xml'],['llms.txt','llms','text/plain']]) {
  router.get('/'+path,async(_req,res,next)=>{
    try {
      const entries=await ContentEntry.find({isActive:true}).select('section title data updatedAt isActive').lean();
      res.set('Cache-Control','no-cache').type(mime).send(documents[format](entries));
    } catch(error) {error.statusCode=503;next(error);}
  });
}
router.get('/robots.txt',async(_req,res,next)=>{
  try { const setting=await require('../models/SystemSetting').findOne({key:'site'}).lean();
    res.set('Cache-Control','no-cache').type('text/plain').send(setting?.value?.robotsIndex === false ? 'User-agent: *\nDisallow: /\n' : documents.robots);
  } catch(error) {error.statusCode=503;next(error);}
});
module.exports=router;
