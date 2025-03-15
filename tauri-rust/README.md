# Number Base Converter (Tauri Version)

A cross-platform number base converter built with **Rust**, and **Tauri**.

## Features
- Convert numbers between **Binary, Decimal, Octal, and Hexadecimal**
- Clean and responsive UI
- Fast and lightweight, thanks to **Tauri**

## Installation

### Prerequisites
Ensure you have the following installed:
- [Rust](https://www.rust-lang.org/tools/install)
- [Tauri prerequisites](https://tauri.app/v1/guides/getting-started/prerequisites)
- [Node.js](https://nodejs.org/) (for frontend development)
- [Cargo](https://doc.rust-lang.org/cargo/getting-started/installation.html)

### Clone the Repository
```sh
git clone https://github.com/chochodev/Base-number-converter-rust-slint.git
cd tauri-rust
```

### Install Dependencies
```sh
pnpm install # or npm install / yarn install
```

### Run the App (Development Mode)
```sh
pnpm tauri dev # or npm run tauri dev / yarn tauri dev
```

### Build the App (Production Mode)
```sh
pnpm tauri build # or npm run tauri build / yarn tauri build
```
The built application will be available in `src-tauri/target/release/`.

## Usage
1. Select a base from the dropdown menu.
2. Enter a number in the input field.
3. Click **Convert** to see the equivalent values in other bases.

## Contributing
Feel free to fork this repository, create a feature branch, and submit a PR! 🚀

## License
MIT License