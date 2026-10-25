import assert from 'node:assert/strict'
import test from 'node:test'
import { copyReader, resolveLink, defaultPresentation } from '../src/lib/presentation'
import { mediaSource, skillIcon } from '../src/lib/media'
import fs from 'node:fs'

test('editor copy can be cleared without restoring a fallback',()=>{
 const read=copyReader({copy:[{key:'title',value:''},{key:'link./projects',value:''}]})
 assert.equal(read('title','old title'),'')
 assert.equal(read('unknown','fallback'),'fallback')
 assert.equal(resolveLink('/projects',read),'')
 assert.equal(resolveLink('/projects/my-build',read),'/projects/my-build')
})
test('configured links reject executable and protocol-relative destinations',()=>{
 for(const value of ['javascript:alert(1)','//evil.example','data:text/html,test']) {
  const read=copyReader({copy:[{key:'link./projects',value}]})
  assert.equal(resolveLink('/projects',read),'#')
 }
})
test('same-origin Payload images use relative URLs; remote media retains its origin',()=>{
 assert.equal(mediaSource('https://portfolio.example/api/media/file/icon.png','https://portfolio.example'),'/api/media/file/icon.png')
 assert.equal(mediaSource('/api/media/file/icon.svg','https://portfolio.example'),'/api/media/file/icon.svg')
 assert.equal(mediaSource('https://cdn.example/icon.png','https://portfolio.example'),'https://cdn.example/icon.png')
 assert.equal(mediaSource('javascript:alert(1)','https://portfolio.example'),undefined)
})
test('all extracted display references have a seed entry and keys are unique',()=>{
 const keys=new Set(defaultPresentation.copy.map(row=>row.key))
 assert.equal(keys.size,defaultPresentation.copy.length)
 for(const root of ['src/components','src/app/(frontend)']) {
  for(const file of fs.readdirSync(root,{recursive:true}).filter(name=>String(name).endsWith('.tsx'))) {
   const source=fs.readFileSync(`${root}/${file}`,'utf8')
   for(const match of source.matchAll(/(?:<Copy id="|copy\(')([^"']+)/g)) assert.ok(keys.has(match[1]),`${file}: ${match[1]}`)
  }
 }
})

test('skill icons select a populated dark variant and retain meaningful fallback text',()=>{
 const selected=skillIcon({id:1,title:'TypeScript',icon:{id:1,url:'/api/media/file/default.png'},iconDark:{id:2,url:'/api/media/file/dark.png'}})
 assert.equal(selected.media?.url,'/api/media/file/dark.png')
 assert.equal(selected.alt,'TypeScript')
 assert.equal(skillIcon({id:2,title:'Rust'}).initial,'R')
 assert.equal(skillIcon({id:3,title:'Go',iconDark:{id:4},iconLight:{id:5,url:'/api/media/file/light.png'}}).media?.id,5)
})
