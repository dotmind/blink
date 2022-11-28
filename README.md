<p align="center">
  <a href="https://inablink.io/">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://inablink.io/splash.webp">
      <img src="https://inablink.io/splash.webp" height="200">
    </picture>
  </a>
</p>

<p>
  <p align="center">
      <img alt="GitHub Workflow Status" src="https://img.shields.io/github/workflow/status/dotmind/blink/continuous_deployment_staging.yml?style=flat-square">
      <img alt="license badge" src="https://img.shields.io/github/license/dotmind/blink?style=flat-square" />
      <a href="https://github.com/dotmind/blink/releases">
        <img alt="version badge" src="https://img.shields.io/github/package-json/v/dotmind/blink?color=brightgreen&style=flat-square" />
      </a>
  </p>
  <p align="center">
    <i>Send your file easily and securely</i>
  </p>
</p>

# Blink (inablink.io)

Blink is a secure and fast pdf transfer tool. It is a web application that allows you to send pdf files to your friends and colleagues. The app is made for mobile and web (PWA).

## ⚡️ Features

- 🔒 End to end encrypted transfers
- 💨 Manual / Automatic link expiration (14 days)
- 🔥 Very fast file transfer
- 🕐 Transfers history
- 📱 Mobile friendly (PWA)
- 🍃 Lightweight and optimized for low carbon consumption
- 🧘‍♀️ Company maintained

## 🛠 Development Setup

```console
  npm install
  npm run dev
```

## How to contribute ?

> Branch name must start with `fix/`, `feature/` or `enhancement/`

1. [Fork](https://help.github.com/articles/fork-a-repo/) this repository to your own GitHub account and then [clone](https://help.github.com/articles/cloning-a-repository/) it to your local device.
2. Create a new branch `git checkout -b MY_BRANCH_NAME`
3. Install the dependencies: `npm install`
4. Fill the `.env` file with your own values (see `.env.sample`)
4. Run the development server: `npm run dev`
5. Make your changes
6. Commit and push your changes
7. Create a new pull request from your forked repository

## Credits

> Project made by the [dotmind](https://dotmind.io) team.

### Authors

- Valentin Magry ([@ValMgr](https://github.com/ValMgr))

### Tools used

- [Vite](https://vitejs.dev/)
- [React Query](https://tanstack.com/query/v4/)
- [React PDF](https://react-pdf.org/)
- [TypeScript](https://www.typescriptlang.org/)

## License

This project is open source and available under the [GNU General Public License v3.0](LICENSE).
