import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Center, Environment, useGLTF } from '@react-three/drei'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function AnimatedProduct() {
  const productRef = useRef(null)
  const elapsedRef = useRef(0)
  const [reduceMotion, setReduceMotion] = useState(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const { scene } = useGLTF('/models/aura-one.glb')

  // Follow the operating system's reduced-motion preference.
  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const updateMotionPreference = (event) => {
      setReduceMotion(event.matches)
    }

    motionQuery.addEventListener('change', updateMotionPreference)

    return () => {
      motionQuery.removeEventListener('change', updateMotionPreference)
    }
  }, [])

  // A subtle float that stops when reduced motion is requested.
  useFrame((_, delta) => {
    if (!productRef.current) return

    if (reduceMotion) {
      productRef.current.position.y = 0
      return
    }

    elapsedRef.current += delta
    productRef.current.position.y =
      Math.sin(elapsedRef.current * 1.2) * 0.08
  })

  // Scroll-driven rotation is enabled only when motion is allowed.
  useGSAP(
    () => {
      const media = gsap.matchMedia()

      media.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.to(productRef.current.rotation, {
          y: Math.PI * 2,
          ease: 'none',
          scrollTrigger: {
            trigger: '.product-visual',
            start: 'top 70%',
            end: 'bottom 20%',
            scrub: 1,
            invalidateOnRefresh: true,
          },
        })
      })

      return () => media.revert()
    },
    { dependencies: [] },
  )

  return (
    <group ref={productRef}>
      <Center>
        <primitive object={scene} scale={6} dispose={null} />
      </Center>
    </group>
  )
}

// A Three.js object is used as the in-canvas loading fallback.
function LoadingObject() {
  const ringRef = useRef(null)

  useFrame((_, delta) => {
    if (!ringRef.current) return

    ringRef.current.rotation.z += delta * 1.5
  })

  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[0.22, 0.035, 12, 48]} />
      <meshStandardMaterial color="#756f64" />
    </mesh>
  )
}

function ProductScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 5], fov: 35 }}
      gl={{ antialias: true, alpha: true }}
      aria-label="Interactive 3D model of AURA One headphones"
      role="img"
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.9} />

      <directionalLight position={[3, 4, 5]} intensity={2} />

      <Environment preset="studio" />

      <Suspense fallback={<LoadingObject />}>
        <AnimatedProduct />
      </Suspense>
    </Canvas>
  )
}

export default ProductScene
