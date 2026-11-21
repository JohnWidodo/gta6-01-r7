export function createInput(canvas){const keys=new Set(),pressed=new Set();let mouseX=0,mouseY=0,fire=false;
 window.addEventListener('keydown',e=>{if(['Space','Tab','KeyQ'].includes(e.code))e.preventDefault();if(!keys.has(e.code))pressed.add(e.code);keys.add(e.code);});window.addEventListener('keyup',e=>keys.delete(e.code));window.addEventListener('blur',()=>keys.clear());
 canvas.addEventListener('click',()=>{canvas.requestPointerLock?.();fire=true;});window.addEventListener('mousedown',e=>{if(e.button===0)fire=true;});window.addEventListener('mouseup',()=>fire=false);window.addEventListener('mousemove',e=>{if(document.pointerLockElement===canvas){mouseX+=e.movementX;mouseY+=e.movementY;}});
 return {down:k=>keys.has(k),take:k=>{const v=pressed.has(k);pressed.delete(k);return v;},look:()=>{const p={x:mouseX,y:mouseY};mouseX=mouseY=0;return p;},get fire(){return fire;}};
}
