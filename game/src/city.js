import * as T from '../vendor/three.module.min.js';
import {seeded} from './math.js';
export const districts=[
 {name:'Coral Quay',color:'#dc9b64',x:-100,z:120},
 {name:'Palm Row',color:'#65d8c3',x:80,z:100},
 {name:'Downtown Coraline',color:'#83a4cd',x:-35,z:-40},
 {name:'Neon Market',color:'#d489ad',x:-110,z:-110},
 {name:'Citrus Heights',color:'#b4ca79',x:60,z:-145}
];
export function districtAt(x,z){if(x>30&&z>0)return 1;if(z>55)return 0;if(z< -95)return x<0?3:4;return 2;}
export const roads=[-120,-60,0,60,120];
export function box(parent,w,h,d,color,x=0,y=0,z=0){const m=new T.Mesh(new T.BoxGeometry(w,h,d),new T.MeshStandardMaterial({color,roughness:.75}));m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;}
export function label(parent,text,x,y,z,width=15,color='#183d40',bg='#f6dfaf'){
 const c=document.createElement('canvas');c.width=512;c.height=128;const cx=c.getContext('2d');cx.fillStyle=bg;cx.fillRect(0,0,512,128);cx.fillStyle=color;cx.font='bold 42px sans-serif';cx.textAlign='center';cx.fillText(text,256,81);const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;const p=new T.Mesh(new T.PlaneGeometry(width,width/4),new T.MeshBasicMaterial({map:t,side:T.DoubleSide}));p.position.set(x,y,z);parent.add(p);return p;
}
export function palm(parent,x,z,scale=1){const g=new T.Group();g.position.set(x,0,z);g.scale.setScalar(scale);parent.add(g);const trunk=new T.Mesh(new T.CylinderGeometry(.17,.38,8,7),new T.MeshStandardMaterial({color:0xaa7c52}));trunk.position.set(.2,4,0);trunk.rotation.z=-.05;g.add(trunk);for(let i=0;i<8;i++){const a=i*Math.PI/4,verts=[];function pt(t,side){const r=t*4.6,w=Math.sin(t*Math.PI)*.7*side;return [Math.sin(a)*r+Math.cos(a)*w+.4,8.15+Math.sin(t*Math.PI)*1.05-t*1.8+(side===0?.12:0),Math.cos(a)*r-Math.sin(a)*w];}for(let j=0;j<8;j++)for(const side of [-1,1]){const t=j/8,u=(j+1)/8;verts.push(...pt(t,0),...pt(u,0),...pt(t,side),...pt(t,side),...pt(u,0),...pt(u,side));}const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(verts,3));geo.computeVertexNormals();const m=new T.Mesh(geo,new T.MeshStandardMaterial({color:i%2?0x39845a:0x276a4a,side:T.DoubleSide,roughness:.9}));g.add(m);}return g;}
export function createCity(scene){const rnd=seeded();const obstacles=[];
 box(scene,340,.5,450,0xdfc593,-40,-.45,0);
 box(scene,170,.4,550,0x33aab3,205,-.7,0);
 box(scene,16,.15,460,0xf3e0b1,116,-.2,0);
 // The coastal promenade is continuous, while the streets form an accessible grid.
 for(const x of roads){box(scene,14,.08,435,0x506066,x,0,0);for(const side of [-1,1])box(scene,3,.18,435,0xdecfb6,x+side*9,.05,0);for(let z=-205;z<211;z+=12)box(scene,.18,.015,4,0xf7e4b5,x,.06,z);}
 for(let z=-180;z<=180;z+=60){box(scene,285,.09,14,0x506066,-20,.02,z);for(const side of [-1,1])box(scene,285,.2,3,0xdeceb4,-20,.1,z+side*9);for(let x=-155;x<119;x+=12)box(scene,4,.02,.18,0xf7e4b5,x,.09,z);}
 for(let x=-150;x<=90;x+=60)for(let z=-210;z<=210;z+=60){
  const di=districtAt(x,z);const color=[0xe4b78b,0xf1d8b0,0x91b0b3,0xdb91a4,0xced79d][di];
  for(const ox of [-11,11])for(const oz of [-11,11]){if(di===1&&(x>70||rnd()<.22))continue;const xx=x+ox,zz=z+oz;const h=di===2?18+rnd()*43:di===3?8+rnd()*13:5+rnd()*10;const w=13+rnd()*4,d=13+rnd()*4;
   box(scene,w,h,d,color,xx,h/2,zz);box(scene,w+1,.5,d+1,0xf4e0bf,xx,h,zz);obstacles.push({x:xx,z:zz,w:w/2+1,d:d/2+1});
   // Repeating glazed windows give the skyline scale without image assets.
   for(let yy=3;yy<h-1;yy+=3.5){box(scene,w*.75,1.25,.08,di===3?0x5d456c:0x3b6777,xx,yy,zz+d/2+.05);box(scene,.08,1.25,d*.7,0x3b6777,xx+w/2+.05,yy,zz);}
   if(di===3){box(scene,w,.25,.25,0xf26b98,xx,4,zz+d/2+.25);}
  }
 }
 for(let z=-205;z<210;z+=17){palm(scene,72,z);palm(scene,106,z,1.12);if(z%2) palm(scene,-10,z,.85);}
 // Harbor cranes, piers, market canopies and hills make each neighborhood distinct.
 for(let z=105;z<=185;z+=40){box(scene,65,1,13,0xa68763,-185,0,z);box(scene,1,24,1,0xeeb451,-161,12,z);box(scene,23,1,1,0xeeb451,-151,24,z);for(let i=0;i<3;i++)box(scene,9,4,7,i%2?0x508f93:0xc67451,-156+i*13,2,z+12);}
 for(let i=0;i<12;i++){const x=-146+(i%4)*12,z=-100-Math.floor(i/4)*16;box(scene,7,3,5,0xa15f78,x,1.5,z);box(scene,9,.5,7,i%2?0xf29496:0xf0c96e,x,3.4,z);}
 for(let i=0;i<8;i++){const m=new T.Mesh(new T.ConeGeometry(30+i*2,20+i*4,10),new T.MeshStandardMaterial({color:0xa5b77e}));m.position.set(5+i*23,6,-245-i%2*15);scene.add(m);}
 for(let z=-190;z<205;z+=30){box(scene,.2,7,.2,0x59676a,49,3.5,z);box(scene,3,.18,.7,0xf8d08b,50,7,z);}
 for(let i=0;i<14;i++){const z=-5+i*15;box(scene,.08,2.8,.08,0xdfc89e,93,1.4,z);const umbrella=new T.Mesh(new T.ConeGeometry(2.6,.8,16),new T.MeshStandardMaterial({color:i%2?0xed927a:0xf1dfb0}));umbrella.position.set(93,3,z);scene.add(umbrella);box(scene,1,.35,2.6,0xf2dfb7,97,.3,z);box(scene,1,.12,1.4,0xe9ba87,97,.85,z-1);}
 label(scene,'PALM ROW',84,8,80,17);label(scene,'CORALINE',-32,43,-27,28);label(scene,'NEON MARKET',-101,12,-95,23,'#ffe4b2','#9c486c');
 const services=[{type:'garage',name:'Sunline Customs',x:60,z:12,color:0x52d7c2},{type:'shop',name:'Bay Supply',x:0,z:65,color:0xf2c96d},{type:'safehouse',name:'Rook’s Hideout',x:60,z:155,color:0xa6cbed},{type:'garage',name:'Quay Motorworks',x:-120,z:120,color:0x52d7c2},{type:'garage',name:'Static Auto',x:0,z:-60,color:0x52d7c2},{type:'garage',name:'Neon Customs',x:-120,z:-120,color:0x52d7c2},{type:'garage',name:'Citrus Motors',x:60,z:-180,color:0x52d7c2}];
 for(const s of services){const ring=new T.Mesh(new T.TorusGeometry(3,.18,6,40),new T.MeshBasicMaterial({color:s.color}));ring.rotation.x=Math.PI/2;ring.position.set(s.x,.15,s.z);scene.add(ring);label(scene,s.name,s.x,6,s.z,13);s.ring=ring;}
 return {obstacles,services};
}

