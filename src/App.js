import React, { Suspense, useRef, useState, useEffect, useMemo } from "react"
import { Canvas, useFrame, useThree,  } from "react-three-fiber"
import { ContactShadows,  useGLTF, OrbitControls, useAnimations, Plane, Circle, Sphere, Tube, MeshWobbleMaterial, } from "drei"
import { HexColorPicker } from "react-colorful"
import { proxy, useProxy } from "valtio"
import * as THREE from 'three'
// Using a Valtio state model to bridge reactivity between
// the canvas and the dom, both can write to it and/or react to it.
const dummy = new THREE.Vector3()
const lookAtPos = new THREE.Vector3()
const FocusVector3 = new THREE.Vector3()

function Shoe() {
  const ref = useRef()
  // Drei's useGLTF hook sets up draco automatically, that's how it differs from useLoader(GLTFLoader, url)
  // { nodes, materials } are extras that come from useLoader, these do not exist in threejs/GLTFLoader
  // nodes is a named collection of meshes, materials a named collection of materials
  const { nodes, materials } = useGLTF("shoe-draco.glb")

  // Using the GLTFJSX output here to wire in app-state and hook up events
  return (
    <group>
      <mesh geometry={nodes.shoe.geometry} material={materials.laces}  />
      <mesh geometry={nodes.shoe_1.geometry} material={materials.mesh}  />
      <mesh geometry={nodes.shoe_2.geometry} material={materials.caps}  />
      <mesh geometry={nodes.shoe_3.geometry} material={materials.inner} />
      <mesh geometry={nodes.shoe_4.geometry} material={materials.sole}  />
      <mesh geometry={nodes.shoe_5.geometry} material={materials.stripes}  />
      <mesh geometry={nodes.shoe_6.geometry} material={materials.band}  />
      <mesh geometry={nodes.shoe_7.geometry} material={materials.patch} />
    </group>
  )
}

function Model() {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF("jule.glb")
  const { actions } = useAnimations(animations, group)
  console.log(actions);
  useFrame(() => {
    group.current.rotation.y += 0.001;
  })
  useEffect(() => {
    actions.Idle.play();
    actions.Idle_Wrench.play();

  })
  return (
    <group ref={group} dispose={null} scale={[0.02, 0.02, 0.02]} position={[0, -1.6, 0]}>
      <group name="F_MED_Mechanical_Engineerao">
        <primitive object={nodes.pelvis} />
        <skinnedMesh
          material={materials.F_MED_Mechanical_Engineer_Body_T1}
          geometry={nodes.F_MED_Mechanical_Engineermd.geometry}
          skeleton={nodes.F_MED_Mechanical_Engineermd.skeleton}
        />
        <skinnedMesh
          material={materials.F_MED_Mechanical_Engineer_Head}
          geometry={nodes.F_MED_Mechanical_Engineermd_1.geometry}
          skeleton={nodes.F_MED_Mechanical_Engineermd_1.skeleton}
        />
        <skinnedMesh
          material={materials.F_MED_Mechanical_Engineer_FaceAcc_T1}
          geometry={nodes.F_MED_Mechanical_Engineermd_2.geometry}
          skeleton={nodes.F_MED_Mechanical_Engineermd_2.skeleton}
        />
      </group>
      <group name="Mechanical_Engineer_Female_Gliderao" position={[45.49, 28.45, -5.73]} rotation={[0, 0.51, 0]} scale={[1.15, 1.15, 1.15]}>
        <primitive object={nodes.wrench_body} />
        <skinnedMesh
          material={materials.MI_Pets_Mechanical_Engineer_Owl}
          geometry={nodes.Mechanical_Engineer_Female_Glidermo.geometry}
          skeleton={nodes.Mechanical_Engineer_Female_Glidermo.skeleton}
        />
      </group>
    </group>
  )
}

