/**
 * Generated "key art" for project cards: a different gradient per project, so
 * cards look distinct without any image files. Picked by index, cycling.
 */
const ART = [
  'bg-[radial-gradient(ellipse_at_20%_0%,#e50914aa_0%,transparent_55%),radial-gradient(ellipse_at_100%_100%,#7c2d12_0%,transparent_60%),linear-gradient(135deg,#1c1c1c,#0b0b0b)]',
  'bg-[radial-gradient(ellipse_at_80%_10%,#0ea5e9aa_0%,transparent_55%),radial-gradient(ellipse_at_0%_100%,#1e3a8a_0%,transparent_60%),linear-gradient(135deg,#1c1c1c,#0b0b0b)]',
  'bg-[radial-gradient(ellipse_at_50%_0%,#f59e0baa_0%,transparent_55%),radial-gradient(ellipse_at_100%_100%,#9a3412_0%,transparent_60%),linear-gradient(135deg,#1c1c1c,#0b0b0b)]',
  'bg-[radial-gradient(ellipse_at_10%_90%,#10b981aa_0%,transparent_55%),radial-gradient(ellipse_at_100%_0%,#065f46_0%,transparent_60%),linear-gradient(135deg,#1c1c1c,#0b0b0b)]',
]

export function projectArt(index: number): string {
  return ART[index % ART.length]
}
