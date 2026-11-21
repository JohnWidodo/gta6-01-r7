export const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
export const distance=(a,b)=>Math.hypot(a.x-b.x,a.z-b.z);
export function seeded(seed=7331){return()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};}
export const angleDelta=(a,b)=>Math.atan2(Math.sin(a-b),Math.cos(a-b));
