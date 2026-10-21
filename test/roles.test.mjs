// Port-owned role-contract tests, exercising generated files and real grammars.
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import test from 'node:test';
import {resolveAll} from '../scripts/palette.mjs';
import {generate} from '../src/generate.mjs';

const flavors = resolveAll();

const root = new URL("../", import.meta.url);

const read = (path) => readFileSync(new URL(path, root), "utf8");

const TERMINALS = {warp: (f) => {
    const t = read(`${f.slug}.yaml`);
    const v = (s, k) => s.match(new RegExp(`^\\s*${k}: '(#[0-9a-f]{6})'`, "m"))?.[1];
    const normal = t.slice(t.indexOf("normal:"), t.indexOf("bright:")), bright = t.slice(t.indexOf("bright:"));
    const names = ["black", "red", "green", "yellow", "blue", "magenta", "cyan", "white"];
    return { bg: v(t, "background"), fg: v(t, "foreground"), cursor: v(t, "cursor"), ansi: [...names.map((n) => v(normal, n)), ...names.map((n) => v(bright, n))] };
  }};

const norm = (hex) => hex?.toLowerCase().slice(0, 7);

test("every terminal has the same ANSI colors, background, foreground, cursor and selection", () => {
  const failures = [];
  for (const f of flavors) {
    const want = { bg: f.r("bg"), fg: f.r("fg"), cursor: f.r("cursor"), selection: f.r("selection"), ansi: [...f.ansi.normal, ...f.ansi.bright] };
    for (const [port, load] of Object.entries(TERMINALS)) {
      const got = load(f);
      for (const k of ["bg", "fg", "cursor", "selection"]) {
        if (k in got && norm(got[k]) !== norm(want[k])) failures.push(`${port} ${f.id} ${k}: ${want[k]}, got ${got[k]}`);
      }
      got.ansi.forEach((c, i) => { if (norm(c) !== norm(want.ansi[i])) failures.push(`${port} ${f.id} ANSI ${i}: ${want.ansi[i]}, got ${c}`); });
    }
  }
  assert.deepEqual(failures, []);
});
