import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import { CM_TO_UNITS, computeBoxSize, computeTag, hangHole } from './dielineGeometry'
import { createSlotPath, createTagShape } from './shapeHelpers'
import { imgKraftTexture, imgPrintPattern1 } from '../assets/figma'

interface BoxModelProps {
  width: number
  length: number
  height: number
  /** True while a closure option is hovered/clicked -- eases the box toward
   *  a tilted pose revealing its underside, and back once it goes false. */
  flipped: boolean
  /** "Size of my product" mode, focused on a dimension field: ghost the walls
   *  and reveal the product placeholder sized to fit inside them. */
  showProduct: boolean
  /** Print === "Custom" -- tiles the pattern texture over the box instead
   *  of the plain kraft grain. */
  showPattern: boolean
}

// Physical size (world units, 4cm at CM_TO_UNITS scale) one pattern tile
// repeats at, so it reads as a printed pattern rather than one image
// stretched across the whole face.
const PATTERN_TILE_UNITS = 4 * CM_TO_UNITS

const PRODUCT_COLOR = '#7c8f5f'
// Purely illustrative -- exaggerated well past the real (often just a few
// mm) construction buffer so the placeholder actually reads as "a smaller
// product inside the box" instead of disappearing into it.
const PRODUCT_VISUAL_SCALE = 0.82

// The box's width axis, level (no diagonal/vertical component so left-right
// and front-back stay put -- only pitch changes). A partial (not full 180
// degree) forward tip around it swings the front face down and the
// underside up into view, while the top stays visible too, rather than
// fully inverting the box (and, with it, the hang tag, which would
// otherwise swing underneath like a broken leg).
const FLIP_AXIS = new THREE.Vector3(-1, 0, 0).normalize()
const FLIP_ANGLE = THREE.MathUtils.degToRad(125)
const FLIPPED_QUAT = new THREE.Quaternion().setFromAxisAngle(FLIP_AXIS, FLIP_ANGLE)
const IDLE_QUAT = new THREE.Quaternion()

const TRANSITION_DURATION = 0.9

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

export default function BoxModel({
  width,
  length,
  height,
  flipped,
  showProduct,
  showPattern,
}: BoxModelProps) {
  const kraftMap = useTexture(imgKraftTexture)
  kraftMap.colorSpace = THREE.SRGBColorSpace
  kraftMap.anisotropy = 8

  const patternMap = useTexture(imgPrintPattern1)
  patternMap.colorSpace = THREE.SRGBColorSpace
  patternMap.anisotropy = 8
  patternMap.wrapS = THREE.RepeatWrapping
  patternMap.wrapT = THREE.RepeatWrapping

  const boxSize = useMemo(() => computeBoxSize(width, length, height), [width, length, height])
  patternMap.repeat.set(boxSize.x / PATTERN_TILE_UNITS, boxSize.y / PATTERN_TILE_UNITS)

  const boxMap = showPattern ? patternMap : kraftMap
  const productSize = useMemo(
    () => ({
      x: boxSize.x * PRODUCT_VISUAL_SCALE,
      y: boxSize.y * PRODUCT_VISUAL_SCALE,
      z: boxSize.z * PRODUCT_VISUAL_SCALE,
    }),
    [boxSize],
  )
  const tag = useMemo(() => computeTag(boxSize.x), [boxSize.x])
  const pivotY = (boxSize.y + tag.height) / 2

  const pivotRef = useRef<THREE.Group>(null)
  // 0 = idle pose, 1 = fully flipped -- eased toward whichever `flipped`
  // currently points at each frame, so a direction change mid-transition
  // (e.g. hover leaving right as the box was still tilting up) reverses
  // smoothly from wherever it already got to, rather than snapping or
  // waiting for a fixed hold to finish first.
  const progress = useRef(0)

  useFrame((_, rawDelta) => {
    const group = pivotRef.current
    const target = flipped ? 1 : 0
    if (!group || progress.current === target) return

    // Clamp only truly pathological stalls (tab backgrounded for a while) so
    // the animation can't visibly teleport -- a low but sustained frame rate
    // should still drive it at roughly correct wall-clock speed.
    const delta = Math.min(rawDelta, 0.25)
    const step = delta / TRANSITION_DURATION
    progress.current =
      target > progress.current
        ? Math.min(target, progress.current + step)
        : Math.max(target, progress.current - step)

    group.quaternion.slerpQuaternions(IDLE_QUAT, FLIPPED_QUAT, easeInOutCubic(progress.current))
  })

  const tagGeometry = useMemo(() => {
    const shape = createTagShape(tag.width, tag.bodyHeight, tag.capHeight, tag.cornerRadius)
    const holePath = createSlotPath(
      hangHole.width,
      hangHole.height,
      tag.width / 2,
      tag.height - hangHole.offsetFromTop,
    )
    shape.holes.push(holePath)

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: tag.thickness,
      bevelEnabled: false,
      curveSegments: 24,
    })

    // ExtrudeGeometry's default UV generator uses raw shape-space vertex
    // coordinates as UVs (not normalized to 0-1), which leaves texture
    // coordinates far outside the usual range and clamps to a single edge
    // pixel. Normalize them against the tag's own bounding box instead, so
    // the same texture is mapped across it like it is on the box faces.
    const uv = geometry.attributes.uv
    for (let i = 0; i < uv.count; i++) {
      uv.setXY(i, uv.getX(i) / tag.width, uv.getY(i) / tag.height)
    }
    uv.needsUpdate = true

    geometry.translate(-tag.width / 2, 0, -tag.thickness / 2)
    return geometry
  }, [tag])

  return (
    // Rotate around the box's vertical center (not its base) so the tumble
    // stays roughly in place instead of swinging the tag off-frame.
    <group position={[0, pivotY, 0]} ref={pivotRef}>
      <group position={[0, -pivotY, 0]}>
        {/* Box body */}
        <mesh key={`body-${showProduct}`} position={[0, boxSize.y / 2, 0]} castShadow receiveShadow>
          <boxGeometry args={[boxSize.x, boxSize.y, boxSize.z]} />
          <meshStandardMaterial
            map={boxMap}
            roughness={0.92}
            metalness={0}
            toneMapped={false}
            transparent={showProduct}
            opacity={showProduct ? 0.5 : 1}
            depthWrite={!showProduct}
          />
        </mesh>

        {/* Hang tag, standing up from the back top edge */}
        <mesh
          key={`tag-${showProduct}`}
          position={[0, boxSize.y, -boxSize.z / 2]}
          geometry={tagGeometry}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial
            map={boxMap}
            roughness={0.92}
            metalness={0}
            side={THREE.DoubleSide}
            toneMapped={false}
            transparent={showProduct}
            opacity={showProduct ? 0.5 : 1}
            depthWrite={!showProduct}
          />
        </mesh>

        {/* Product placeholder -- sized to what was typed, resting on the
            box floor, revealed only while the walls are ghosted. */}
        {showProduct && (
          <mesh position={[0, productSize.y / 2, 0]} castShadow receiveShadow>
            <boxGeometry args={[productSize.x, productSize.y, productSize.z]} />
            <meshStandardMaterial color={PRODUCT_COLOR} roughness={0.75} metalness={0} />
          </mesh>
        )}
      </group>
    </group>
  )
}
