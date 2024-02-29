# Svelte El Cato

Is the new website for El Cato. Using SvelteKit for the frontend and Pocketbase for the backend.

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

Create a `.env` file in the root of the project with the following content (replace the URL with the URL of your Pocketbase)

```env
PUBLIC_POCKETBASE_URL=http://127.0.0.1:8090/
```

Start the pocketbase server:

```bash
.\pocketbase.exe serve
```

Start the SvelteKit server (in a new terminal):

```bash
npm run dev
```

Visit the pocketbase server at [http://127.0.0.1:8090/_/](http://127.0.0.1:8090/_/), create a new Admin user, and add
some data to the collections.

You can now visit the SvelteKit server at [http://127.0.0.1:5173](http://127.0.0.1:5173) to see the website.