import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

// Register the custom text styles from tailwind.config.ts as font sizes,
// otherwise tailwind-merge reads them as colors and drops them.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        { text: ["largetitle", "title1", "title2", "title3", "headline", "body", "callout", "subhead", "footnote", "caption"] },
      ],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
