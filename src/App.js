import React, { Suspense, useRef, useState, useEffect, } from "react"
import { Canvas, useFrame,  } from "react-three-fiber"
import { ContactShadows,  useGLTF, OrbitControls, useAnimations, } from "drei"
import { HexColorPicker } from "react-colorful"
import { proxy, useProxy } from "valtio"
import * as THREE from "three"
// Using a Valtio state model to bridge reactivity between
// the canvas and the dom, both can write to it and/or react to it.


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
  const group = useRef()
  const snap = useProxy(state);
  const { nodes, materials } = useGLTF('pipes_within_pipe.glb');
  const [hover, set] = useState(null)
  const [hovered, setHover] = useState(false)
  return (
    <group ref={group} {...props} dispose={null}
      // onPointerOver   = {(e) => (e.stopPropagation(), set(e.object.name))}
      onPointerOver = {(e) => {
        e.stopPropagation(); 
        if(e.object.name.includes("sub")){
          state.items[e.object.name] = "#00FD68";  
        }else {
          state.items[e.object.name] = "#F4FF02";  
        }
        set(e.object.name);
      }}
      onPointerOut    = {(e) => {e.intersections.length=== 0 && set(null); state.items[e.object.name] = "#999999";}}
      onPointerDown   = {(e) => {e.stopPropagation(); state.current = e.object.name;}}
      onPointerMissed = {(e) => {state.current = null}}
      // onClick={(event) => setActive(!active)}
      // onPointerOver={(event) => setHover(true)}
      // onPointerOut={(event) => setHover(false)}
    >
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          {/* main pipe screws */}
  


          {/* Big Pipe */}
          <mesh 
            material-color={snap.items.big_pipe}
            // material={materials.DefaultMaterial} 
            name="big_pipe"
            geometry={nodes.defaultMaterial002.geometry} 
          >
                  <meshToonMaterial  color={'#999999'} />
          </mesh>
          <mesh
            material-color={snap.items.first_sub_pipe}
            // material={materials.DefaultMaterial}
            // material={new THREE.MeshBasicMaterial({ color: new THREE.Color('red')})}
            geometry={nodes.defaultMaterial004.geometry}
            position={[-0.05, 0.04, 0]}
            scale={[0.23, 0.23, 1]}
            name="first_sub_pipe"
          >
                <meshToonMaterial color={'#999999'} />

          </mesh>
          <mesh
            material-color={snap.items.fourth_sub_pipe}
            // material={materials.DefaultMaterial}
            // material={new THREE.MeshBasicMaterial({ color: new THREE.Color('blue')})}
            geometry={nodes.defaultMaterial006.geometry}
            position={[0.05, -0.04, 0]}
            scale={[0.23, 0.23, 1]}
            name="fourth_sub_pipe"
          >
                <meshToonMaterial color={'#999999'} />

          </mesh>
          <mesh
            material-color={snap.items.second_sub_pipe}
            // material={materials.DefaultMaterial}
            // material={new THREE.MeshBasicMaterial({ color: new THREE.Color('yellow')})}
            geometry={nodes.defaultMaterial008.geometry}
            position={[0.05, 0.04, 0]}
            scale={[0.23, 0.23, 1]}
            name="second_sub_pipe"

          >
               <meshToonMaterial color={'#999999'} />
          </mesh>
          <mesh
            material-color={snap.items.third_sub_pipe}
            // material={materials.DefaultMaterial}
            // material={new THREE.MeshBasicMaterial({ color: new THREE.Color('green')})}
            geometry={nodes.defaultMaterial010.geometry}
            position={[-0.05, -0.04, 0]}
            scale={[0.23, 0.23, 1]}
            name="third_sub_pipe"

          >
                  <meshToonMaterial color={'#999999'} />
          </mesh>
        </group>
      </group>
    </group>
  )
}

function Picker(){
    const snap = useProxy(state);
    return (
      <div className="picker" style={{display: snap.current ? "block" : "none"}}>
            {/* <HexColorPicker
              color={snap.items[snap.current]}
              onChange={(color) => (state.items[snap.current] = color)}
            /> */}
            <h1>{snap.current}</h1>
      </div>
    )
}



const state = proxy({
  current: null,
  items: {
    mat_01: "#999999",
    main_front_screw: "#999999",
    first_sub_screw: "#999999",
    fourth_sub_screw: "#999999",
    second_sub_screw: "#999999",
    third_sub_screw: "#999999",
    big_pipe: "#999999",
    first_sub_pipe: "#999999",
    fourth_sub_pipe: "#999999",
    second_sub_pipe: "#999999",
    third_sub_pipe: "#999999",
  }
})



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
         camera={{ position: [0, 0, 1.25], }}
         >
        <ambientLight intensity={0.3} />
        <pointLight position={[20, 20, 20]} />
          <spotLight intensity={0.3} angle={0.1} penumbra={1} position={[5, 25, 20]} />
          <Suspense fallback={null}>
                <Pipe/>
            <ContactShadows rotation-x={Math.PI / 2} position={[0, -1, 0]} opacity={1} width={1} height={1}  blur={1} far={1} />
         </Suspense>
         <OrbitControls minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} enableZoom={true} enablePan={false} />
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