// Collapse static city primitives by material. This keeps the procedural detail while
// reducing thousands of draw calls to a few dozen on browser software WebGL.
export function batchCity(scene){scene.updateMatrixWorld(true);const groups=new Map(),meshes=[];scene.traverse(m=>{if(!m.isMesh||!m.material.color||m.material.map||m.material.transparent||!m.geometry.attributes.normal)return;meshes.push(m);const key=m.material.color.getHex()+'|'+m.material.roughness;let g=groups.get(key);if(!g){g={material:m.material.clone(),p:[],n:[]};groups.set(key,g);}const geo=m.geometry.index?m.geometry.toNonIndexed():m.geometry.clone();const p=geo.attributes.position,n=geo.attributes.normal;const normal=new T.Matrix3().getNormalMatrix(m.matrixWorld),v=new T.Vector3();for(let i=0;i<p.count;i++){v.fromBufferAttribute(p,i).applyMatrix4(m.matrixWorld);g.p.push(v.x,v.y,v.z);v.fromBufferAttribute(n,i).applyMatrix3(normal).normalize();g.n.push(v.x,v.y,v.z);}geo.dispose();});for(const m of meshes){m.parent.remove(m);m.geometry.dispose();m.material.dispose();}for(const g of groups.values()){const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(g.p,3));geo.setAttribute('normal',new T.Float32BufferAttribute(g.n,3));geo.computeBoundingSphere();const mesh=new T.Mesh(geo,g.material);mesh.castShadow=mesh.receiveShadow=true;scene.add(mesh);}return groups.size;}
