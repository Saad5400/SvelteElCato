# Svelte El Cato

Is the new website for El Cato. Using [SvelteKit](https://kit.svelte.dev/) for the frontend and [PocketBase](https://pocketbase.io/) for the backend.

# Getting started

## Prerequisites

- Node.js v20+

## Installation

Clone the repository, using the terminal or via the GitHub 'Code' > 'Download ZIP' option.

```bash
git clone https://github.com/Saad5400/SvelteElCato
cd SvelteElCato
```

Install the dependencies:

```bash
npm install
```

## Development


(Optional) download the Svelte extensions for your favourite IDE: [VSCode](https://marketplace.visualstudio.com/items?itemName=1YiB.svelte-bundle) - [WebStorm](https://www.jetbrains.com/help/webstorm/svelte.html)

Checkout the components library, [shadcn-svelte](https://www.shadcn-svelte.com/)

Create a `.env` file in the root of the project with the following content (replace the URL with the URL of your Pocketbase).

```env
PUBLIC_POCKETBASE_URL=http://127.0.0.1:8090/
```

Start the pocketbase server:

```bash
.\pb_src\pocketbase.exe serve # Windows PowerShell
pb_src/pocketbase serve # Windows Command Prompt
./pb_src/pocketbase serve # Linux / macOS / Bash
```

Start the SvelteKit server (in a new terminal):

```bash
npm run dev
```

Visit the pocketbase server at [http://127.0.0.1:8090/_/](http://127.0.0.1:8090/_/), create a new Admin user, and add
some data to the collections.

You can now visit the SvelteKit server at [http://127.0.0.1:5173](http://127.0.0.1:5173) to see the website.

## Deployment

### Backend (Pocketbase)

Deploy:

```bash
cd pb
flyctl deploy
```

Download the `pb_data` directory from the Pocketbase server:

```bash
# this will register a ssh key with your local agent (if you haven't already)
flyctl ssh issue --agent

# proxies connections to a fly VM through a Wireguard tunnel
flyctl proxy 10022:22

# run in a separate terminal to copy the pb_data directory
scp -r -P 10022 -i SSH_KEY root@localhost:/pb/pb_data  /your/local/pb_data
```