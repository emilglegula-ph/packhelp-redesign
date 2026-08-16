import type { ChipOption } from '../data/optionsData'

interface ChipProps {
  option: ChipOption
  selected: boolean
  onSelect: () => void
}

// Label sits below the image, left-aligned, off the gray/white background --
// the background + active/hover states live on the media square only, not
// the whole chip. Ported from product-page.html's .pp-chip/.pp-chip-media
// (this app's own Chip previously wrapped image+label in one colored card,
// matching the default gray-100 background instead).
export default function Chip({ option, selected, onSelect }: ChipProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className="flex w-[104px] shrink-0 cursor-pointer flex-col items-start text-left"
    >
      <span
        className={`relative flex size-[104px] shrink-0 items-center justify-center overflow-hidden rounded-xl transition-colors ${
          selected
            ? 'bg-white shadow-[0_2px_2px_rgba(0,0,0,0.08)] ring-1 ring-inset ring-grey-500'
            : 'bg-grey-100 hover:bg-grey-300'
        }`}
      >
        {option.fit === 'cover' && option.image && (
          <img src={option.image} alt="" className="size-full object-cover" />
        )}
        {option.fit === 'icon' && option.image && (
          <img src={option.image} alt="" className="h-auto w-16" />
        )}
      </span>
      <span
        className={`w-full pt-2 text-[12px] leading-[1.32] tracking-[-0.24px] ${
          selected ? 'text-richblue' : 'text-grey-600'
        }`}
      >
        {option.label}
      </span>
    </button>
  )
}
