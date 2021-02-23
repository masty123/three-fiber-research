import React, { Suspense, useRef, useState, useEffect, } from "react"
import { Canvas, useFrame, useThree,  } from "react-three-fiber"
import { ContactShadows,  useGLTF, OrbitControls, useAnimations, Plane, } from "drei"
import { HexColorPicker } from "react-colorful"
import { proxy, useProxy } from "valtio"
import * as THREE from "three"
import { Vector3 } from "three"
// Using a Valtio state model to bridge reactivity between
// the canvas and the dom, both can write to it and/or react to it.
const dummy = new THREE.Vector3()
const lookAtPos = new THREE.Vector3()

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
  const [zoom, setZoom] = useState(false)
  // const { setDefaultCamera } = useThree()
  // // Make the camera known to the system
  // useEffect(() => void setDefaultCamera(camRef.current), [])
  // // Update it every frame
  // useFrame(() => camRef.current.updateMatrixWorld())
  // ------------------------------------------- //


  const group = useRef();
  const snap = useProxy(state);
  // const snap = useProxy(state_2);
  const { nodes, materials } = useGLTF('pipes_within_pipe.glb');
  const [hover, set] = useState(null)
  const [hovered, setHover] = useState(false)

  useFrame((state, delta) => {
    const step = 0.1
    state.camera.fov = THREE.MathUtils.lerp(state.camera.fov, zoom ? 40 : 20, step)
    state.camera.position.lerp(dummy.set(
      zoom ? 1 : 3, 
      zoom ? 0 : 2, 
      zoom ? 2 : 2), 
      step)

    // lookAtPos.x = Math.sin(state.clock.getElapsedTime() * 2)

    state.camera.lookAt(lookAtPos)
    state.camera.updateProjectionMatrix()
  })


  return (
    <>
    {/* <perspectiveCamera ref={camRef} position={[0,0,0]}  zoom={1}  /> */}

    <group ref={group} {...props} dispose={null} position={[0,0,0]}
      // onPointerOver   = {(e) => (e.stopPropagation(), set(e.object.name))}
      onClick={(e) =>   setZoom((zoom) => !zoom)}
      onPointerOver = {(e) => {
        e.stopPropagation(); 
        if(e.object.name.includes("sub")){
          state.current = e.object.name;
          state.items[e.object.name] = "#F6653E";
        }
        else {
          state.current = e.object.name;
          state.items[e.object.name] = "#F4FF02";
        }
        set(e.object.name);        
      }}
      onPointerOut    = {(e) => {e.intersections.length=== 0 && set(null); state.items[e.object.name] = "#999999";}}
      // onPointerDown   = {(e) => {e.stopPropagation(); state.current = e.object.name;}}
      onPointerMissed = {(e) => {state.current = null}}
       
      // onUpdate={(e) => { state_2.items = e.children;}}


      // onClick={(event) => setActive(!active)}
      // onPointerOver={(event) => setHover(true)}
      // onPointerOut={(event) => setHover(false)}
    >
          <mesh 
            material-color={snap.items.main_pipe}
            // material={materials.DefaultMaterial} 
            geometry={nodes.defaultMaterial002.geometry} 
            name="main_pipe"
            sub_count={4}
            castShadow
          >
                  <meshToonMaterial  color={'#999999'} />
          </mesh>

          <mesh
            material-color={snap.items.sub_pipe_01}
            // material={materials.DefaultMaterial}
            geometry={nodes.defaultMaterial004.geometry}
            position={[-0.05, 0.04, 0]}
            scale={[0.23, 0.23, 1]}
            name="sub_pipe_01"
          >
                <meshToonMaterial color={'#999999'} />
          </mesh>

          <mesh
            material-color={snap.items.sub_pipe_02}
            // material={materials.DefaultMaterial}
            geometry={nodes.defaultMaterial008.geometry}
            position={[0.05, 0.04, 0]}
            scale={[0.23, 0.23, 1]}
            name="sub_pipe_02"
          >
               <meshToonMaterial color={'#999999'} />
          </mesh>

          <mesh
            material-color={snap.items.sub_pipe_03}
            // material={materials.DefaultMaterial}
            // material={new THREE.MeshBasicMaterial({ color: new THREE.Color('green')})}
            geometry={nodes.defaultMaterial010.geometry}
            position={[-0.05, -0.04, 0]}
            scale={[0.23, 0.23, 1]}
            name="sub_pipe_03"        
          >
                  <meshToonMaterial color={'#999999'} />
          </mesh>

          <mesh
            material-color={snap.items.sub_pipe_04}
            // material={materials.DefaultMaterial}
            geometry={nodes.defaultMaterial006.geometry}
            position={[0.05, -0.04, 0]}
            scale={[0.23, 0.23, 1]}
            name="sub_pipe_04"
            
          >
                <meshToonMaterial color={'#999999'} />
          </mesh>

       
  
    </group>
    <OrbitControls 
          // minPolarAngle={Math.PI / 2} 
          // maxPolarAngle={Math.PI / 2} 
          enableZoom={true} 
          enablePan={true} />
    </>
  )
}

