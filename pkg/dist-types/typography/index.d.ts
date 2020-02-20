/**
 * Fetches a system font stack to help with quick prototyping;
 *
 * @remarks
 * Usage:
 *
 * ```ts
 * // for sans
 * typography.system('sans');
 *
 * // for serif
 * typography.system('serif');
 *
 * // for monospace
 * typography.system('monospace');
 * ```
 *
 * @param family - the system family to output
 * @returns A system font stack
 **/
export declare const system: (family: "sans" | "serif" | "monospace") => string;
