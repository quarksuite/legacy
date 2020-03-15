/**
 * Fetches a system font stack to help with quick prototyping;
 *
 * @remarks
 * Usage:
 *
 * ```ts
 * // Default settings output all stacks
 * typography.system();
 *
 * // One argument will output a single stack
 * typography.system('sans');
 *
 * typography.system('serif');
 *
 * typography.system('monospace');
 *
 * // Multiple arguments output multiple stacks
 * typography.system('sans', 'monospace');
 * ```
 *
 * @param fonts - the system families to output
 * @returns Single or multiple system font stacks
 **/
export declare const system: (...fonts: string[]) => string | string[];