function Pipe(props) {
  // ---------------- Camera Section ------------ //
  // const camRef = useRef()
  // const { setDefaultCamera } = useThree()
  // // Make the camera known to the system
  // useEffect(() => void setDefaultCamera(camRef.current), [])
  // // Update it every frame
  // useFrame(() => camRef.current.updateMatrixWorld())
  // ------------------------------------------- //
  const [zoom, setZoom] = useState(false)



  const group = useRef();
  const snap = useProxy(state);
  // const snap = useProxy(state_2);
  const { nodes, materials } = useGLTF('pipes_within_pipe.glb');
  const [hover,   set]      = useState(null)
  // const [hovered, setHover] = useState(false)

  // const points = []
  // points.push(new THREE.Vector3(-10, 0, 0))
  // points.push(new THREE.Vector3(0, 10, 0))
  // points.push(new THREE.Vector3(10, 0, 0))

  // const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)

  useFrame((state, delta) => {
    const step = 0.08
    state.camera.fov = THREE.MathUtils.lerp(state.camera.fov, zoom ? 40 : 20, step)
    state.camera.position.lerp(dummy.set( 
      zoom ? FocusVector3.x : 3,          //    x-axis of camera position
      zoom ? FocusVector3.y : 1.5,        //    y-axis of camera position
      zoom ? 1.35 : 3),                   //    z-axis of camera position
      step                                //    time that camera lerp
      )             

    // lookAtPos.x = Math.sin(state.clock.getElapsedTime() * 2)       // camera sway?? dizzy as heck

    state.camera.lookAt(lookAtPos)
    state.camera.updateProjectionMatrix()
  })


  return (
    <>
    {/* <perspectiveCamera ref={camRef} position={[0,0,0]}  zoom={1}  /> */}

    <group ref={group} {...props} dispose={null} position={[0,0,0]}
      // onPointerOver   = {(e) => (e.stopPropagation(), set(e.object.name))}
      // onPointerOver = {(e) => {    
      //   e.stopPropagation(); 
      //   if(e.object.name.includes("sub")){
      //     state.current = e.object.name;
      //     state.items[e.object.name] = "#F6653E";
      //   }
      //   else {
      //     state.current = e.object.name;
      //     state.items[e.object.name] = "#F4FF02";
      //   }
      // }}
      onPointerOut  = {(e) => {
          e.intersections.length=== 0 && set(null); 
          // state.items[e.object.name] = "#999999"; 
          // state.current = null;
      }}
      onPointerDown   = {(e) => {
        e.stopPropagation(); 
        // change colour on the model
        if(e.object.name.includes("sub")){
          state.items[state.current] = "#999999"
          state.current = e.object.name;
          state.items[e.object.name] = "#F6653E";
          model_info.current = {
            name:             e.object.name,
            is_main_duct:     e.object.is_main_duct,          
            sub_duct_count:   e.object.sub_duct_count,
            sub_fiber_count:  e.object.sub_fiber_count,
          }
        }
        else if (e.object.name.includes("main")) {
          state.items[state.current] = "#999999"
          state.current = e.object.name;
          state.items[e.object.name] = "#F4FF02";
          model_info.current = {
            name:             e.object.name,
            is_main_duct:     e.object.is_main_duct,          
            sub_duct_count:   e.object.sub_duct_count,
            sub_fiber_count:  e.object.sub_fiber_count,
          }
        }
        FocusVector3.set(e.point.x, e.point.y, e.point.z );         // set vector from pointer position
        setZoom((zoom) => true);                                    // start zoom
        // state.current = e.object.name;
      }}
      onPointerMissed = {(e) => {
        setZoom((zoom) => false);                 // if clicking a non model it will zoom out
        state.items[state.current] = "#999999"    // reset color
        state.current = null;                     // disable color
        model_info.current = null;
      }}
    >
          <mesh 
            // material={materials.DefaultMaterial}
            material-color={snap.items.main_pipe}
            geometry={nodes.defaultMaterial002.geometry} 
            castShadow
            
            name="main_pipe"
            is_main_duct={true}
            sub_duct_count={4}
          >
                  <meshToonMaterial  color={'#999999'} />
          </mesh>

          <mesh
            // material={materials.DefaultMaterial}
            material-color={snap.items.sub_pipe_01}
            geometry={nodes.defaultMaterial004.geometry}
            position={[-0.05, 0.04, 0]}
            scale={[0.23, 0.23, 1]}

            name="sub_pipe_01"
            is_main_duct={false}
            sub_fiber_count={23}
          >
                <meshToonMaterial color={'#999999'} />
          </mesh>

          <mesh
            // material={materials.DefaultMaterial}
            material-color={snap.items.sub_pipe_02}
            geometry={nodes.defaultMaterial008.geometry}
            position={[0.05, 0.04, 0]}
            scale={[0.23, 0.23, 1]}

            name="sub_pipe_02"
            is_main_duct={false}
            sub_fiber_count={15}
          >
               <meshToonMaterial color={'#999999'} />
          </mesh>

          <mesh
            // material={materials.DefaultMaterial}
            material-color={snap.items.sub_pipe_03}
            // material={new THREE.MeshBasicMaterial({ color: new THREE.Color('green')})}
            geometry={nodes.defaultMaterial010.geometry}
            position={[-0.05, -0.04, 0]}
            scale={[0.23, 0.23, 1]}

            name="sub_pipe_03" 
            is_main_duct={false}       
            sub_fiber_count={42}
          >
                  <meshToonMaterial color={'#999999'} />
          </mesh>

          <mesh
            // material={materials.DefaultMaterial}
            material-color={snap.items.sub_pipe_04}
            geometry={nodes.defaultMaterial006.geometry}
            position={[0.05, -0.04, 0]}
            scale={[0.23, 0.23, 1]}

            name="sub_pipe_04"
            is_main_duct={false}               
            sub_fiber_count={25}
          >
                <meshToonMaterial color={'#999999'} />
          </mesh>       
  
    </group>

    <OrbitControls 
          // minPolarAngle={Math.PI / 2}            // min angle thingy
          // maxPolarAngle={Math.PI / 2}            // min angle thingy
          // enableZoom={true} 
          enablePan={true} 
    />
    </>
  )
}