function Picker(){
    const snap = useProxy(state);
    return (
      <div className="picker" /*style={{display: snap.current ? "block" : "none"}}*/ style={{display: "block"}}>
            {/* <HexColorPickercolor={snap.items[snap.current]} onChange={(color) => (state.items[snap.current] = color)}/> */}
            <h1>{!snap.current ? "Main Duct Location: Kasetsart University" : null}</h1>
            <h2>{snap.current && !snap.current.includes("sub")? "Sub Duct: 4": null}</h2>
            <h2>{snap.current == "sub_pipe_01" ? "Fiber Line: "+snap.sub_items.sub_pipe_01: null} </h2>
            <h2>{snap.current == "sub_pipe_02" ? "Fiber Line: "+snap.sub_items.sub_pipe_02: null} </h2>
            <h2>{snap.current == "sub_pipe_03" ? "Fiber Line: "+snap.sub_items.sub_pipe_03: null} </h2>
            <h2>{snap.current == "sub_pipe_04" ? "Fiber Line: "+snap.sub_items.sub_pipe_04: null} </h2>
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

const state_2 = proxy({
  current: null,
  items: [],
})


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
    let points = []
    // Define points along Z axis
    for (let i = 0; i < 50; i += 1)
      points.push(new THREE.Vector3(1 - Math.random() * 2, 1 - Math.random() * 2, 10 * (i / 4)))
      // points.push(new THREE.Vector3(1, 1, 1))
    return new THREE.CatmullRomCurve3(points)
  })


  return (
    
    <>  
        <Canvas        
         pixelRatio={window.devicePixelRatio}
         className="container"
         concurrent
         shadowMap
         >
          {/* <Camera position={[0, 0, 2]} /> */}
          <directionalLight intensity={0.5} castShadow shadow-mapSize-height={512} shadow-mapSize-width={512}/>
          {/* <spotLight intensity={0.3} angle={0.1} penumbra={1} position={[5, 25, 20]} /> */}
          {/* <fog attach="fog" args={["white", 0, 40]} /> */}
          <ambientLight intensity={0.1} />
          <Suspense fallback={null}>
             <Pipe/>      
            <Plane receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} args={[5, 5]}>
                <meshStandardMaterial attach="material" color="white" />
            </Plane>

           {/* <ContactShadows rotation-x={Math.PI / 2} position={[0, -1, 0]} opacity={1} width={1} height={1}  blur={1} far={1} /> */}

         </Suspense>
    
       </Canvas>
       <Picker/>
    </>
  
  )
}



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
     
//      {/* <Cylinder/> */}
//      <mesh>
//             <tubeGeometry args={[curve, 2, 10, 50, true]}/>
//             <meshStandardMaterial attach="material" color="green" /> 
//      </mesh>
     
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