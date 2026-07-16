import { Fraunces } from "next/font/google";

/**
 * Editorial serif used only for italic accent words inside otherwise
 * sans headlines — the bold-sans + light-serif pairing reads distinctly
 * high-end. Loaded here (not in layout) so it survives regardless of the
 * root layout's font setup.
 */
export const serifAccent = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["italic"],
  display: "swap",
  variable: "--font-serif-accent",
});
