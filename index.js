const { addonBuilder } = require("stremio-addon-sdk");
const fs = require("fs");

// Carica i canali dal file JSON
function loadChannels() {
  const data = fs.readFileSync(__dirname + "/list.json", "utf8");
  return JSON.parse(data);
}

const channels = loadChannels();

const manifest = {
  "id": "org.stremio.vavoo.clean",
  "version": "3.0.23",
  "name": "blvkcTVvoo | ElfHosted",
  "description": "Stremio addon that lists VAVOO TV channels and resolves clean HLS using the viewer's IP.",
  "background": "https://raw.githubusercontent.com/qwertyuiop8899/StreamViX/refs/heads/main/public/backround.png",
  "logo": "https://i.imgur.com/udlsVw7.png",
  "types": ["tv"],
  "idPrefixes": ["vavoo", "vavoo_"],
  "resources": ["catalog", "stream"],
  "behaviorHints": {
    "configurable": false,
    "configurationRequired": false
  },
  "main": "index.js"
};

const builder = new addonBuilder(manifest);

// Risponde al catalogo
builder.defineCatalogHandler(async (args) => {
  const { id } = args;

  if (id === "vavoo_tv_it") {
    // Catalogo con tutti i canali
    return Promise.resolve({
      metas: channels.map((channel, index) => ({
        id: `channel_${index}`,
        name: channel.name,
        poster: channel.logo,
        type: "tv"
      }))
    });
  }

  // Se vuoi altri cataloghi, aggiungi qui

  return { metas: [] };
});

// Risponde allo stream
builder.defineStreamHandler(async (args) => {
  const { id } = args;

  // Trova il canale dall'id
  const channel = channels.find((ch, index) => `channel_${index}` === id);
  if (channel) {
    return Promise.resolve({
      streams: [
        {
          url: channel.stream_url,
          title: channel.name
        }
      ]
    });
  }

  return { streams: [] };
});

module.exports = builder.getInterface();
