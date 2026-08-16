// USP pill row (Unlimited constructions / Custom sizes / 3D preview), same
// .pp-usps pill style as product-page.html. Each pill gets a hover popover
// explaining what it means.

interface Usp {
  label: string
  description: string
}

const usps: Usp[] = [
  {
    label: 'Unlimited constructions',
    description:
      'Switch freely between mailer boxes, gable tops, pillow packs and more — every construction updates the 3D preview and price instantly, so you can compare options before committing.',
  },
  {
    label: 'Custom sizes',
    description:
      'Set any width, length and height in centimetres — the outer box, print area and dieline all recalculate live as you type, down to the millimetre.',
  },
  {
    label: '3D preview',
    description:
      'See a true-to-scale 3D model of your box as you configure it — drag to rotate, zoom in on details, and switch to a flat 2D dieline any time.',
  },
]

export default function UspPills() {
  return (
    <ul className="m-0 flex w-full list-none flex-row flex-wrap gap-2 p-0">
      {usps.map((usp) => (
        <li
          key={usp.label}
          className="group relative flex items-center rounded-full bg-grey-200 px-3 py-1 text-[13px] leading-[1.32] tracking-[-0.26px] text-grey-600"
        >
          {usp.label}
          <div className="pointer-events-none absolute left-0 top-[calc(100%+8px)] z-20 w-[220px] translate-y-1 rounded-2xl bg-white p-4 text-left opacity-0 shadow-[0_8px_24px_rgba(0,0,0,0.15)] transition-all duration-150 group-hover:translate-y-0 group-hover:opacity-100">
            <span className="text-[13px] leading-[1.32] tracking-[-0.26px] text-grey-600">
              {usp.description}
            </span>
          </div>
        </li>
      ))}
    </ul>
  )
}
