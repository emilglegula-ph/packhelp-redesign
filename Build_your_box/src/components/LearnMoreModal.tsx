import { useEffect } from 'react'
import type { ChipOption } from '../data/optionsData'

interface LearnMoreModalProps {
  title: string
  options: ChipOption[]
  onClose: () => void
}

// Mocked -- no real pricing/description data wired up yet. First option
// (the default) reads as included, the rest step up by a small fixed
// increment purely so the modal has plausible-looking numbers to show.
function mockPrice(index: number) {
  return index === 0 ? 'Included' : `+€${(0.03 * index).toFixed(2)}/pc`
}

function mockDescription(title: string, label: string) {
  return `${label} — how this ${title.toLowerCase()} option affects the look, feel and price of your box.`
}

export default function LearnMoreModal({ title, options, onClose }: LearnMoreModalProps) {
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
        className="flex w-full max-w-[520px] flex-col overflow-hidden rounded-[24px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
        style={{ maxHeight: '85vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex w-full items-center justify-between border-b border-grey-200 px-6 py-5">
          <h2 className="text-[22px] font-medium leading-[1.16] tracking-[-0.6px] text-richblue">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex size-8 cursor-pointer items-center justify-center rounded-full bg-grey-100 text-richblue transition-colors hover:bg-grey-300"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1 1L13 13M13 1L1 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="flex flex-col overflow-y-auto px-6">
          {options.map((option, index) => (
            <div
              key={option.id}
              className="flex items-center gap-4 border-b border-grey-100 py-4 last:border-0"
            >
              <span className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-grey-100">
                {option.image && (
                  <img
                    src={option.image}
                    alt=""
                    className={option.fit === 'icon' ? 'h-auto w-8' : 'size-full object-cover'}
                  />
                )}
              </span>
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="text-[15px] leading-[1.32] tracking-[-0.3px] text-richblue">
                  {option.label}
                </span>
                <span className="text-[13px] leading-[1.32] tracking-[-0.26px] text-grey-600">
                  {mockDescription(title, option.label)}
                </span>
              </div>
              <span className="shrink-0 whitespace-nowrap text-[13px] leading-[1.32] tracking-[-0.26px] text-grey-600">
                {mockPrice(index)}
              </span>
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
