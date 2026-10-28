import{r as n,j as r}from"./react-vendor-BPVVFWDH.js";import{C as m,a as d,e as f}from"./three-fiber-Bv-CXKgG.js";import{a as u,j as v,k as p,C as c}from"./three-core-Ywy106fw.js";import"./three-drei-ioy8t--3.js";class h extends p{constructor(){super({uniforms:{uTime:{value:0},uColor1:{value:new c(1118481)},uColor2:{value:new c(2236962)},uMouse:{value:new u(0,0)}},vertexShader:`
        varying vec2 vUv;
        uniform float uTime;
        uniform vec2 uMouse;
        
        void main() {
          vUv = uv;
          vec3 pos = position;
          pos.z += sin(pos.x * 2.0 + uTime) * 0.5;
          pos.z += cos(pos.y * 2.0 + uTime) * 0.5;
          float dist = distance(uv, uMouse);
          float effect = smoothstep(0.5, 0.0, dist);
          pos.z += effect * 2.0;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,fragmentShader:`
        varying vec2 vUv;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform vec2 uMouse;
        
        void main() {
          float dist = distance(vUv, uMouse);
          vec3 color = mix(uColor1, uColor2, vUv.y);
          color += vec3(0.1) * smoothstep(0.3, 0.0, dist);
          gl_FragColor = vec4(color, 0.5);
        }
      `,wireframe:!0,transparent:!0})}}f({GradientShaderMaterial:h});function w(){const s=n.useRef(null),i=n.useRef(null),a=n.useRef(new u(0,0));return d(e=>{if(document.hidden)return;const t=e.clock.getElapsedTime();i.current&&(i.current.uniforms.uTime.value=t*.4,i.current.uniforms.uMouse.value.lerp(a.current,.08))}),n.useEffect(()=>{let e=!1;const t=o=>{e||(requestAnimationFrame(()=>{a.current.x=o.clientX/window.innerWidth,a.current.y=1-o.clientY/window.innerHeight,e=!1}),e=!0)};return window.addEventListener("mousemove",t,{passive:!0}),()=>window.removeEventListener("mousemove",t)},[]),r.jsxs("mesh",{ref:s,rotation:[-Math.PI/3,0,0],children:[r.jsx("planeGeometry",{args:[20,20,32,32]}),r.jsx("gradientShaderMaterial",{ref:i,attach:"material"})]})}function x(){const s=n.useRef(null),i=n.useRef(new u(0,0)),a=n.useMemo(()=>{const t=new Float32Array(540);for(let o=0;o<180;o+=1){const l=o+1;t[o*3]=l*127.1%2e3/100-10,t[o*3+1]=l*311.7%1200/100-6,t[o*3+2]=l*74.7%150/100+.7}return t},[]);return n.useEffect(()=>{let e=!1;const t=o=>{e||(requestAnimationFrame(()=>{i.current.set(o.clientX/window.innerWidth*2-1,1-o.clientY/window.innerHeight*2),e=!1}),e=!0)};return window.addEventListener("mousemove",t,{passive:!0}),()=>window.removeEventListener("mousemove",t)},[]),d(e=>{document.hidden||s.current&&(s.current.uniforms.uTime.value=e.clock.elapsedTime,s.current.uniforms.uMouse.value.lerp(i.current,.08))}),r.jsxs("points",{children:[r.jsx("bufferGeometry",{children:r.jsx("bufferAttribute",{attach:"attributes-position",args:[a,3]})}),r.jsx("shaderMaterial",{ref:s,transparent:!0,depthWrite:!1,blending:v,uniforms:{uTime:{value:0},uMouse:{value:new u}},vertexShader:`
          uniform float uTime;
          uniform vec2 uMouse;
          varying float vAlpha;
          void main() {
            vec3 pointPosition = position;
            pointPosition.z += sin(uTime * 0.7 + position.x * 1.4 + position.y) * 0.035;
            vec4 viewPosition = modelViewMatrix * vec4(pointPosition, 1.0);
            vec4 clipPosition = projectionMatrix * viewPosition;
            float cursorDistance = distance(clipPosition.xy / clipPosition.w, uMouse);
            float influence = 1.0 - smoothstep(0.0, 0.42, cursorDistance);
            viewPosition.z += influence * 0.55;
            gl_Position = projectionMatrix * viewPosition;
            gl_PointSize = clamp((2.0 + influence * 5.0) * (5.0 / -viewPosition.z), 1.5, 8.0);
            vAlpha = 0.18 + influence * 0.58;
          }
        `,fragmentShader:`
          varying float vAlpha;
          void main() {
            float distanceFromCenter = length(gl_PointCoord - vec2(0.5));
            float pointAlpha = 1.0 - smoothstep(0.22, 0.5, distanceFromCenter);
            gl_FragColor = vec4(0.35, 0.82, 0.8, pointAlpha * vAlpha);
          }
        `})]})}const j=()=>{const[s,i]=n.useState(!1);return n.useEffect(()=>{if(!window.matchMedia("(prefers-reduced-motion: reduce)").matches)if("requestIdleCallback"in window){const a=window.requestIdleCallback(()=>i(!0),{timeout:1200});return()=>window.cancelIdleCallback(a)}else{const a=setTimeout(()=>i(!0),300);return()=>clearTimeout(a)}},[]),s?r.jsxs(m,{id:"bg-canvas",style:{position:"fixed",top:0,left:0,width:"100%",height:"100%",zIndex:-1,opacity:.5,pointerEvents:"none"},camera:{position:[0,0,5],fov:75},dpr:[1,1.25],gl:{alpha:!0,antialias:!1,powerPreference:"low-power"},children:[r.jsx(x,{}),r.jsx(w,{})]}):null};export{j as default};
