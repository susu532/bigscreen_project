import { 
  EffectComposer, 
  Bloom, 
  ChromaticAberration, 
  Vignette,
  Noise,
  SMAA
} from '@react-three/postprocessing'
import { BlendFunction, KernelSize } from 'postprocessing'
import { useSceneStore, qualityPresets } from '../hooks/useSceneStore'

export default function Effects() {
  const { effects, quality, debugMode } = useSceneStore()
  const qualityConfig = qualityPresets[quality]

  return (
    <EffectComposer 
      multisampling={0}
      disableNormalPass={!debugMode}
    >
      <SMAA />
      {effects.bloom ? (
        <Bloom 
          intensity={qualityConfig.bloomIntensity}
          luminanceThreshold={0.6}
          luminanceSmoothing={0.9}
          kernelSize={KernelSize.LARGE}
          mipmapBlur
        />
      ) : null}
      {effects.chromatic ? (
        <ChromaticAberration 
          blendFunction={BlendFunction.NORMAL}
          offset={[0.0005, 0.0005]}
        />
      ) : null}
      {effects.vignette ? (
        <Vignette 
          blendFunction={BlendFunction.NORMAL}
          darkness={0.3}
          offset={0.5}
        />
      ) : null}
      {effects.noise ? (
        <Noise 
          blendFunction={BlendFunction.SOFT_LIGHT}
          premultiply
        />
      ) : null}
    </EffectComposer>
  )
}
