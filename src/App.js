import React, { Suspense, useRef, useState, useEffect, } from "react"
import { Canvas, useFrame, useThree } from "react-three-fiber"
import { ContactShadows, Environment, useGLTF, OrbitControls, useAnimations } from "drei"
import { HexColorPicker } from "react-colorful"
import { proxy, useProxy } from "valtio"
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



function Car(props) {
  const group = useRef()
  const { nodes, materials } = useGLTF('alfa_romeo.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group scale={[0.1, 0.1, 0.1]}>
            <mesh
              material={materials.forMayaAOblinn6}
              geometry={nodes.forMayaAOpolySurface29_forMayaAOblinn6_0.geometry}
            />
            <mesh
              material={materials.forMayaAOblinn7}
              geometry={nodes.forMayaAOpolySurface29_forMayaAOblinn7_0.geometry}
            />
          </group>
          <group scale={[0.1, 0.1, 0.1]}>
            <mesh
              material={materials.forMayaAOmi_car_paint_phen2}
              geometry={nodes.forMayaAOpolySurface45_forMayaAOmi_car_paint_phen2_0.geometry}
            />
          </group>
          <group scale={[0.1, 0.1, 0.1]}>
            <mesh
              material={materials.forMayaAOmi_car_paint_phen2}
              geometry={nodes.forMayaAOpolySurface317_forMayaAOmi_car_paint_phen2_0.geometry}
            />
          </group>
          <group scale={[0.1, 0.1, 0.1]}>
            <mesh
              material={materials.forMayaAOmi_car_paint_phen2}
              geometry={nodes.forMayaAOpolySurface318_forMayaAOmi_car_paint_phen2_0.geometry}
            />
          </group>
          <group scale={[0.1, 0.1, 0.1]}>
            <mesh
              material={materials.forMayaAOmi_car_paint_phen2}
              geometry={nodes.forMayaAOpolySurface274_forMayaAOmi_car_paint_phen2_0.geometry}
            />
          </group>
          <group scale={[0.1, 0.1, 0.1]}>
            <mesh material={materials.Chrome} geometry={nodes.forMayaAOReshotka_Chrome_0.geometry} />
          </group>
          <group scale={[0.1, 0.1, 0.1]}>
            <mesh material={materials.forMayaAOAlpha} geometry={nodes.forMayaAOznachok_forMayaAOAlpha_0.geometry} />
          </group>
          <group scale={[0.1, 0.1, 0.1]}>
            <mesh
              material={materials.forMayaAOblinn6}
              geometry={nodes.forMayaAOpolySurface133_forMayaAOblinn6_0.geometry}
            />
          </group>
          <group scale={[0.1, 0.1, 0.1]}>
            <mesh
              material={materials.forMayaAOphong5}
              geometry={nodes.forMayaAOpolySurface197_forMayaAOphong5_0.geometry}
            />
          </group>
          <group scale={[0.1, 0.1, 0.1]}>
            <mesh material={materials.Chrome} geometry={nodes.forMayaAOpPipe6_Chrome_0.geometry} />
          </group>
          <group scale={[0.1, 0.1, 0.1]}>
            <mesh
              material={materials.forMayaAOlambert16}
              geometry={nodes.forMayaAOpCube4_forMayaAOlambert16_0.geometry}
            />
          </group>
          <group scale={[0.1, 0.1, 0.1]}>
            <mesh
              material={materials.forMayaAOlambert15}
              geometry={nodes.forMayaAOpCube1_forMayaAOlambert15_0.geometry}
            />
          </group>
          <group scale={[0.1, 0.1, 0.1]}>
            <mesh
              material={materials.forMayaAOblinn11}
              geometry={nodes.forMayaAOpolySurface148_forMayaAOblinn11_0.geometry}
            />
          </group>
          <group scale={[0.1, 0.1, 0.1]}>
            <mesh
              material={materials.forMayaAOblinn11}
              geometry={nodes.forMayaAOpolySurface149_forMayaAOblinn11_0.geometry}
            />
          </group>
          <group scale={[0.1, 0.1, 0.1]}>
            <mesh
              material={materials.forMayaAOblinn11}
              geometry={nodes.forMayaAOpolySurface150_forMayaAOblinn11_0.geometry}
            />
          </group>
          <group scale={[0.1, 0.1, 0.1]}>
            <mesh
              material={materials.forMayaAOblinn11}
              geometry={nodes.forMayaAOpolySurface151_forMayaAOblinn11_0.geometry}
            />
          </group>
          <group scale={[0.1, 0.1, 0.1]}>
            <mesh
              material={materials.forMayaAOlambert15}
              geometry={nodes.forMayaAOpolySurface168_forMayaAOlambert15_0.geometry}
            />
          </group>
          <group scale={[0.1, 0.1, 0.1]}>
            <mesh
              material={materials.forMayaAOmi_car_paint_phen2}
              geometry={nodes.forMayaAOpolySurface166_forMayaAOmi_car_paint_phen2_0.geometry}
            />
          </group>
          <group scale={[0.1, 0.1, 0.1]}>
            <mesh
              material={materials.forMayaAOlambert15}
              geometry={nodes.forMayaAOpolySurface171_forMayaAOlambert15_0.geometry}
            />
          </group>
          <group scale={[0.1, 0.1, 0.1]}>
            <mesh
              material={materials.forMayaAOphong5}
              geometry={nodes.forMayaAOpolySurface181_forMayaAOphong5_0.geometry}
            />
          </group>
          <group scale={[0.1, 0.1, 0.1]}>
            <mesh
              material={materials.forMayaAOmi_car_paint_phen2}
              geometry={nodes.forMayaAOpolySurface191_forMayaAOmi_car_paint_phen2_0.geometry}
            />
          </group>
          <group scale={[0.1, 0.1, 0.1]}>
            <mesh
              material={materials.forMayaAOphong5}
              geometry={nodes.forMayaAOpCylinder7_forMayaAOphong5_0.geometry}
            />
          </group>
          <group scale={[0.1, 0.1, 0.1]}>
            <mesh material={materials.forMayaAOnumber} geometry={nodes.forMayaAOnomer_forMayaAOnumber_0.geometry} />
          </group>
          <group scale={[0.1, 0.1, 0.1]}>
            <mesh material={materials.Chrome} geometry={nodes.forMayaAOpolySurface200_Chrome_0.geometry} />
            <mesh
              material={materials.forMayaAOGrill2}
              geometry={nodes.forMayaAOpolySurface200_forMayaAOGrill2_0.geometry}
            />
          </group>
          <group scale={[0.1, 0.1, 0.1]}>
            <mesh material={materials.forMayaAOblinn6} geometry={nodes.forMayaAOpSphere3_forMayaAOblinn6_0.geometry} />
            <mesh
              material={materials.forMayaAOblinn10}
              geometry={nodes.forMayaAOpSphere3_forMayaAOblinn10_0.geometry}
            />
          </group>
          <group position={[0, 0, 0]} scale={[0.1, 0.1, 0.1]}>
            <mesh material={materials.logo222} geometry={nodes.forMayaAOznachok1_logo222_0.geometry} />
          </group>
          <group scale={[0.1, 0.1, 0.1]}>
            <mesh
              material={materials.forMayaAOlambert16}
              geometry={nodes.forMayaAOpCube5_forMayaAOlambert16_0.geometry}
            />
          </group>
          <group scale={[0.1, 0.1, 0.1]}>
            <mesh
              material={materials.forMayaAOlambert15}
              geometry={nodes.forMayaAOpCube6_forMayaAOlambert15_0.geometry}
            />
          </group>
          <group scale={[0.1, 0.1, 0.1]}>
            <mesh
              material={materials.forMayaAOlambert13}
              geometry={nodes.forMayaAOpCylinder1_forMayaAOlambert13_0.geometry}
            />
          </group>
          <group scale={[0.1, 0.1, 0.1]}>
            <mesh material={materials.Chrome} geometry={nodes.forMayaAOpPipe5_Chrome_0.geometry} />
          </group>
          <group scale={[0.1, 0.1, 0.1]}>
            <mesh
              material={materials.forMayaAOlambert16}
              geometry={nodes.forMayaAOpCube9_forMayaAOlambert16_0.geometry}
            />
          </group>
          <group scale={[0.1, 0.1, 0.1]}>
            <mesh
              material={materials.forMayaAOlambert13}
              geometry={nodes.forMayaAOpCylinder8_forMayaAOlambert13_0.geometry}
            />
          </group>
          <group scale={[0.1, 0.1, 0.1]}>
            <mesh material={materials.Chrome} geometry={nodes.forMayaAOpolySurface292_Chrome_0.geometry} />
          </group>
          <group scale={[0.1, 0.1, 0.1]}>
            <mesh material={materials.Chrome_2} geometry={nodes.forMayaAOpolySurface83_Chrome_2_0.geometry} />
          </group>
          <group scale={[0.1, 0.1, 0.1]}>
            <mesh
              material={materials.forMayaAOfrontLights}
              geometry={nodes.forMayaAOfaraz2_forMayaAOfrontLights_0.geometry}
            />
          </group>
          <group scale={[0.1, 0.1, 0.1]}>
            <mesh
              material={materials.forMayaAOrear_lights}
              geometry={nodes.forMayaAOfaraz1_forMayaAOrear_lights_0.geometry}
            />
          </group>
          <group scale={[0.1, 0.1, 0.1]}>
            <mesh
              material={materials.forMayaAOblinn6}
              geometry={nodes.forMayaAOpolySurface309_forMayaAOblinn6_0.geometry}
            />
          </group>
          <group scale={[0.1, 0.1, 0.1]}>
            <mesh material={materials.Chrome} geometry={nodes.forMayaAOpolySurface295_Chrome_0.geometry} />
          </group>
          <group scale={[0.1, 0.1, 0.1]}>
            <mesh
              material={materials.forMayaAOmi_car_paint_phen2}
              geometry={nodes.forMayaAOpolySurface297_forMayaAOmi_car_paint_phen2_0.geometry}
            />
          </group>
          <group scale={[0.1, 0.1, 0.1]}>
            <mesh material={materials.Chrome} geometry={nodes.forMayaAOpCylinder10_Chrome_0.geometry} />
          </group>
          <group scale={[0.1, 0.1, 0.1]}>
            <mesh
              material={materials.forMayaAOfrontLights}
              geometry={nodes.forMayaAOpSphere2_forMayaAOfrontLights_0.geometry}
            />
          </group>
          <group scale={[0.1, 0.1, 0.1]}>
            <mesh material={materials.Chrome} geometry={nodes.forMayaAOpTorus1_Chrome_0.geometry} />
          </group>
          <group scale={[0.1, 0.1, 0.1]}>
            <mesh
              material={materials.forMayaAOlambert15}
              geometry={nodes.forMayaAOpolySurface310_forMayaAOlambert15_0.geometry}
            />
          </group>
          <group scale={[0.1, 0.1, 0.1]}>
            <mesh
              material={materials.forMayaAOlambert15}
              geometry={nodes.forMayaAOpCube12_forMayaAOlambert15_0.geometry}
            />
          </group>
          <group scale={[0.1, 0.1, 0.1]}>
            <mesh
              material={materials.forMayaAOlambert15}
              geometry={nodes.forMayaAOpCube15_forMayaAOlambert15_0.geometry}
            />
          </group>
          <group scale={[0.1, 0.1, 0.1]}>
            <mesh
              material={materials.forMayaAOlambert15}
              geometry={nodes.forMayaAOpCube11_forMayaAOlambert15_0.geometry}
            />
          </group>
          <group scale={[0.1, 0.1, 0.1]}>
            <mesh
              material={materials.forMayaAOlambert15}
              geometry={nodes.forMayaAOpCube13_forMayaAOlambert15_0.geometry}
            />
          </group>
          <group scale={[0.1, 0.1, 0.1]}>
            <mesh material={materials.Chrome} geometry={nodes.forMayaAOpolySurface316_Chrome_0.geometry} />
            <mesh
              material={materials.forMayaAOphong5}
              geometry={nodes.forMayaAOpolySurface316_forMayaAOphong5_0.geometry}
            />
          </group>
          <group scale={[0.1, 0.1, 0.1]}>
            <mesh material={materials.Chrome} geometry={nodes.forMayaAOpSphere7_Chrome_0.geometry} />
          </group>
          <group scale={[0.1, 0.1, 0.1]}>
            <mesh
              material={materials.forMayaAOblinn9}
              geometry={nodes.forMayaAOpolySurface266_forMayaAOblinn9_0.geometry}
            />
          </group>
          <group scale={[0.1, 0.1, 0.1]}>
            <mesh material={materials.Chrome} geometry={nodes.forMayaAOpolySurface221_Chrome_0.geometry} />
          </group>
          <group scale={[0.1, 0.1, 0.1]}>
            <mesh material={materials.Chrome} geometry={nodes.forMayaAOtruba_Chrome_0.geometry} />
            <mesh
              material={materials.forMayaAOlambert15}
              geometry={nodes.forMayaAOtruba_forMayaAOlambert15_0.geometry}
            />
            <mesh
              material={materials.forMayaAOmi_car_paint_phen2}
              geometry={nodes.forMayaAOtruba_forMayaAOmi_car_paint_phen2_0.geometry}
            />
          </group>
          <group scale={[0.1, 0.1, 0.1]}>
            <mesh
              material={materials.mafina2hdrilambert9}
              geometry={nodes.polySurface318_mafina2hdrilambert9_0.geometry}
            />
          </group>
          <group scale={[0.1, 0.1, 0.1]}>
            <mesh material={materials.forMayaAOphong5} geometry={nodes.polySurface319_forMayaAOphong5_0.geometry} />
            <mesh material={materials.Chrome} geometry={nodes.polySurface319_Chrome_0.geometry} />
          </group>
          <group scale={[0.1, 0.1, 0.1]}>
            <mesh
              material={materials.forMayaAOphong2}
              geometry={nodes.forMayaAOpolySurface320_forMayaAOphong2_0.geometry}
            />
          </group>
          <group scale={[0.1, 0.1, 0.1]}>
            <mesh
              material={materials.forMayaAOlambert17}
              geometry={nodes.forMayaAOpolySurface322_forMayaAOlambert17_0.geometry}
            />
            <mesh
              material={materials.forMayaAOlambert16}
              geometry={nodes.forMayaAOpolySurface322_forMayaAOlambert16_0.geometry}
            />
          </group>
          <group scale={[0.1, 0.1, 0.1]}>
            <mesh material={materials.Chrome} geometry={nodes.forMayaAOpolySurface324_Chrome_0.geometry} />
          </group>
          <group scale={[0.1, 0.1, 0.1]}>
            <mesh
              material={materials.forMayaAOlambert16}
              geometry={nodes.polySurface320_forMayaAOlambert16_0.geometry}
            />
          </group>
          <group scale={[0.1, 0.1, 0.1]}>
            <mesh
              material={materials.forMayaAOlambert16}
              geometry={nodes.forMayaAOpolySurface326_forMayaAOlambert16_0.geometry}
            />
          </group>
          <group scale={[0.1, 0.1, 0.1]}>
            <mesh
              material={materials.forMayaAOlambert17}
              geometry={nodes.forMayaAOpolySurface327_forMayaAOlambert17_0.geometry}
            />
            <mesh material={materials.Chrome} geometry={nodes.forMayaAOpolySurface327_Chrome_0.geometry} />
          </group>
          <group scale={[0.1, 0.1, 0.1]}>
            <mesh
              material={materials.forMayaAOblinn6}
              geometry={nodes.forMayaAOpCylinder11_forMayaAOblinn6_0.geometry}
            />
          </group>
          <group scale={[0.1, 0.1, 0.1]}>
            <mesh material={materials.forMayaAOblinn6} geometry={nodes.polySurface322_forMayaAOblinn6_0.geometry} />
            <mesh material={materials.forMayaAOblinn9} geometry={nodes.polySurface322_forMayaAOblinn9_0.geometry} />
          </group>
          <group scale={[0.1, 0.1, 0.1]}>
            <mesh material={materials.forMayaAOblinn9} geometry={nodes.polySurface5_forMayaAOblinn9_0.geometry} />
            <mesh material={materials.forMayaAOblinn6} geometry={nodes.polySurface5_forMayaAOblinn6_0.geometry} />
            <mesh material={materials.forMayaAOlambert16} geometry={nodes.polySurface5_forMayaAOlambert16_0.geometry} />
            <mesh material={materials.Chrome} geometry={nodes.polySurface5_Chrome_0.geometry} />
            <mesh material={materials.forMayaAOblinn7} geometry={nodes.polySurface5_forMayaAOblinn7_0.geometry} />
          </group>
          <group position={[-0.04, 0.09, 0.12]} rotation={[Math.PI / 2, 0, 0]} scale={[0, 0, 0]}>
            <group position={[-1, 0, 11]}>
              <mesh material={materials.Chrome_2} geometry={nodes.pTorus1_Chrome_2_0.geometry} />
            </group>
            <group position={[-1, 0.67, 11]} scale={[1.01, 0.9, 0.9]}>
              <mesh material={materials.lamp1} geometry={nodes.pCube1_lamp1_0.geometry} />
            </group>
            <group position={[27.08, 0, 11]}>
              <mesh material={materials.Chrome_2} geometry={nodes.pTorus2_Chrome_2_0.geometry} />
            </group>
            <group position={[27.08, 0.67, 11]} scale={[1.01, 0.9, 0.9]}>
              <mesh material={materials.lamp1} geometry={nodes.pCube2_lamp1_0.geometry} />
            </group>
          </group>
          <group scale={[0.1, 0.1, 0.1]}>
            <mesh
              material={materials.forMayaAOlambert15}
              geometry={nodes.forMayaAOpCylinder12_forMayaAOlambert15_0.geometry}
            />
          </group>
          <group scale={[0.1, 0.1, 0.1]}>
            <mesh material={materials.VRayMtl1} geometry={nodes.polySurface326_VRayMtl1_0.geometry} />
            <mesh material={materials.VRayMtl1} geometry={nodes.polySurface327_VRayMtl1_0.geometry} />
          </group>
          <group position={[0, 0.05, -0.05]} rotation={[-0.26, 0, 0]} scale={[0.1, 0.1, 0.1]}>
            <mesh material={materials.logo222} geometry={nodes.polySurface347_logo222_0.geometry} />
            <mesh material={materials.Chrome_2} geometry={nodes.polySurface347_Chrome_2_0.geometry} />
          </group>
          <group position={[0.02, 0.08, 0.03]} rotation={[1.78, 1.55, Math.PI]} scale={[0, 0, 0]}>
            <mesh material={materials.forMayaAOphong5} geometry={nodes.pSphere2_forMayaAOphong5_0.geometry} />
          </group>
          <group position={[0.02, 0.08, 0.03]} rotation={[1.78, 1.55, Math.PI]} scale={[0, 0, 0]}>
            <mesh material={materials.forMayaAOphong5} geometry={nodes.pSphere3_forMayaAOphong5_0.geometry} />
          </group>
          <group position={[0.03, 0.07, 0.03]} rotation={[1.78, 0.56, Math.PI]} scale={[0, 0, 0]}>
            <mesh material={materials.forMayaAOphong5} geometry={nodes.pSphere4_forMayaAOphong5_0.geometry} />
          </group>
          <group position={[0.03, 0.06, 0.02]} rotation={[1.78, -0.48, Math.PI]} scale={[0, 0, 0]}>
            <mesh material={materials.forMayaAOphong5} geometry={nodes.pSphere5_forMayaAOphong5_0.geometry} />
          </group>
          <group position={[0.04, 0.07, 0.03]} rotation={[1.78, 0.49, Math.PI]} scale={[0, 0, 0]}>
            <mesh material={materials.forMayaAOphong5} geometry={nodes.pSphere6_forMayaAOphong5_0.geometry} />
          </group>
          <group position={[0.04, 0.06, 0.02]} rotation={[1.78, -0.53, Math.PI]} scale={[0, 0, 0]}>
            <mesh material={materials.forMayaAOphong5} geometry={nodes.pSphere7_forMayaAOphong5_0.geometry} />
          </group>
          <group position={[-0.03, 0.08, -0.03]} rotation={[-0.08, -0.27, -0.02]} scale={[0, 0, 0]}>
            <mesh material={materials.miror} geometry={nodes.pCube4_miror_0.geometry} />
            <mesh material={materials.Chrome_2} geometry={nodes.pCube4_Chrome_2_0.geometry} />
          </group>
          <group position={[-0.31, 0.12, -0.03]} rotation={[Math.PI / 2, -0.2, 0.27]} scale={[0.1, 0.1, 0.1]}>
            <group position={[30.67, 0.51, -0.62]} rotation={[0.46, 0.25, 0]} scale={[0.16, 0.16, 0.16]}>
              <group rotation={[0, 0, 0]}>
                <mesh material={materials.chromedvorn} geometry={nodes.polySurface351_chromedvorn_0.geometry} />
              </group>
              <group rotation={[0, 0, 0]}>
                <mesh material={materials.chromedvorn} geometry={nodes.polySurface352_chromedvorn_0.geometry} />
              </group>
              <group rotation={[0, 0, 0]}>
                <mesh material={materials.chromedvorn} geometry={nodes.polySurface353_chromedvorn_0.geometry} />
              </group>
              <group rotation={[0, 0, 0]}>
                <mesh material={materials.rezinDvorn} geometry={nodes.polySurface354_rezinDvorn_0.geometry} />
              </group>
              <group rotation={[0, 0, 0]}>
                <mesh material={materials.chromedvorn} geometry={nodes.polySurface355_chromedvorn_0.geometry} />
              </group>
            </group>
            <group position={[0.33, 5.83, -0.37]} rotation={[0.09, -0.02, -0.15]}>
              <group position={[36.37, 2.64, -3.8]} rotation={[0, 0, -Math.PI / 2]} scale={[0.08, 0.11, 0.11]}>
                <mesh material={materials.Chrome_2} geometry={nodes.polySurface349_Chrome_2_0.geometry} />
              </group>
              <group position={[38.29, 0.53, -2.19]} rotation={[0, 0, -Math.PI / 2]} scale={[0.41, 5.55, 0.41]}>
                <mesh material={materials.chromedvorn} geometry={nodes.pCylinder4_chromedvorn_0.geometry} />
              </group>
              <group position={[0.14, 0, 1.9]} rotation={[0, 0.05, 0]}>
                <group
                  position={[40.24, 0.53, -2.19]}
                  rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
                  scale={[0.94, 0.94, 0.94]}>
                  <mesh material={materials.Chrome_2} geometry={nodes.pCylinder1_Chrome_2_0.geometry} />
                </group>
                <group position={[40.84, 0.53, -1.95]} rotation={[-Math.PI / 2, 0, 0]} scale={[0.41, 0.5, 0.41]}>
                  <mesh material={materials.chromedvorn} geometry={nodes.pCylinder2_chromedvorn_0.geometry} />
                </group>
                <group position={[40.84, 0.53, -1.93]} rotation={[-Math.PI / 2, 0, 0]} scale={[0.46, 0.56, 0.46]}>
                  <mesh material={materials.rezinDvorn} geometry={nodes.pCylinder3_rezinDvorn_0.geometry} />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}



export default function App() {
  return (
    <> 
    <Canvas        
        pixelRatio={window.devicePixelRatio}
        className="container"
        concurrent
        camera={{ position: [0, 0, 2.5], }}
        >
      <ambientLight intensity={0.3} />
      <pointLight position={[20, 20, 20]} />
        <spotLight intensity={0.3} angle={0.1} penumbra={1} position={[5, 25, 20]} />
        <Suspense fallback={null}>
             {/* <Shoe /> */}
            <Model/>
          
           {/* <ContactShadows rotation-x={Math.PI / 2} position={[0, -1, 0]} opacity={1} width={1} height={1}  blur={1} far={1} /> */}
        </Suspense>
        <OrbitControls minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} enableZoom={true} enablePan={false} />
      </Canvas>

          <img src="./fortnite_logo.png" className="title" width="400" />
    </>
  )
}
