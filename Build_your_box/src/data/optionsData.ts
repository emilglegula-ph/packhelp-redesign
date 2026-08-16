import {
  imgProductBoxes,
  imgProductEnvelopes,
  imgProductBags,
  imgProductTubes,
  imgFoldingBox,
  imgRigidBox,
  imgMailerBox,
  imgTypeClassic,
  imgTypeHanging,
  imgTypeWithLid,
  imgTypeWithHandle,
  imgTypeGable,
  imgTypePullOut,
  imgTypePillow,
  imgTypeDisplays,
  imgTypeOpenEnd,
  imgTypeTray,
  imgTypeSleeve,
  imgTypeFood,
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
  imgAdhesiveNone,
  imgAdhesiveSingle,
  imgAdhesiveDouble,
} from '../assets/figma'

export type ChipFit = 'cover' | 'icon' | 'empty'

export interface ChipOption {
  id: string
  label: string
  image?: string
  fit: ChipFit
}

// "Boxes" is the only category this configurator actually builds -- the
// other three exist so switching away reads as a real choice (routed to
// the main site's listing via the "More products" tile below) rather than
// the configurator silently pretending to support them.
export const productOptions: ChipOption[] = [
  { id: 'boxes', label: 'Boxes', image: imgProductBoxes, fit: 'cover' },
  { id: 'envelopes', label: 'Envelopes', image: imgProductEnvelopes, fit: 'cover' },
  { id: 'bags', label: 'Bags', image: imgProductBags, fit: 'cover' },
  { id: 'tubes', label: 'Tubes', image: imgProductTubes, fit: 'cover' },
]

export const materialOptions: ChipOption[] = [
  { id: 'cardboard', label: 'Cardboard', image: imgFoldingBox, fit: 'cover' },
  { id: 'corrugated', label: 'Corrugated', image: imgMailerBox, fit: 'cover' },
  { id: 'rigid', label: 'Rigid', image: imgRigidBox, fit: 'cover' },
]

export const typeOptions: ChipOption[] = [
  { id: 'classic', label: 'Classic', image: imgTypeClassic, fit: 'cover' },
  { id: 'hanging', label: 'Hanging', image: imgTypeHanging, fit: 'cover' },
  { id: 'with-lid', label: 'With Lid', image: imgTypeWithLid, fit: 'cover' },
  { id: 'with-handle', label: 'With Handle', image: imgTypeWithHandle, fit: 'cover' },
  { id: 'gable', label: 'Gable', image: imgTypeGable, fit: 'cover' },
  { id: 'pull-out', label: 'Pull out', image: imgTypePullOut, fit: 'cover' },
  { id: 'pillow', label: 'Pillow', image: imgTypePillow, fit: 'cover' },
  { id: 'displays', label: 'Displays', image: imgTypeDisplays, fit: 'cover' },
  { id: 'open-end', label: 'Open end', image: imgTypeOpenEnd, fit: 'cover' },
  { id: 'tray', label: 'Tray', image: imgTypeTray, fit: 'cover' },
  { id: 'sleeve', label: 'Sleeve', image: imgTypeSleeve, fit: 'cover' },
  { id: 'food', label: 'Food', image: imgTypeFood, fit: 'cover' },
]

// Shown instead of typeOptions above when Material is "Corrugated" -- ids
// shared with typeOptions ('with-lid', 'open-end') keep that selection
// across a material switch instead of resetting it.
// Mailer Box, Shipping Box, Food and Example don't have dedicated photos
// yet -- all four reuse the generic "Classic" icon as a placeholder.
export const corrugatedTypeOptions: ChipOption[] = [
  { id: 'mailer-box', label: 'Mailer Box', image: imgTypeClassic, fit: 'cover' },
  { id: 'shipping-box', label: 'Shipping Box', image: imgTypeClassic, fit: 'cover' },
  { id: 'with-lid', label: 'With Lid', image: imgTypeWithLid, fit: 'cover' },
  { id: 'display', label: 'Display', image: imgTypeDisplays, fit: 'cover' },
  { id: 'open-end', label: 'Open end', image: imgTypeOpenEnd, fit: 'cover' },
  { id: 'food', label: 'Food', image: imgTypeClassic, fit: 'cover' },
  { id: 'example', label: 'Example', image: imgTypeClassic, fit: 'cover' },
]

// Bottom/base opening options for the "Classic" Type -- one static
// list for now, not yet conditional per Type selection. Also placeholder
// icons, same as typeOptions above.
export const openingOptions: ChipOption[] = [
  { id: 'tuck-end', label: 'Tuck end', image: imgTypeClassic, fit: 'cover' },
  { id: 'seal-end', label: 'Seal end', image: imgTypeClassic, fit: 'cover' },
  { id: 'tuck-and-tongue', label: 'Tuck and Tongue', image: imgTypeClassic, fit: 'cover' },
  { id: 'deluxe-bellow', label: 'Deluxe bellow', image: imgTypeClassic, fit: 'cover' },
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
  { id: 'plain', label: 'Plain', image: imgPrintPlain, fit: 'cover' },
  { id: 'custom', label: 'Custom', image: imgPrintCustom, fit: 'cover' },
]

export const printCoverageOptions: ChipOption[] = [
  { id: 'outside', label: 'Outside', image: imgCoverageOutside, fit: 'cover' },
  { id: 'outside-inside', label: 'Outside + Inside', image: imgCoverageOutsideInside, fit: 'cover' },
]

// Shown instead of printCoverageOptions above when Material is
// "Corrugated" -- no dedicated "inside only" photo exists yet, so this
// temporarily reuses the Outside image as a placeholder.
export const corrugatedPrintCoverageOptions: ChipOption[] = [
  ...printCoverageOptions,
  { id: 'inside', label: 'Inside', image: imgCoverageOutside, fit: 'cover' },
]

export const finishOptions = [
  { id: 'goss', label: 'Goss' },
  { id: 'matt', label: 'Matt' },
]

// Corrugated-only sections.
// No dedicated photos yet for the 4 colour modes -- temporarily all reuse
// the same "Kraft" material-colour photo as a placeholder.
export const printColourModeOptions: ChipOption[] = [
  { id: 'one-colour', label: 'One colour', image: imgMaterialKraft, fit: 'cover' },
  { id: 'white-colour', label: 'White colour', image: imgMaterialKraft, fit: 'cover' },
  { id: 'multicolour-muted', label: 'Multicolour – muted', image: imgMaterialKraft, fit: 'cover' },
  { id: 'multicolour-premium', label: 'Multicolour – premium', image: imgMaterialKraft, fit: 'cover' },
]

export const adhesiveStripOptions: ChipOption[] = [
  { id: 'none', label: 'None', image: imgAdhesiveNone, fit: 'cover' },
  { id: 'single', label: 'Single', image: imgAdhesiveSingle, fit: 'cover' },
  { id: 'double', label: 'Double', image: imgAdhesiveDouble, fit: 'cover' },
]
