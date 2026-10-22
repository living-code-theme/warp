<!-- living-code-readme:1 -->
# 🌀 Living Code for Warp

**Calm slate. Living color.** Living Code for Warp. Repository-owned theme files, installation instructions and four color flavors.

[Installation](#installation) · [Flavors](#flavors) · [Configuration](#configuration) · [All ports](https://github.com/living-code-theme)

## Installation

Download the themes into Warp's [custom themes folder](https://docs.warp.dev/terminal/appearance/custom-themes), then pick one under *Settings → Appearance → Themes*. macOS:

```sh
curl -fsSL --create-dirs --output-dir ~/.warp/themes -O "https://raw.githubusercontent.com/living-code-theme/warp/main/living-code-{night,frost,paper,signal}.yaml"
```

Linux:

```sh
curl -fsSL --create-dirs --output-dir "${XDG_DATA_HOME:-$HOME/.local/share}/warp-terminal/themes" -O "https://raw.githubusercontent.com/living-code-theme/warp/main/living-code-{night,frost,paper,signal}.yaml"
```

On Windows the folder is `%APPDATA%\warp\Warp\data\themes\`. If a theme does not show up straight away, restart Warp.

## Flavors

Expand a flavor for its activation instructions.

<details data-lc-flavor="night">
<summary><strong>Night</strong> · Dark · full palette</summary>

Choose **Living Code Night** under *Settings → Appearance → Themes*.

</details>

<details data-lc-flavor="frost">
<summary><strong>Frost</strong> · Dark · softer chroma</summary>

Choose **Living Code Frost** under *Settings → Appearance → Themes*.

</details>

<details data-lc-flavor="paper">
<summary><strong>Paper</strong> · Light · near-white slate</summary>

Choose **Living Code Paper** under *Settings → Appearance → Themes*.

</details>

<details data-lc-flavor="signal">
<summary><strong>Signal</strong> · Dark · teal accent</summary>

Choose **Living Code Signal** under *Settings → Appearance → Themes*.

</details>

## Configuration

See [Warp's documentation](https://www.warp.dev) for application settings and reload behavior. The activation instructions above identify each supported flavor; keep your other application configuration.

## Compatibility

This port supplies theme files for Warp, not the application itself. Install the application separately and follow the installation instructions for its supported configuration format.

## Contributing

Found a problem? [Open an issue](https://github.com/living-code-theme/warp/issues/new/choose) with the app version, the flavor and a screenshot. Want Living Code somewhere else? [Request a port](https://github.com/living-code-theme/core/issues/new?template=port-request.yml).

Pull requests are welcome. Keep this README, `port.json` and `images/` in sync, and use real screenshots of the app, never mockups.

🦎 **One chameleon, many habitats.** Part of [Living Code](https://github.com/living-code-theme).

## License

[MIT](LICENSE) © Elliot Luque
