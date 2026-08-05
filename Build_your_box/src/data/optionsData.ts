import {
  imgFoldingBox,
  imgRigidBox,
  imgMailerBox,
  imgConstructionClassic,
  imgClosureSnapLock,
  imgClosureAutoLock,
  imgClosureReverseTuck,
  imgWindowKraft,
  imgWindow,
  imgPerforation,
  imgMaterialKraft,
  imgMaterialWhite,
  imgMaterialPremiumWhite,
  imgPrintCustom,
  imgPrintPlain,
  imgCoverageOutside,
  imgCoverageOutsideInside,
} from '../assets/figma'

export type ChipFit = 'cover' | 'icon' | 'empty'

export interface ChipOption {
  id: string
  label: string
  image?: string
  fit: ChipFit
}

export const materialOptions: ChipOption[] = [
  { id: 'cardboard', label: 'Cardboard', image: imgFoldingBox, fit: 'cover' },
  { id: 'rigid', label: 'Rigid', image: imgRigidBox, fit: 'cover' },
  { id: 'corrugated', label: 'Corrugated', image: imgMailerBox, fit: 'cover' },
]

// Real per-option icons don't exist yet -- every tile temporarily reuses
// the old "Classic" construction icon as a placeholder.
export const typeOptions: ChipOption[] = [
  { id: 'pull-out', label: 'Pull out', image: imgConstructionClassic, fit: 'cover' },
  { id: 'pillow', label: 'Pillow', image: imgConstructionClassic, fit: 'cover' },
  { id: 'displays', label: 'Displays', image: imgConstructionClassic, fit: 'cover' },
  { id: 'open-end', label: 'Open end', image: imgConstructionClassic, fit: 'cover' },
  { id: 'tray', label: 'Tray', image: imgConstructionClassic, fit: 'cover' },
  { id: 'sleeve', label: 'Sleeve', image: imgConstructionClassic, fit: 'cover' },
]

// Bottom/base construction options for the "Classic" Type -- one static
// list for now, not yet conditional per Type selection. Also placeholder
// icons, same as typeOptions above.
export const constructionOptions: ChipOption[] = [
  { id: 'tuck-end', label: 'Tuck end', image: imgConstructionClassic, fit: 'cover' },
  { id: 'seal-end', label: 'Seal end', image: imgConstructionClassic, fit: 'cover' },
  { id: 'tuck-and-tongue', label: 'Tuck and Tongue', image: imgConstructionClassic, fit: 'cover' },
  { id: 'deluxe-bellow', label: 'Deluxe bellow', image: imgConstructionClassic, fit: 'cover' },
  { id: 'tube-neck-lock', label: 'Tube neck lock', image: imgConstructionClassic, fit: 'cover' },
]

export const closureOptions: ChipOption[] = [
  { id: 'snap-lock', label: 'Snap lock', image: imgClosureSnapLock, fit: 'icon' },
  { id: 'auto-lock', label: 'Auto lock', image: imgClosureAutoLock, fit: 'icon' },
  { id: 'reverse-tuck', label: 'Reverse Tuck...', image: imgClosureReverseTuck, fit: 'icon' },
]

export const windowsOptions: ChipOption[] = [
  { id: 'kraft', label: 'Kraft', image: imgWindowKraft, fit: 'cover' },
  { id: 'window', label: 'Window', image: imgWindow, fit: 'cover' },
  { id: 'perforation', label: 'Perforation', image: imgPerforation, fit: 'cover' },
  { id: 'crease-line', label: 'Crease line', fit: 'empty' },
]

export const materialColorOptions: ChipOption[] = [
  { id: 'kraft', label: 'Kraft', image: imgMaterialKraft, fit: 'cover' },
  { id: 'white', label: 'White', image: imgMaterialWhite, fit: 'cover' },
  { id: 'premium-white', label: 'Premium white', image: imgMaterialPremiumWhite, fit: 'cover' },
]

export const printOptions: ChipOption[] = [
  { id: 'custom', label: 'Custom', image: imgPrintCustom, fit: 'cover' },
  { id: 'plain', label: 'Plain', image: imgPrintPlain, fit: 'cover' },
]

export const printCoverageOptions: ChipOption[] = [
  { id: 'outside', label: 'Outside', image: imgCoverageOutside, fit: 'cover' },
  { id: 'outside-inside', label: 'Outside + Inside', image: imgCoverageOutsideInside, fit: 'cover' },
]

export const finishOptions = [
  { id: 'goss', label: 'Goss' },
  { id: 'matt', label: 'Matt' },
]
