import {test} from 'node:test';
import assert from 'node:assert/strict';
import {newContentFromTemplate,emptyArrayItem} from '../src/components/admin/contentTemplate.mjs';
test('New content preserves edit fields, nested arrays and types without copying client content or database identity',()=>{
  const source={id:7,slug:'old-client',cover:{title:'Old client',image:'/old.png'},projects:[{id:'project',gallery:[{image:'/photo.png',alt:'Old photo'}]}],featured:true,metrics:[15],tags:['old'],optional:null};
  const result=newContentFromTemplate(source,'source-record');
  assert.deepEqual(result,{key:'',title:'',isActive:false,sourceKey:'source-record',data:{id:0,slug:'',cover:{title:'',image:''},projects:[{id:'',gallery:[{image:'',alt:''}]}],featured:false,metrics:[0],tags:[''],optional:''}});
  result.data.cover.title='New client';assert.equal(source.cover.title,'Old client');assert.equal(result._id,undefined);
});

test('New page cards retain the rendering kind while client-specific values remain blank',()=>{
  for (const kind of ['service','pillar','product','culture']) {
    const draft=newContentFromTemplate({kind,title:'Existing',desc:'Existing description',link:'/old'});
    assert.deepEqual(draft.data,{kind,title:'',desc:'',link:''});
  }
});

test('New content is unpublished until explicitly selected for website visibility',()=>{
  assert.equal(newContentFromTemplate({title:'Existing'}).isActive,false);
});

test('Adding a structured array item retains nested image and metadata fields',()=>{
  assert.deepEqual(emptyArrayItem({id:'old',images:[{url:'/photo.png',alt:'Existing image'}],metrics:[2]}),{id:'',images:[{url:'',alt:''}],metrics:[0]});
});