function renderInfo(item){
  if(item.current){
    if(item.current.is_main_duct == true){
      return  <>
            <h2>Main-duct Name: {item.current.name}</h2>
            <h2>Sub-duct count: {item.current.sub_duct_count}</h2>
        </>
      } else if (item.current.is_main_duct == false) {
        return <>
          <h2>Sub-duct name: {item.current.name}</h2>
          <h2>Fiber line quantity: {item.current.sub_fiber_count}</h2>
        </>
    }
  }
}


// render text
function Picker(){
    const snap = useProxy(state);
    return (
      <div className="picker" style={{display: "block"}}>
            {/* <HexColorPickercolor={snap.items[snap.current]} onChange={(color) => (state.items[snap.current] = color)}/> */}
            <h1>Location: {!model_info.title ? "Unknown" : model_info.title }</h1>
            {renderInfo(model_info)}

      </div>
    )
}


const state = proxy({
  current: null,
  items: {
    // mat_01: "#999999",
    // main_front_screw: "#999999",
    // first_sub_screw: "#999999",
    // fourth_sub_screw: "#999999",
    // second_sub_screw: "#999999",
    // third_sub_screw: "#999999",
    main_pipe: "#999999",
    sub_pipe_01: "#999999",
    sub_pipe_02: "#999999",
    sub_pipe_04: "#999999",
    sub_pipe_03: "#999999",
  },
  sub_items: {
    sub_pipe_01: 40,
    sub_pipe_02: 22,
    sub_pipe_04: 14,
    sub_pipe_03: 56,
  }
})

const model_info = proxy({
  current: null,
  title: "Kasetsart University"
})


// Separate Camera unsed
function Camera(props) {
  const ref = useRef()
  const { setDefaultCamera } = useThree()
  // Make the camera known to the system
  useEffect(() => void setDefaultCamera(ref.current), [])
  // Update it every frame
  useFrame(() => ref.current.updateMatrixWorld())
  return 
}

