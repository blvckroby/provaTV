const { addonBuilder } = require("stremio-addon-sdk");
const fetch = require("node-fetch");

const listUrl = "https://raw.githubusercontent.com/blvckroby/provaTV/refs/heads/main/list.json";

let list = [];

async function loadList() {
  try {
    const response = await fetch(listUrl);
    list = await response.json();
    console.log("Lista caricata:", list);
    startAddon();
  } catch (error) {
    console.error("Errore nel caricamento della lista:", error);
  }
}

function startAddon() {
  const builder = new addonBuilder({
    id: 'org.myaddon.streams',
    version: '1.0.0',
    name: 'My Streams',
    description: 'Addon per streaming da URL',
    resources: ['stream'],
    types: ['channel'],
  });

  // Catalog handler
  builder.defineCatalogHandler(() => {
    const metas = list.map(c => ({
      id: c.name,
      name: c.name,
      logo: c.logo,
      type: 'channel',
    }));
    console.log("Metadati del catalogo:", metas);
    return Promise.resolve({ metas });
  });

  // Stream handler
  builder.defineStreamHandler((args) => {
    console.log("Richiesta stream per id:", args.id);
    const channel = list.find(c => c.name === args.id);
    if (channel) {
      console.log("Trovato canale:", channel);
      return Promise.resolve({ streams: [{ url: channel.stream_url }] });
    } else {
      console.log("Canale non trovato");
      return Promise.resolve({ streams: [] });
    }
  });

  module.exports = builder.getInterface();
}

// Avvia il caricamento della lista
loadList();
