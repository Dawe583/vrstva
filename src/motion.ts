/** Sdílený motion jazyk — jeden easing systém pro celý web. */
export const EASE = [0.16, 1, 0.3, 1] as const; // hlavní "smooth out"
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;
export const EASE_INOUT = [0.76, 0, 0.24, 1] as const;

/**
 * Web animuje na VŠECH zařízeních bez výjimky (vědomé, opakované přání
 * uživatele). Motion je globálně přepnutý na reducedMotion="never", takže
 * i parallax jede v plné amplitudě všude.
 */
export const amp = (full: number) => full;
