// This port owns its application mappings. Inputs come only from the pinned local palette.
import { ANSI_ORDER } from '../scripts/palette.mjs';

const warpTheme = (f) => `name: ${f.name}
accent: '${f.r("accent")}'
cursor: '${f.r("cursor")}'
background: '${f.r("bg")}'
foreground: '${f.r("fg")}'
details: ${f.light ? "lighter" : "darker"}
terminal_colors:
${["normal", "bright"].map((k) => `  ${k}:\n${ANSI_ORDER.map((n, i) => `    ${n}: '${f.ansi[k][i]}'`).join("\n")}`).join("\n")}
`;

const warp = {
files: (f) => [{ path: `${f.slug}.yaml`, content: warpTheme(f) }]
};

export function generate(flavors) {
  return [...flavors.flatMap(f => warp.files(f)), ...(warp.all?.(flavors) ?? [])].filter(f => !["LICENSE", "README.md", "package.json", "extension.toml"].includes(f.path.split("/").at(-1)));
}
