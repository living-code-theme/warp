// Native format regressions, exercised through this port's generator.
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {readFile} from 'node:fs/promises';
import test from 'node:test';
import {resolveAll,ANSI_ORDER} from '../scripts/palette.mjs';
import {generate} from '../src/generate.mjs';
import {warpTheme} from './format-contract.mjs';
const flavors = resolveAll();

const unquote = (v) => v.replace(/^(['"])(.*)\1$/, "$2");

function parseYaml(text) {
  const root = {}, stack = [{ indent: -1, node: root }];
  const lines = text.split("\n").filter((l) => l.trim() && !l.trim().startsWith("#"));
  for (const [n, raw] of lines.entries()) {
    const indent = raw.match(/^ */)[0].length, line = raw.trim();
    while (stack.at(-1).indent >= indent) stack.pop();
    const parent = stack.at(-1).node;
    if (line.startsWith("- ")) { assert.ok(Array.isArray(parent), `list item outside a list: ${raw}`); parent.push(unquote(line.slice(2))); continue; }
    const m = line.match(/^([\w.-]+):(?: (.*))?$/);
    assert.ok(m, `not a YAML mapping line: ${raw}`);
    if (m[2] === undefined) {
      const next = lines[n + 1]?.trim().startsWith("- ") ? [] : {};
      parent[m[1]] = next;
      stack.push({ indent, node: next });
    } else parent[m[1]] = unquote(m[2]);
  }
  return root;
}

const HEX = /^#[0-9a-f]{6}$/i;

const warp = {files: f=>generate([f]).filter(x=>x.path!=='living-code.json'), all: fs=>generate(fs).filter(x=>x.path==='living-code.json'||x.path==='theme.css'||x.path.startsWith('snippets/')), install:readFileSync(new URL('../README.md',import.meta.url),'utf8')};

test("Warp themes are YAML with the documented keys and the right ANSI slots", () => {
  for (const f of flavors) {
    const t = parseYaml(warpTheme(f));
    assert.equal(t.name, f.name);
    for (const k of ["accent", "cursor", "background", "foreground"]) assert.match(t[k], HEX, k);
    assert.equal(t.details, f.light ? "lighter" : "darker");
    for (const set of ["normal", "bright"]) ANSI_ORDER.forEach((n, i) => assert.equal(t.terminal_colors[set][n], f.ansi[set][i], `${set} ${n}`));
    assert.equal(warp.files(f)[0].path, `${f.slug}.yaml`);
  }
  assert.match(warp.install, /~\/\.warp\/themes/);
  assert.match(warp.install, /warp-terminal\/themes/);
});
