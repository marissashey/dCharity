<p align="center">
  <img src="./logo.png" alt="dCharity Logo" width="200"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Algorand-Blockchain-blue.svg" />
  <img src="https://img.shields.io/badge/Python-Backend-yellow.svg" />
  <img src="https://img.shields.io/badge/React-Frontend-blue.svg" />
  <img src="https://img.shields.io/badge/Docker-DevOps-lightgrey.svg" />
</p>

# dCharity

**dCharity** is a decentralized application (dApp) for event-based charitable donations built on Algorand. It leverages smart contracts to securely manage donations, making them conditional on real-world events—allowing donors to support causes with confidence that their funds are released only when specific criteria are met.

---

## Overview

- **Event-Based Donations:** Donations are locked in smart contracts and only released when pre-defined events occur (e.g., achievement of fundraising goals, successful completion of charity actions).
- **Algorand Blockchain:** Utilizes Algorand for low fees, security, and fast finality.
- **Full Stack Solution:** Composed of Python-based smart contracts and a React frontend for user interaction.
- **Developer Experience:** Includes robust tooling, local blockchain simulation, and modern dev workflows.

---

## 🛠️ Technical Architecture

### 1. **Smart Contracts (`/projects/dCharity-contracts`)**
- **Language:** Python (with PyTeal for Algorand smart contracts)
- **Contracts:** 
  - **Donation Escrow:** Holds donor funds until event conditions are met.
  - **Event Oracle Integration:** Connects to off-chain oracles to verify real-world events.
  - **Release Logic:** Ensures atomicity and transparency in fund release or refund.

### 2. **Frontend (`/projects/dCharity-frontend`)**
- **Framework:** React
- **Features:**
  - **Wallet Integration:** Connect your Algorand wallet to donate or track events.
  - **Live Event Dashboard:** View active campaigns, event status, and donation history.
  - **Interactive UI:** Powered by Tailwind CSS and daisyUI for a modern look.

### 3. **DevOps & Tooling**
- **Localnet:** Simulate the Algorand network with `algokit localnet start`.
- **Testing:** Python (pytest), JavaScript (jest, playwright).
- **Code Quality:** Poetry, Black, Ruff, Flake8, mypy, Prettier, ESLint.
- **CI/CD:** GitHub Actions for build validation.

---

## Getting Started

### Initial Setup

1. **Clone the repository**  
   `git clone https://github.com/marissashey/dCharity.git`
2. **Install [Docker](https://www.docker.com/)** and set up [AlgoKit](https://github.com/algorandfoundation/algokit-cli#install).
3. **Start local Algorand network:**  
   `algokit localnet start`
4. **Bootstrap the project:**  
   `algokit project bootstrap all`
5. **Build contracts:**  
   `algokit project run build` (inside `/projects/dCharity-contracts`)
6. **Deploy contracts:**  
   `algokit project deploy localnet` (inside `/projects/dCharity-contracts`)
7. **Start the frontend:**  
   `npm run dev` (inside `/projects/dCharity-frontend`)

### Updating

- If you pull new code with updated dependencies:  
  `algokit project bootstrap all`
- Rebuild, redeploy contracts, and restart the frontend as above.

---

## Built With

- **Algorand, AlgoKit, AlgoKit Utils**
- **Python:** Poetry, Black, Ruff, Flake8, mypy, pytest, pip-audit
- **React:** Tailwind CSS, daisyUI, use-wallet, npm, jest, playwright
- **DevOps:** GitHub Actions, Docker
- **VS Code:** Pre-configured for productivity ([backend .vscode](./backend/.vscode), [frontend .vscode](./frontend/.vscode))

---

## Explore the Blockchain

See the blockchain live:
```
algokit explore
```

---

## Next Steps

- Customize smart contracts to your needs (e.g. support for more event types, advanced oracle integrations).
- Extend the frontend with new donation campaigns or visualization tools.
- Study [AlgoKit documentation](https://github.com/algorandfoundation/algokit-cli#install) and Algorand smart contract patterns.

---

## Contributing

Pull requests, issues, and suggestions are welcome! Help us build more transparent, event-driven charity solutions.

---

## 📄 License

See [LICENSE](./LICENSE) for details.

---
