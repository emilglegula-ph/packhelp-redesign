import { useState, type ReactNode } from 'react'
import LearnMoreModal from './LearnMoreModal'
import type { ChipOption } from '../data/optionsData'

interface OptionGroupProps {
  title: string
  /** Options this group's "Learn more" modal explains -- only needed when
   *  showLearnMore is true. */
  options?: ChipOption[]
  showLearnMore?: boolean
  wrap?: boolean
  children: ReactNode
}

export default function OptionGroup({
  title,
  options,
  showLearnMore = false,
  wrap = false,
  children,
}: OptionGroupProps) {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <section className="flex w-full flex-col items-start gap-3">
      <div className="flex w-full items-center justify-between">
        <h2 className="text-[20px] font-medium leading-[1.16] tracking-[-0.6px] text-richblue">
          {title}
        </h2>
        {showLearnMore && (
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="cursor-pointer border-b border-richblue/25 pb-px text-[13px] leading-[1.32] tracking-[-0.26px] text-richblue"
          >
            Learn more
          </button>
        )}
      </div>
      <div className={wrap ? 'flex w-full flex-wrap items-start gap-2' : 'flex items-start gap-2'}>
        {children}
      </div>
      {showLearnMore && modalOpen && options && (
        <LearnMoreModal title={title} options={options} onClose={() => setModalOpen(false)} />
      )}
    </section>
  )
}
