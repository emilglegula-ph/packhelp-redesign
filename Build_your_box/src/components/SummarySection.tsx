import { useState } from 'react'
import SpecificationModal from './SpecificationModal'

const deliveryOptions = [
  { date: '20 April', price: 'Free' },
  { date: '24 April', price: '+ €12.80' },
  { date: '28 April', price: '+ €32.50' },
]

export default function SummarySection({ quantity, total }: { quantity: number; total: string }) {
  const [specModalOpen, setSpecModalOpen] = useState(false)

  return (
    <section className="flex w-full flex-col items-start gap-6 border-t border-grey-300 pt-6">
      {/* Same sizing/spacing as product-page.html's .pp-cta-price-row --
          13px delivery/date/label text (was 15px), muted grey-500 price
          label instead of grey-600. */}
      <div className="flex w-full items-end justify-between gap-4">
        <div className="flex flex-col items-start gap-2">
          <div className="flex items-start gap-1 text-[13px] leading-[1.32] tracking-[-0.26px] text-richblue">
            <span>Delivery to:</span>
            <a href="#" className="border-b border-richblue/25 pb-px text-richblue">
              Norway, 05-800
            </a>
          </div>
          <ul className="flex flex-col gap-1 text-[13px] tracking-[-0.26px]">
            {deliveryOptions.map((option) => (
              <li key={option.date} className="flex list-none items-center gap-1">
                <span className="relative flex items-center gap-1 pl-[18px] leading-[1.32] text-richblue before:absolute before:left-0 before:top-1/2 before:size-1 before:-translate-y-1/2 before:rounded-full before:bg-richblue">
                  {option.date}
                </span>
                <span className="leading-[1.32] text-grey-500">{option.price}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col items-end justify-center gap-1 whitespace-nowrap text-right">
          <span className="text-[13px] leading-[1.32] tracking-[-0.26px] text-grey-500">
            Netto / {quantity} pieces
          </span>
          <span className="text-[32px] font-medium leading-[1.08] tracking-[-0.96px] text-richblue">
            {total}
          </span>
        </div>
      </div>
      <div className="flex w-full flex-col items-start gap-2">
        <button
          type="button"
          className="flex h-12 w-full cursor-pointer items-center justify-center rounded-full bg-ph-blue px-4 text-[15px] font-normal leading-[1.32] tracking-[-0.3px] text-white transition-colors hover:bg-dark-blue"
        >
          Customize design
        </button>
        <button
          type="button"
          className="flex h-12 w-full cursor-pointer items-center justify-center rounded-full bg-grey-200 px-4 text-[15px] font-normal leading-[1.32] tracking-[-0.3px] text-richblue transition-colors hover:bg-grey-300"
        >
          Skip design for now
        </button>
      </div>

      {/* Same info-rows block as product-page.html's .pp-info-rows, minus
          "Sample packs" -- Specification opens the same spec table as that
          page's #ppSpecPanelSpec, but in a modal (this app has no page to
          scroll down to). mt-4 tops up the section's own 24px (gap-6) flex
          gap to a full 40px between the CTA buttons and this table. */}
      <div className="mt-4 flex w-full flex-col overflow-hidden rounded-xl border border-grey-300">
        <a
          href="#"
          className="flex w-full items-center gap-3 px-5 py-5 text-richblue"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
          <span className="text-[15px] leading-[1.32] tracking-[-0.3px]">Contact packaging advisors</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-auto shrink-0 -rotate-90 text-grey-500">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </a>
        <button
          type="button"
          onClick={() => setSpecModalOpen(true)}
          className="flex w-full cursor-pointer items-center gap-3 border-t border-grey-300 px-5 py-5 text-left text-richblue"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <path d="M14 2v6h6" />
            <path d="M16 13H8" />
            <path d="M16 17H8" />
            <path d="M10 9H8" />
          </svg>
          <span className="text-[15px] leading-[1.32] tracking-[-0.3px]">Specification</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-auto shrink-0 -rotate-90 text-grey-500">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
      </div>

      {specModalOpen && <SpecificationModal onClose={() => setSpecModalOpen(false)} />}
    </section>
  )
}
