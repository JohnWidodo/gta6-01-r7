import * as T from '../vendor/three.module.min.js';
import {box} from './city.js';
import {mergeActor} from './geometry.js';
import {seeded} from './math.js';
export function person(scene,color=0xeac289){const g=new T.Group();scene.add(g);box(g,.55,.72,.35,color,0,1.05,0);const head=new T.Mesh(new T.SphereGeometry(.23,8,6),new T.MeshStandardMaterial({color:0xb87d58}));head.position.y=1.63;g.add(head);const a=box(g,.18,.7,.2,0x334753,-.17,.38,0),b=box(g,.18,.7,.2,0x334753,.17,.38,0);box(g,.13,.65,.18,color,-.38,1.05,0);box(g,.13,.65,.18,color,.38,1.05,0);g.userData.legs=[a,b];return mergeActor(g,[a,b]);}
export function createPedestrians(scene){const rnd=seeded(38),people=[];for(let i=0;i<72;i++){const x=i<28?(i%2?50:70):[-130,-70,-10,10,50,70][i%6],z=i<28?120-i*6:-195+rnd()*390;const mesh=person(scene,[0xeab268,0xb07391,0x54a5a1,0xe1d5b2][i%4]);mesh.position.set(x,0,z);people.push({mesh,x,z,home:z,speed:.65+rnd(),dir:i%2?1:-1,health:50});}
 return {people,update(dt,time,player){for(const p of people){if(p.health<=0){p.mesh.rotation.z=Math.PI/2;continue;}const flee=player.wanted>=2&&Math.hypot(p.x-player.x,p.z-player.z)<18;p.z+=p.dir*p.speed*dt*(flee?3:1);if(Math.abs(p.z-p.home)>15||Math.abs(p.z)>212)p.dir*=-1;p.mesh.position.set(p.x,0,p.z);p.mesh.rotation.y=p.dir>0?0:Math.PI;for(let i=0;i<2;i++)p.mesh.userData.legs[i].rotation.x=Math.sin(time*7+p.home+i*Math.PI)*.45;}}};
}
