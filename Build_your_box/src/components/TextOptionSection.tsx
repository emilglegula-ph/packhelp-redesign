interface TextOption {
  id: string
  label: string
}

interface TextOptionSectionProps {
  title: string
  options: TextOption[]
  selected: string
  onSelect: (id: string) => void
}

/** Same text-pill pattern as FinishSection, generalized for sections whose
 *  options don't have chip imagery -- Print colour mode, Adhesive strip. */
export default function TextOptionSection({ title, options, selected, onSelect }: TextOptionSectionProps) {
  return (
    <section className="flex w-full flex-col gap-3">
      <h2 className="w-full text-[20px] font-medium leading-[1.16] tracking-[-0.4px] text-richblue">
        {title}
      </h2>
      <div className="flex flex-wrap items-start gap-2">
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => onSelect(option.id)}
            className={`flex cursor-pointer items-center justify-center rounded-lg px-4 py-3 text-[15px] leading-[1.32] tracking-[-0.3px] text-richblue transition-colors ${
              selected === option.id
                ? 'border border-grey-400 bg-white shadow-[0_2px_2px_rgba(0,0,0,0.08)]'
                : 'border border-transparent bg-grey-100 hover:bg-grey-300'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </section>
  )
}