export default function App() {


  const [curve] = useState(() => {
    // Create an empty array to stores the points
    let points = [];
    // Define points along Z axis

    for (let i = 0; i < 30; i += 1){
      points.push(
        new THREE.Vector3(
          0,
          0 ,
          -(i / 4)
        ),
      );}

    return new THREE.CatmullRomCurve3(points);
  });

  return (
    
    <>  
        <Canvas        
         pixelRatio={window.devicePixelRatio}
         className="container"
         concurrent
         shadowMap
         >
          <directionalLight intensity={0.5} castShadow shadow-mapSize-height={512} shadow-mapSize-width={512}/>
          <spotLight intensity={0.3} angle={0.1} penumbra={1} position={[5, 25, 20]} />
          {/* <fog attach="fog" args={["white", 0, 40]} /> */}
          <ambientLight intensity={0.1} />
          <Suspense fallback={null}>
             <Pipe/>      
            <Circle receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} args={[1, 15]}>    //radius, polygon
                <meshStandardMaterial attach="material" color="white" />
            </Circle> 

            {/* generated tube (still research) */}
            {/* <Tube
               args={[
                 curve,     // vector3 curve
                 2,         // tubular segment
                 0.5,       // radius
                 10,        // polygon
                 5,         // radius segment
                 false      // closed tube??
                ]}
                position={[0,0,1.75]}
            >
              <meshToonMaterial attach="material" color="lime" />       
            </Tube>

          <OrbitControls 
            // minPolarAngle={Math.PI / 2}            // min angle thingy
            maxPolarAngle={Math.PI / 2}            // min angle thingy
            // enableZoom={true} 
            enablePan={true} 
          /> */}
         </Suspense>
       </Canvas>
       <Picker/>
    </>
  
  )
}

           {/* <ContactShadows rotation-x={Math.PI / 2} position={[0, -1, 0]} opacity={1} width={1} height={1}  blur={1} far={1} /> */}
                 {/* <MeshWobbleMaterial
                attach="material"
                factor={1} // Strength, 0 disables the effect (default=1)
                speed={10} // Speed (default=1)
              /> */}

    // <> 
    // <Canvas        
    //     pixelRatio={window.devicePixelRatio}
    //     className="container"
    //     concurrent
    //     camera={{ position: [0, 0, 2.5], }}
    //     >
    //   <ambientLight intensity={0.3} />
    //   <pointLight position={[20, 20, 20]} />
    //     <spotLight intensity={0.3} angle={0.1} penumbra={1} position={[5, 25, 20]} />
    //     <Suspense fallback={null}>
    //          {/* <Shoe /> */}
    //         <Model/>
          
    //        {/* <ContactShadows rotation-x={Math.PI / 2} position={[0, -1, 0]} opacity={1} width={1} height={1}  blur={1} far={1} /> */}
    //     </Suspense>
    //     <OrbitControls minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} enableZoom={true} enablePan={false} />
    //   </Canvas>

    //       <img src="./fortnite_logo.png" className="title" width="400" />
    // </>

//  <>
// <Canvas        
//   pixelRatio={window.devicePixelRatio}
//   className="container"
//   concurrent
//   shadowMap
//   camera={{ position: [0, 0, 5], }}
//   >
//    <Suspense fallback={null}>
// <directionalLight
//   intensity={0.5}
//   castShadow
//   shadow-mapSize-height={512}
//   shadow-mapSize-width={512}
// />
//          <ambientLight intensity={0.1} />
//         <directionalLight
//           intensity={0.5}
//           castShadow
//           shadow-mapSize-height={512}
//           shadow-mapSize-width={512}
//         />

     
//    <OrbitControls />
// </Suspense>
// </Canvas>
// </> 


        {/* <mesh 
            material-color={snap.items.main_second_screw}
            // material={materials.DefaultMaterial} 
            material={new THREE.MeshBasicMaterial({ color: new THREE.Color('#B6B6B6')})} 
            geometry={nodes.defaultMaterial001.geometry} 
          />
          <mesh 
            material-color={snap.items.main_front_screw}
            // material={materials.DefaultMaterial}
            material={new THREE.MeshBasicMaterial({ color: new THREE.Color('#B6B6B6')})} 
            geometry={nodes.defaultMaterial.geometry} 
            name="main front screw"

          /> */}


          {/* sub pipe screws */}
          {/* <mesh
            material-color={snap.items.first_sub_screw}
            // material={materials.DefaultMaterial}
            material={new THREE.MeshBasicMaterial({ color: new THREE.Color('#B6B6B6')})}
            geometry={nodes.defaultMaterial003.geometry}
            position={[-0.05, 0.04, 0]}
            scale={[0.23, 0.23, 1]}
            name="first sub screw"

          />
          <mesh
            material-color={snap.items.fourth_sub_screw}
            // material={materials.DefaultMaterial}
            material={new THREE.MeshBasicMaterial({ color: new THREE.Color('#B6B6B6')})}
            geometry={nodes.defaultMaterial005.geometry}
            position={[0.05, -0.04, 0]}
            scale={[0.23, 0.23, 1]}
            name="fourth sub screw"

          />
          <mesh
            material-color={snap.items.second_sub_screw}
            // material={materials.DefaultMaterial}
            material={new THREE.MeshBasicMaterial({ color: new THREE.Color('#B6B6B6')})}
            geometry={nodes.defaultMaterial007.geometry}
            position={[0.05, 0.04, 0]}
            scale={[0.23, 0.23, 1]}
            name="second sub screw"

          />
          <mesh
            material-color={snap.items.third_sub_screw}
            // material={materials.DefaultMaterial}
            material={new THREE.MeshBasicMaterial({ color: new THREE.Color('#B6B6B6')})}

            geometry={nodes.defaultMaterial009.geometry}
            position={[-0.05, -0.04, 0]}
            scale={[0.23, 0.23, 1]}
            name="main pipe"
          /> */}