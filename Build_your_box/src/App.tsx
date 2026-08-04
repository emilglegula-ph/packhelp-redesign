import { useRef, useState } from 'react'
import PreviewPanel from './components/PreviewPanel'
import Sidebar from './components/Sidebar'
import {
  DEFAULT_PRODUCT_BUFFER_MM,
  MAX_PRODUCT_BUFFER_MM,
  MIN_PRODUCT_BUFFER_MM,
} from './three/dielineGeometry'

export type DimensionField = 'width' | 'length' | 'height'

// How long a click (no sustained hover, e.g. touch/keyboard) keeps the
// closure reveal up on its own -- matches the old click-only hold length.
const CLOSURE_CLICK_HOLD_MS = 1400

function App() {
  const [sizeMode, setSizeMode] = useState<'external' | 'product'>('external')
  const [width, setWidth] = useState(8)
  const [length, setLength] = useState(8)
  const [height, setHeight] = useState(12)
  const [productBufferMm, setProductBufferMm] = useState(DEFAULT_PRODUCT_BUFFER_MM)
  const [focusedDimension, setFocusedDimension] = useState<DimensionField | null>(null)
  const [closureHovered, setClosureHovered] = useState(false)
  const [closureClickPulse, setClosureClickPulse] = useState(false)
  const closurePulseTimeout = useRef<ReturnType<typeof setTimeout>>(undefined)

  // Hovering a Closure option previews the reveal live; clicking one (with
  // no hover backing it, e.g. touch or keyboard activation) pulses the same
  // reveal for a fixed hold so it's still visible without a pointer parked
  // on the chip. If the pointer is already hovering when the click lands,
  // this pulse is redundant with (and simply outlasted by) the hover state.
  const handleClosureClick = () => {
    setClosureClickPulse(true)
    clearTimeout(closurePulseTimeout.current)
    closurePulseTimeout.current = setTimeout(() => setClosureClickPulse(false), CLOSURE_CLICK_HOLD_MS)
  }
  const closureFlipped = closureHovered || closureClickPulse

  const changeProductBuffer = (delta: number) =>
    setProductBufferMm((mm) =>
      Math.min(MAX_PRODUCT_BUFFER_MM, Math.max(MIN_PRODUCT_BUFFER_MM, mm + delta)),
    )

  return (
    <div className="flex h-screen w-screen items-start gap-3 bg-white">
      <PreviewPanel
        width={width}
        length={length}
        height={height}
        sizeMode={sizeMode}
        productBufferMm={productBufferMm}
        focusedDimension={focusedDimension}
        onInteractionStart={() => setFocusedDimension(null)}
        closureFlipped={closureFlipped}
      />
      <Sidebar
        sizeMode={sizeMode}
        onSizeModeChange={setSizeMode}
        width={width}
        length={length}
        height={height}
        onWidthChange={setWidth}
        onLengthChange={setLength}
        onHeightChange={setHeight}
        productBufferMm={productBufferMm}
        onProductBufferIncrease={() => changeProductBuffer(1)}
        onProductBufferDecrease={() => changeProductBuffer(-1)}
        focusedDimension={focusedDimension}
        onFocusDimension={setFocusedDimension}
        onClosureClick={handleClosureClick}
        onClosureHoverChange={setClosureHovered}
      />
    </div>
  )
}

export default App
