import {test} from 'node:test';
import assert from 'node:assert/strict';
import {loadManagedContent} from '../src/hooks/managedContent.mjs';
test('Empty published collections remain empty instead of restoring disabled static content',async()=>{
  assert.deepEqual(await loadManagedContent('/content/reviews',async()=>({ok:true,json:async()=>({data:[]})})),[]);
  assert.deepEqual(await loadManagedContent('/content/reviews',async()=>({ok:true,json:async()=>({data:[{data:{id:1,title:'Published'}}]})})),[{id:1,title:'Published'}]);
  await assert.rejects(loadManagedContent('/content/reviews',async()=>({ok:false,json:async()=>({data:[]})})),/unavailable/);
  await assert.rejects(loadManagedContent('/content/reviews',async()=>({ok:true,json:async()=>({data:null})})),/unavailable/);
});
