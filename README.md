# dCharity

This starter full stack project has been generated using AlgoKit. See below for default getting started instructions.

## Setup
### Initial Setup

1. **Clone the repository** to your local machine.
2. **Install and start [Docker](https://www.docker.com/)**, then set up `AlgoKit` by following the [installation guide](https://github.com/algorandfoundation/algokit-cli#install).
3. In your project directory, run `algokit localnet start` to launch a local Algorand network.
4. Initialize your environment by running `algokit project bootstrap all`. This will install all required dependencies, configure a Python virtual environment, and generate your `.env` file.
5. Build the smart contracts by executing `algokit project run build` inside `/projects/dCharity-contracts`. This step compiles your contracts and prepares them for deployment.
6. Deploy the contracts locally by running `algokit project deploy localnet` in the same directory.
7. Start the frontend server by running `npm run dev` inside `/projects/dCharity-frontend`.


### Subsequently

1. If you update to the latest source code and there are new dependencies, you will need to run `algokit project bootstrap all` again.
2. Follow steps 5 to 7 from above.

## Tools

This project makes use of Python and React to build Algorand smart contracts and to provide a base project configuration to develop frontends for your Algorand dApps and interactions with smart contracts. The following tools are in use:

- Algorand, AlgoKit, and AlgoKit Utils
- Python dependencies including Poetry, Black, Ruff or Flake8, mypy, pytest, and pip-audit
- React and related dependencies including AlgoKit Utils, Tailwind CSS, daisyUI, use-wallet, npm, jest, playwright, Prettier, ESLint, and Github Actions workflows for build validation

### VS Code

It has also been configured to have a productive dev experience out of the box in [VS Code](https://code.visualstudio.com/), see the [backend .vscode](./backend/.vscode) and [frontend .vscode](./frontend/.vscode) folders for more details.

## Explore the Blockchain

run `algokit explore` to see the blockchain live in action

## Next Steps

You can take this project and customize it to build your own decentralized applications on Algorand. Make sure to understand how to use AlgoKit and how to write smart contracts for Algorand before you start.
