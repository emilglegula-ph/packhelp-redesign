import { useEffect, useRef, useState } from 'react'
import OptionGroup from './OptionGroup'
import Chip from './Chip'
import SizeSection from './SizeSection'
import FinishSection from './FinishSection'
import QuantitySection from './QuantitySection'
import SummarySection from './SummarySection'
import StickyDeliveryBar from './StickyDeliveryBar'
import type { DimensionField } from '../App'
import {
  materialOptions,
  typeOptions,
  openingOptions,
  closureOptions,
  windowsOptions,
  materialColorOptions,
  printOptions,
  printCoverageOptions,
} from '../data/optionsData'

interface SidebarProps {
  sizeMode: 'external' | 'product'
  onSizeModeChange: (mode: 'external' | 'product') => void
  width: number
  length: number
  height: number
  onWidthChange: (value: number) => void
  onLengthChange: (value: number) => void
  onHeightChange: (value: number) => void
  productBufferMm: number
  onProductBufferIncrease: () => void
  onProductBufferDecrease: () => void
  focusedDimension: DimensionField | null
  onFocusDimension: (field: DimensionField | null) => void
  onClosureClick: () => void
  onClosureHoverChange: (hovering: boolean) => void
}

export default function Sidebar({
  sizeMode,
  onSizeModeChange,
  width,
  length,
  height,
  onWidthChange,
  onLengthChange,
  onHeightChange,
  productBufferMm,
  onProductBufferIncrease,
  onProductBufferDecrease,
  focusedDimension,
  onFocusDimension,
  onClosureClick,
  onClosureHoverChange,
}: SidebarProps) {
  const [material, setMaterial] = useState('cardboard')
  const [type, setType] = useState('hanging')
  const [opening, setOpening] = useState('tuck-end')
  const [closure, setClosure] = useState('snap-lock')
  const [windows, setWindows] = useState('kraft')
  const [materialColor, setMaterialColor] = useState('kraft')
  const [print, setPrint] = useState('custom')
  const [printCoverage, setPrintCoverage] = useState('outside')
  const [finish, setFinish] = useState('goss')

  const [quantity, setQuantity] = useState(30)
  const [pricePerPiece, setPricePerPiece] = useState(0.92)
  const total = `€${(quantity * pricePerPiece).toFixed(2)}`

  const scrollRef = useRef<HTMLDivElement>(null)
  const summaryRef = useRef<HTMLDivElement>(null)
  const [summaryVisible, setSummaryVisible] = useState(false)

  useEffect(() => {
    const root = scrollRef.current
    const target = summaryRef.current
    if (!root || !target) return

    const observer = new IntersectionObserver(([entry]) => setSummaryVisible(entry.isIntersecting), {
      root,
      threshold: 0,
    })
    observer.observe(target)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={scrollRef} className="h-full w-[540px] shrink-0 overflow-y-auto bg-white">
      <div className="flex flex-col items-start gap-14 pb-14 pl-11 pr-14 pt-14">
        <header className="flex w-full flex-col items-start gap-2">
          <h1 className="text-[40px] font-medium leading-[1.08] tracking-[-2px] text-richblue">
            Build your box
          </h1>
          <p className="w-full text-[17px] leading-[1.32] tracking-[-0.34px] text-grey-600">
            Quickly configure the exact box type you need
          </p>
        </header>

        <OptionGroup title="Material" showLearnMore>
          {materialOptions.map((option) => (
            <Chip
              key={option.id}
              option={option}
              selected={material === option.id}
              onSelect={() => setMaterial(option.id)}
            />
          ))}
        </OptionGroup>

        <OptionGroup title="Type" showLearnMore wrap>
          {typeOptions.map((option) => (
            <Chip
              key={option.id}
              option={option}
              selected={type === option.id}
              onSelect={() => setType(option.id)}
            />
          ))}
        </OptionGroup>

        <SizeSection
          sizeMode={sizeMode}
          onSizeModeChange={onSizeModeChange}
          width={width}
          length={length}
          height={height}
          onWidthChange={onWidthChange}
          onLengthChange={onLengthChange}
          onHeightChange={onHeightChange}
          productBufferMm={productBufferMm}
          onProductBufferIncrease={onProductBufferIncrease}
          onProductBufferDecrease={onProductBufferDecrease}
          focusedDimension={focusedDimension}
          onFocusDimension={onFocusDimension}
        />

        <OptionGroup title="Opening" showLearnMore wrap>
          {openingOptions.map((option) => (
            <Chip
              key={option.id}
              option={option}
              selected={opening === option.id}
              onSelect={() => setOpening(option.id)}
            />
          ))}
        </OptionGroup>

        {/* Hovering anywhere in the group previews the closure reveal live;
            onClosureClick (per-chip, below) backs that up with a timed
            pulse for clicks/taps that aren't backed by a hover. */}
        <div
          onMouseEnter={() => onClosureHoverChange(true)}
          onMouseLeave={() => onClosureHoverChange(false)}
          className="w-full"
        >
          <OptionGroup title="Bottom">
            {closureOptions.map((option) => (
              <Chip
                key={option.id}
                option={option}
                selected={closure === option.id}
                onSelect={() => {
                  setClosure(option.id)
                  onClosureClick()
                }}
              />
            ))}
          </OptionGroup>
        </div>

        <OptionGroup title="Windows and cutouts">
          {windowsOptions.map((option) => (
            <Chip
              key={option.id}
              option={option}
              selected={windows === option.id}
              onSelect={() => setWindows(option.id)}
            />
          ))}
        </OptionGroup>

        <OptionGroup title="Material color">
          {materialColorOptions.map((option) => (
            <Chip
              key={option.id}
              option={option}
              selected={materialColor === option.id}
              onSelect={() => setMaterialColor(option.id)}
            />
          ))}
        </OptionGroup>

        <OptionGroup title="Print">
          {printOptions.map((option) => (
            <Chip
              key={option.id}
              option={option}
              selected={print === option.id}
              onSelect={() => setPrint(option.id)}
            />
          ))}
        </OptionGroup>

        <OptionGroup title="Print coverage">
          {printCoverageOptions.map((option) => (
            <Chip
              key={option.id}
              option={option}
              selected={printCoverage === option.id}
              onSelect={() => setPrintCoverage(option.id)}
            />
          ))}
        </OptionGroup>

        <FinishSection selected={finish} onSelect={setFinish} />

        <QuantitySection
          quantity={quantity}
          onQuantityChange={(nextQuantity, nextPricePerPiece) => {
            setQuantity(nextQuantity)
            setPricePerPiece(nextPricePerPiece)
          }}
        />

        <div ref={summaryRef} className="w-full">
          <SummarySection quantity={quantity} total={total} />
        </div>
      </div>

      <StickyDeliveryBar visible={!summaryVisible} quantity={quantity} total={total} />
    </div>
  )
}
