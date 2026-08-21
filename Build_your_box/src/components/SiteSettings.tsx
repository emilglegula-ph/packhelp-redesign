import { useEffect, useRef, useState } from 'react'

interface SiteSettingsProps {
  splitProductPicker: boolean
  onSplitProductPickerChange: (value: boolean) => void
  hideSubheader: boolean
  onHideSubheaderChange: (value: boolean) => void
}

// Same floating gear button + popover panel pattern used on the other pages
// in the main project (packaging.html/product_page.html's #siteSettingsBtn),
// mirrored to the bottom-left corner here instead of bottom-right.
export default function SiteSettings({
  splitProductPicker,
  onSplitProductPickerChange,
  hideSubheader,
  onHideSubheaderChange,
}: SiteSettingsProps) {
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      const target = e.target as Node
      if (
        panelRef.current &&
        !panelRef.current.contains(target) &&
        btnRef.current &&
        !btnRef.current.contains(target)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener('click', onDocClick)
    return () => document.removeEventListener('click', onDocClick)
  }, [])

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          setOpen((value) => !value)
        }}
        aria-label="Page customization"
        className="fixed bottom-6 left-6 z-[1000] flex size-14 cursor-pointer items-center justify-center rounded-full border border-black/[0.08] bg-white text-grey-600 shadow-[0_4px_16px_rgba(0,0,0,0.15)] transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(0,0,0,0.18)]"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      </button>

      <div
        ref={panelRef}
        className={`fixed bottom-[92px] left-6 z-[1000] w-[280px] rounded-2xl bg-white p-5 shadow-[0_8px_32px_rgba(0,0,0,0.18)] transition-[opacity,transform] duration-200 ${
          open ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
        }`}
      >
        <p className="mb-4 text-[15px] font-medium leading-[1.16] tracking-[-0.3px] text-richblue">
          Page customization
        </p>
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[13px] leading-[1.32] tracking-[-0.26px] text-richblue">
              Split Product / Box category
            </p>
            <p className="mt-1 text-[11px] leading-[1.32] tracking-[-0.22px] text-grey-600">
              Show Product and Box category as two separate picker groups instead of one combined Product picker
            </p>
          </div>
          <label className="relative inline-block h-6 w-10 shrink-0 cursor-pointer">
            <input
              type="checkbox"
              checked={splitProductPicker}
              onChange={(e) => onSplitProductPickerChange(e.target.checked)}
              className="peer sr-only"
            />
            <span className="absolute inset-0 rounded-full bg-grey-300 transition-colors peer-checked:bg-ph-blue" />
            <span className="absolute top-[3px] left-[3px] size-[18px] rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.2)] transition-transform peer-checked:translate-x-4" />
          </label>
        </div>
        <div className="mt-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-[13px] leading-[1.32] tracking-[-0.26px] text-richblue">
              Hide catalog subheader
            </p>
            <p className="mt-1 text-[11px] leading-[1.32] tracking-[-0.22px] text-grey-600">
              Hide the "Unlock expanded constructions..." line under the title
            </p>
          </div>
          <label className="relative inline-block h-6 w-10 shrink-0 cursor-pointer">
            <input
              type="checkbox"
              checked={hideSubheader}
              onChange={(e) => onHideSubheaderChange(e.target.checked)}
              className="peer sr-only"
            />
            <span className="absolute inset-0 rounded-full bg-grey-300 transition-colors peer-checked:bg-ph-blue" />
            <span className="absolute top-[3px] left-[3px] size-[18px] rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.2)] transition-transform peer-checked:translate-x-4" />
          </label>
        </div>
      </div>
    </>
  )
}
