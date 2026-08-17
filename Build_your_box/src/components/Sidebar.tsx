import { useEffect, useRef, useState } from 'react'
import OptionGroup from './OptionGroup'
import Chip from './Chip'
import SizeSection from './SizeSection'
import FinishSection from './FinishSection'
import QuantitySection from './QuantitySection'
import SummarySection from './SummarySection'
import StickyDeliveryBar from './StickyDeliveryBar'
import SiteSettings from './SiteSettings'
import UspPills from './UspPills'
import type { DimensionField } from '../App'
import {
  productOptions,
  materialOptions,
  typeOptions,
  corrugatedTypeOptions,
  openingOptions,
  closureOptions,
  windowsOptions,
  materialColorOptions,
  printOptions,
  printCoverageOptions,
  corrugatedPrintCoverageOptions,
  printColourModeOptions,
  adhesiveStripOptions,
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
  print: string
  onPrintChange: (id: string) => void
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
  print,
  onPrintChange,
}: SidebarProps) {
  const [product, setProduct] = useState('boxes')
  const [material, setMaterial] = useState('cardboard')
  // Combined single "Product" picker (Cardboard/Corrugated/Rigid Boxes +
  // Boxes/Envelopes/Bags/Tubes/More products) is the default; this opts
  // back into the previously-implemented two-group layout (separate
  // "Product" and "Box material" pickers).
  const [splitProductPicker, setSplitProductPicker] = useState(false)
  const [hideSubheader, setHideSubheader] = useState(false)
  const [type, setType] = useState('hanging')
  const [opening, setOpening] = useState('tuck-end')
  const [closure, setClosure] = useState('snap-lock')
  const [windows, setWindows] = useState('kraft')
  const [materialColor, setMaterialColor] = useState('kraft')
  const [printCoverage, setPrintCoverage] = useState('outside')
  const [printColourMode, setPrintColourMode] = useState('one-colour')
  const [adhesiveStrip, setAdhesiveStrip] = useState('none')
  const [finish, setFinish] = useState('goss')

  // Same materialOptions, relabeled for the combined "Product" picker so
  // they read as product tiles ("Cardboard Boxes") next to Envelopes/Bags/
  // Tubes, instead of the bare material name ("Cardboard").
  const boxMaterialOptions = materialOptions.map((option) => ({
    ...option,
    label: `${option.label} Boxes`,
  }))

  const isCorrugated = material === 'corrugated'
  const currentTypeOptions = isCorrugated ? corrugatedTypeOptions : typeOptions
  const currentPrintCoverageOptions = isCorrugated ? corrugatedPrintCoverageOptions : printCoverageOptions

  // Switching Material can make the current Type/Print-coverage selection
  // invalid (its option list just changed) -- fall back to that list's
  // first option instead of leaving nothing visibly selected. Ids shared
  // between the two Type lists (with-lid, open-end) mean this is a no-op
  // when the selection was already valid on both sides of the switch.
  useEffect(() => {
    if (!currentTypeOptions.some((option) => option.id === type)) {
      setType(currentTypeOptions[0].id)
    }
    if (!currentPrintCoverageOptions.some((option) => option.id === printCoverage)) {
      setPrintCoverage(currentPrintCoverageOptions[0].id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [material])

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
      <div className="flex flex-col items-start gap-16 pb-14 pl-11 pr-14 pt-16">
        <header className="flex w-full flex-col items-start gap-3">
          <h1 className="text-[40px] font-medium leading-[1.08] tracking-[-2px] text-richblue">
            Build your packaging
          </h1>
          {!hideSubheader && (
            <p className="w-full text-[15px] leading-[1.32] tracking-[-0.34px] text-grey-500">
              Unlock expanded constructions beyond our standard catalog.
            </p>
          )}
          <UspPills />
        </header>

        {/* The "More products" tile is the only real destination out of this
            page -- the other Product tiles (Boxes/Envelopes/Bags/Tubes) just
            record a selection like any other chip, since this configurator
            only actually builds Boxes and nothing here should navigate the
            page away underneath the visitor without them choosing to. */}
        {splitProductPicker ? (
          <>
            <OptionGroup title="Product" wrap>
              {productOptions.map((option) => (
                <Chip
                  key={option.id}
                  option={option}
                  selected={product === option.id}
                  onSelect={() => setProduct(option.id)}
                />
              ))}
              <a
                href="../../packaging.html"
                target="_blank"
                rel="noopener"
                className="flex w-[104px] shrink-0 flex-col items-start text-left"
              >
                <span className="relative flex size-[104px] shrink-0 items-center justify-center overflow-hidden rounded-xl bg-grey-100 text-richblue transition-colors hover:bg-grey-200">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </span>
                <span className="w-full pt-2 text-[12px] leading-[1.32] tracking-[-0.24px] text-grey-600">
                  More products
                </span>
              </a>
            </OptionGroup>

            <OptionGroup title="Box material" options={materialOptions} showLearnMore>
              {materialOptions.map((option) => (
                <Chip
                  key={option.id}
                  option={option}
                  selected={material === option.id}
                  onSelect={() => setMaterial(option.id)}
                />
              ))}
            </OptionGroup>
          </>
        ) : (
          <OptionGroup title="Product" options={boxMaterialOptions} showLearnMore wrap>
            {boxMaterialOptions.map((option) => (
              <Chip
                key={option.id}
                option={option}
                selected={material === option.id}
                onSelect={() => setMaterial(option.id)}
              />
            ))}
            {/* "Boxes" itself is left out here -- Cardboard/Corrugated/Rigid
                Boxes above already cover it, so a plain "Boxes" tile would
                just be a redundant fourth option pointing at the same thing. */}
            {productOptions
              .filter((option) => option.id !== 'boxes')
              .map((option) => (
                <Chip
                  key={option.id}
                  option={option}
                  selected={product === option.id}
                  onSelect={() => setProduct(option.id)}
                />
              ))}
            <a
              href="../../packaging.html"
              target="_blank"
              rel="noopener"
              className="flex w-[104px] shrink-0 flex-col items-start text-left"
            >
              <span className="relative flex size-[104px] shrink-0 items-center justify-center overflow-hidden rounded-xl bg-grey-100 text-richblue transition-colors hover:bg-grey-200">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </span>
              <span className="w-full pt-2 text-[12px] leading-[1.32] tracking-[-0.24px] text-grey-600">
                More products
              </span>
            </a>
          </OptionGroup>
        )}

        <OptionGroup title="Type" wrap>
          {currentTypeOptions.map((option) => (
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

        {/* Corrugated is a simpler flow -- these three don't apply to it. */}
        {!isCorrugated && (
          <OptionGroup title="Opening" options={openingOptions} showLearnMore wrap>
            {openingOptions.map((option) => (
              <Chip
                key={option.id}
                option={option}
                selected={opening === option.id}
                onSelect={() => setOpening(option.id)}
              />
            ))}
          </OptionGroup>
        )}

        {!isCorrugated && (
          // Hovering anywhere in the group previews the closure reveal live;
          // onClosureClick (per-chip, below) backs that up with a timed
          // pulse for clicks/taps that aren't backed by a hover.
          <div
            onMouseEnter={() => onClosureHoverChange(true)}
            onMouseLeave={() => onClosureHoverChange(false)}
            className="w-full"
          >
            <OptionGroup title="Bottom" options={closureOptions} showLearnMore>
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
        )}

        {!isCorrugated && (
          <OptionGroup title="Windows and cutouts" options={windowsOptions} showLearnMore>
            {windowsOptions.map((option) => (
              <Chip
                key={option.id}
                option={option}
                selected={windows === option.id}
                onSelect={() => setWindows(option.id)}
              />
            ))}
          </OptionGroup>
        )}

        {isCorrugated && (
          <OptionGroup title="Print colour mode">
            {printColourModeOptions.map((option) => (
              <Chip
                key={option.id}
                option={option}
                selected={printColourMode === option.id}
                onSelect={() => setPrintColourMode(option.id)}
              />
            ))}
          </OptionGroup>
        )}

        {isCorrugated && (
          <OptionGroup title="Adhesive strip">
            {adhesiveStripOptions.map((option) => (
              <Chip
                key={option.id}
                option={option}
                selected={adhesiveStrip === option.id}
                onSelect={() => setAdhesiveStrip(option.id)}
              />
            ))}
          </OptionGroup>
        )}

        <OptionGroup title="Material color" options={materialColorOptions} showLearnMore>
          {materialColorOptions.map((option) => (
            <Chip
              key={option.id}
              option={option}
              selected={materialColor === option.id}
              onSelect={() => setMaterialColor(option.id)}
            />
          ))}
        </OptionGroup>

        <OptionGroup title="Print" options={printOptions} showLearnMore>
          {printOptions.map((option) => (
            <Chip
              key={option.id}
              option={option}
              selected={print === option.id}
              onSelect={() => onPrintChange(option.id)}
            />
          ))}
        </OptionGroup>

        <OptionGroup title="Print coverage">
          {currentPrintCoverageOptions.map((option) => (
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

      <SiteSettings
        splitProductPicker={splitProductPicker}
        onSplitProductPickerChange={setSplitProductPicker}
        hideSubheader={hideSubheader}
        onHideSubheaderChange={setHideSubheader}
      />
    </div>
  )
}
