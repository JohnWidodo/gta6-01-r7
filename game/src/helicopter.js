import * as T from '../vendor/three.module.min.js';
import {box} from './city.js';
export function createHelicopter(scene){const g=new T.Group();scene.add(g);const body=new T.Mesh(new T.SphereGeometry(1.6,12,8),new T.MeshStandardMaterial({color:0x274652}));body.scale.set(1,1,1.8);g.add(body);box(g,1.7,1.1,.08,0x8acacf,0,.15,2.2);box(g,.5,.5,4,0x294854,0,.2,-3);box(g,.2,2,1,0x294854,0,1,-4.8);for(const x of [-1.3,1.3]){box(g,.13,.13,4,0x4b585c,x,-1.6,0);box(g,.12,1,.13,0x4b585c,x,-1,1);}
 const rotor=new T.Group();g.add(rotor);rotor.position.y=1.9;box(rotor,13,.08,.25,0x354145);box(rotor,.25,.08,13,0x354145);
 const light=new T.SpotLight(0xfff4c6,100,65,.3,.55);g.add(light);light.position.set(0,-1,1);scene.add(light.target);
 const cone=new T.Mesh(new T.ConeGeometry(7,28,24,1,true),new T.MeshBasicMaterial({color:0xffefb2,transparent:true,opacity:.075,depthWrite:false,side:T.DoubleSide}));cone.position.y=-15;g.add(cone);
 return {mesh:g,rotor,update(dt,t,state){const p=state.player;g.visible=p.wanted>=4||state.scene==='chase';if(!g.visible)return;g.position.set(p.x+10+Math.sin(t*.4)*4,20+Math.sin(t)*.4,p.z-55);g.rotation.y=.5;rotor.rotation.y+=dt*40;light.target.position.set(p.x,0,p.z);}};
}
