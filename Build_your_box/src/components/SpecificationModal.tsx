import { useEffect } from 'react'

interface SpecRow {
  label: string
  value?: string
  sub?: string
  tags?: string[]
}

// Same specification table as product-page.html's #ppSpecPanelSpec (Custom
// Mailer Box's default configuration) -- static content, not derived from
// this configurator's own live selections.
const specRows: SpecRow[] = [
  { label: 'Data for current product configuration', value: 'Custom Mailer Box', sub: 'F23 (9.2 x 9.2 x 5 cm)' },
  { label: 'Material', value: 'Corrugated cardboard' },
  { label: 'Material colour', value: 'Kraft' },
  { label: 'Print colour mode', value: 'One Colour' },
  { label: 'Print coverage', value: 'Outside' },
  { label: 'Foil', value: 'None' },
  { label: 'Adhesive strip', value: 'None' },
  { label: 'Raw material', value: 'Corrugated cardboard flute E' },
  { label: 'Weight', value: '0.02 kg' },
  {
    label: 'Eco properties',
    tags: ['Biodegradable material', 'Made in Europe', 'Plastic-free', 'Recyclable', 'Recycled content', 'Responsible sourcing'],
  },
  { label: 'Certifications', tags: ['Made for recycling', 'FSC'] },
  { label: 'Grammage', value: '438 gsm' },
  {
    label: 'Parcel size',
    tags: ['InPost Size A', 'Royal Mail Size Small', 'DPD Size S', 'Pocztex Size S', 'Vinted GO Up to 0.5 kg', 'DHL BOX 24/7 Size XS'],
  },
  { label: 'Box size', value: 'Small' },
  { label: 'Dimensional tolerance', value: '±2-4mm' },
  { label: 'Variant SKU', value: 'box--mailer-box--23--cardboard-natural--print-monochrome--foil-none' },
]

export default function SpecificationModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6"
      onClick={onClose}
    >
      <div
        className="flex w-full max-w-[640px] flex-col overflow-hidden rounded-[24px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
        style={{ maxHeight: '85vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex w-full items-center justify-between border-b border-grey-200 px-6 py-5">
          <h2 className="text-[22px] font-medium leading-[1.16] tracking-[-0.6px] text-richblue">
            Specification
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex size-8 cursor-pointer items-center justify-center rounded-full bg-grey-100 text-richblue transition-colors hover:bg-grey-300"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col overflow-y-auto px-6">
          {specRows.map((row) => (
            <div
              key={row.label}
              className="flex flex-col gap-1 border-b border-grey-100 py-4 last:border-0 sm:flex-row sm:items-start sm:gap-4"
            >
              <span className="shrink-0 text-[15px] leading-[1.32] tracking-[-0.3px] text-grey-600 sm:w-[220px]">
                {row.label}
              </span>
              {row.tags ? (
                <ul className="flex flex-1 flex-wrap gap-1.5">
                  {row.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full bg-grey-100 px-2.5 py-1 text-[12px] leading-[1.32] tracking-[-0.24px] text-richblue"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              ) : (
                <span className="flex min-w-0 flex-1 flex-wrap items-baseline gap-x-2 text-[15px] leading-[1.4] tracking-[-0.3px] text-richblue">
                  <strong className="min-w-0 break-all font-normal">{row.value}</strong>
                  {row.sub && <span className="text-grey-500">{row.sub}</span>}
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="flex w-full justify-end border-t border-grey-200 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="flex h-11 cursor-pointer items-center justify-center rounded-full bg-ph-blue px-5 text-[15px] font-normal leading-[1.32] tracking-[-0.3px] text-white transition-colors hover:bg-dark-blue"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  )
}
