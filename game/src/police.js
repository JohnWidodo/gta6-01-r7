import {makeCar} from './vehicles.js';
import {box} from './city.js';
import {distance,angleDelta} from './math.js';
export function createPolice(scene){const units=[];for(let i=0;i<6;i++){const mesh=makeCar(scene,0x223f4c,true),c={mesh,x:54+(i%2)*12,z:75-i*14,yaw:Math.PI,health:120,kind:i>=2?'PIT':'PATROL'};mesh.position.set(c.x,0,c.z);units.push(c);}
 const blocks=[];for(const z of [-60,0,60]){const mesh=box(scene,12,1,1,0xe5b870,60,.65,z);const car=makeCar(scene,0x233b45,true);car.position.set(60,0,z);car.rotation.y=Math.PI/2;blocks.push({mesh,car,x:60,z});}
 return {units,blocks,update(dt,time,state,effects){const p=state.player;for(let i=0;i<units.length;i++){const c=units[i];c.mesh.visible=(p.wanted>0?i<2+(p.wanted>=3?Math.min(4,p.wanted):0):i<2);if(!c.mesh.visible)continue;if(c.health<=0){c.mesh.rotation.z=.15;continue;}let tx,tz;if(p.wanted>0){const lead=c.kind==='PIT'?1.2:0;tx=p.x+Math.sin(p.yaw)*p.speed*lead+(i%2?2:-2);tz=p.z+Math.cos(p.yaw)*p.speed*lead;}else{tx= -3+i*66;tz=Math.sin(time*.05+i)*180;}
 const d=Math.hypot(tx-c.x,tz-c.z),target=Math.atan2(tx-c.x,tz-c.z);c.yaw+=angleDelta(target,c.yaw)*Math.min(1,dt*2);const speed=p.wanted?Math.min(state.commsJammed>0?3:(c.kind==='PIT'?24:19),d*1.2):7;
 if(d>2){c.x+=Math.sin(c.yaw)*speed*dt;c.z+=Math.cos(c.yaw)*speed*dt;}c.mesh.position.set(c.x,0,c.z);c.mesh.rotation.y=c.yaw;
 c.mesh.userData.red.material.emissive.setHex(Math.sin(time*12)>0?0xff2233:0x240000);c.mesh.userData.blue.material.emissive.setHex(Math.sin(time*12)<0?0x0066ff:0x000020);
 if(p.wanted&&distance(c,p)<3.1){p.health-=dt*(p.mode==='car'?3:12)*(p.armor? .45:1);p.speed*=Math.pow(.65,dt);if(c.kind==='PIT')p.yaw+=dt*.6;}}
 for(const b of blocks){b.mesh.visible=b.car.visible=p.wanted>=4;if(p.wanted>=4&&Math.abs(p.x-b.x)<6&&Math.abs(p.z-b.z)<2){p.speed*=-.3;p.z+=3;p.health-=6;effects.burst(p.x,1,p.z);}}
 }};
}
