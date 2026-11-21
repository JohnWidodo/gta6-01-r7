import {makeCar} from './vehicles.js';
import {seeded,distance} from './math.js';
export function createTraffic(scene){const rnd=seeded(17),cars=[];const palette=[0xd1c399,0x67acaa,0xc56555,0xf4c663,0x8e91ad,0xdfd9c9];
 for(let i=0;i<32;i++){const lane=i%3===0?60:i%3===1?0:-60;const path=[{x:lane+3,z:195},{x:lane+3,z:-177},{x:lane-57,z:-177},{x:lane-57,z:183},{x:lane+3,z:183}];let at=i%path.length;const mesh=makeCar(scene,palette[i%6]);const c={mesh,x:path[at].x,z:path[at].z,route:path,next:(at+1)%path.length,speed:5+rnd()*4,yaw:Math.PI,disabled:false};if(i<8){c.x=i%2?57:63;c.z=85-i*13;c.next=1;}mesh.position.set(c.x,0,c.z);cars.push(c);}
 const parked=makeCar(scene,0xdfb550);parked.position.set(61,0,113);cars.push({mesh:parked,x:61,z:113,yaw:Math.PI,speed:0,disabled:true,parked:true});
 return {cars,update(dt,player){for(const c of cars){if(c.mesh===player.car||c.disabled)continue;const t=c.route[c.next];const d=distance(c,t);if(d<2){c.next=(c.next+1)%c.route.length;continue;}c.yaw=Math.atan2(t.x-c.x,t.z-c.z);const v=distance(c,player)<6?c.speed*.15:c.speed;c.x+=Math.sin(c.yaw)*v*dt;c.z+=Math.cos(c.yaw)*v*dt;c.mesh.position.set(c.x,0,c.z);c.mesh.rotation.y=c.yaw;}}};
}
