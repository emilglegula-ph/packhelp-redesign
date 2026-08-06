import { useRef, useState } from 'react'
import { imgLogo, imgZoomIn, imgZoomOut } from '../assets/figma'
import Scene, { type SceneApi } from '../three/Scene'
import type { DimensionField } from '../App'

interface PreviewPanelProps {
  width: number
  length: number
  height: number
  sizeMode: 'external' | 'product'
  productBufferMm: number
  focusedDimension: DimensionField | null
  onInteractionStart: () => void
  closureFlipped: boolean
  showPattern: boolean
}

export default function PreviewPanel({
  width,
  length,
  height,
  sizeMode,
  productBufferMm,
  focusedDimension,
  onInteractionStart,
  closureFlipped,
  showPattern,
}: PreviewPanelProps) {
  const [side, setSide] = useState<'front' | 'back'>('front')
  const [openness, setOpenness] = useState(0)
  const [zoom, setZoom] = useState(100)
  const sceneApiRef = useRef<SceneApi | null>(null)

  return (
    <div className="relative ml-3 my-3 flex h-[calc(100%-24px)] flex-1 items-center justify-center overflow-hidden rounded-[32px] bg-grey-100">
      <a href="../../index.html" className="group absolute left-6 top-6 z-10 flex flex-col items-start">
        <span className="absolute -inset-3 -z-10 rounded-2xl bg-white opacity-0 shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition-opacity duration-150 group-hover:opacity-100" />
        <img src={imgLogo} alt="Packhelp" className="h-[25px] w-auto" />
        <span className="pointer-events-none mt-2 flex items-center gap-1 whitespace-nowrap text-[13px] leading-[1.32] tracking-[-0.26px] text-grey-600 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M11 7H3M3 7L6.5 3.5M3 7L6.5 10.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Wróć
        </span>
      </a>

      <Scene
        apiRef={sceneApiRef}
        onZoomChange={setZoom}
        className="size-full"
        width={width}
        length={length}
        height={height}
        sizeMode={sizeMode}
        productBufferMm={productBufferMm}
        focusedDimension={focusedDimension}
        onInteractionStart={onInteractionStart}
        flipped={closureFlipped}
        showPattern={showPattern}
      />

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-8">
        <div className="flex h-9 items-center gap-1 rounded-full bg-black/[0.04] p-1 backdrop-blur-[5px]">
          <button
            type="button"
            onClick={() => setSide('front')}
            className={`flex h-7 cursor-pointer items-center justify-center rounded-full px-4 text-[13px] leading-[1.32] tracking-[-0.26px] transition-colors ${
              side === 'front'
                ? 'bg-gradient-to-b from-white to-grey-100 text-richblue shadow-[0_2px_2px_rgba(0,0,0,0.08)]'
                : 'text-grey-600 hover:text-richblue'
            }`}
          >
            3D view
          </button>
          <button
            type="button"
            onClick={() => setSide('back')}
            className={`flex h-7 cursor-pointer items-center justify-center rounded-full px-4 text-[13px] leading-[1.32] tracking-[-0.26px] transition-colors ${
              side === 'back'
                ? 'bg-gradient-to-b from-white to-grey-100 text-richblue shadow-[0_2px_2px_rgba(0,0,0,0.08)]'
                : 'text-grey-600 hover:text-richblue'
            }`}
          >
            2D view
          </button>
        </div>

        <div className="flex h-9 items-center rounded-full bg-richblue/[0.04]">
          <button
            type="button"
            onClick={() => sceneApiRef.current?.zoomOut()}
            className="m-1 flex size-7 cursor-pointer items-center justify-center rounded-full bg-gradient-to-b from-white to-grey-100 shadow-[0_2px_2px_rgba(0,0,0,0.08)] transition-[filter] hover:brightness-95"
          >
            <img src={imgZoomOut} alt="Zoom out" className="size-4" />
          </button>
          <span className="w-12 shrink-0 text-center text-[13px] leading-[1.32] tracking-[-0.26px] text-grey-600">
            {zoom}%
          </span>
          <button
            type="button"
            onClick={() => sceneApiRef.current?.zoomIn()}
            className="m-1 flex size-7 cursor-pointer items-center justify-center rounded-full bg-gradient-to-b from-white to-grey-100 shadow-[0_2px_2px_rgba(0,0,0,0.08)] transition-[filter] hover:brightness-95"
          >
            <img src={imgZoomIn} alt="Zoom in" className="size-4" />
          </button>
        </div>

        <div className="flex h-9 items-center gap-1 rounded-full bg-black/[0.04] p-1 backdrop-blur-[5px]">
          <button
            type="button"
            onClick={() => setOpenness(0)}
            className={`flex h-7 cursor-pointer items-center justify-center rounded-full px-4 text-[13px] leading-[1.32] tracking-[-0.26px] transition-colors ${
              openness === 0
                ? 'bg-gradient-to-b from-white to-grey-100 text-richblue shadow-[0_2px_2px_rgba(0,0,0,0.08)]'
                : 'text-grey-600 hover:text-richblue'
            }`}
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => setOpenness(100)}
            className={`flex h-7 cursor-pointer items-center justify-center rounded-full px-4 text-[13px] leading-[1.32] tracking-[-0.26px] transition-colors ${
              openness === 100
                ? 'bg-gradient-to-b from-white to-grey-100 text-richblue shadow-[0_2px_2px_rgba(0,0,0,0.08)]'
                : 'text-grey-600 hover:text-richblue'
            }`}
          >
            Open
          </button>
        </div>
      </div>
    </div>
  )
}
