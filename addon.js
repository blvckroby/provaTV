const { addonBuilder } = require("stremio-addon-sdk");
const fetch = require("node-fetch");

const BASE = "https://tvvoo.hayd.uk/cfg-it";

const manifest = {
    id: "org.roby.proxy.tvvoo",
    version: "1.0.0",
    name: "Roby TVVoo Proxy",
    description: "Proxy personalizzato dell'addon TVVoo",
    catalogs: [
        { type: "tv", id: "tvvoo-proxy", name: "TVVoo Proxy" }
    ],
    resources: ["catalog", "stream", "meta"],
    types: ["movie", "series", "tv"],
    idPrefixes: ["tt", "tvvoo"]
};

const builder = new addonBuilder(manifest);

// 1️⃣ Catalogo
builder.defineCatalogHandler(async (args) => {
    return {
        metas: [
            {
                id: "vavoo_SKY SPORTS F1|group:it",
                type: "tv",
                name: "Sky Sport F1",
                poster: "https://raw.githubusercontent.com/blvckroby/provaTV/main/skyf1.jpg"
            },
            {
                id: "vavoo_SKY SPORT UNO|group:it",
                type: "tv",
                name: "Sky Sport Uno",
                poster: "https://raw.githubusercontent.com/blvckroby/provaTV/main/skyuno.jpg"
            },
            {
                id: "vavoo_SKY SPORT MOTOGP|group:it",
                type: "tv",
                name: "Sky Sport MotoGP",
                poster: "https://raw.githubusercontent.com/blvckroby/provaTV/main/skymotogp.jpg"
            },
            {
                id: "vavoo_DAZN 1|group:it",
                type: "tv",
                name: "DAZN 1",
                poster: "https://raw.githubusercontent.com/blvckroby/provaTV/main/dazn1.jpg"
            },
            {
                id: "vavoo_DAZN 2|group:it",
                type: "tv",
                name: "DAZN 2",
                poster: "https://raw.githubusercontent.com/blvckroby/provaTV/main/dazn2.jpg"
            }

        ]

    }
});



// 2️⃣ Stream
builder.defineStreamHandler(async (args) => {
    if (args.id === "vavoo_SKY SPORTS F1|group:it") {
        return {
            streams: [
                {
                    title: "Sky Sport F1 – HLS",
                    url: "https://td3wb1bchdvsahp.ngolpdkyoctjcddxshli469r.org/sunshine/_nuhEl-aHl395l6DmSzW3GBgGxR3n6u3bPwO4AUUI5KxDPqQ2ApWHEr7fqocyi_FwLsPqB5UExfcSUBw0Vqsgci6I3KScdjFhHVHLwtEO84f8YPsIpDYrQivzXPmhGr4uo6nGhQj8iyS890DDgXxoMiNFPNZtc35HY5n8TX2FUMr3CJERF64LXFEl8ILF2YQI2rXfBNzo6d1lUuJOb-_efPVRMS0mCvZYaLHtlA2h3-g6PIdIuf-wLJpfB30VsBZsHXFQ6CjB0F6u2dcTfAeUgKEuDsb3-TXvlOjfq8BeBE/hls/index.m3u8"
                }
            ]
        }
    }

    return { streams: [] }
});




// 3️⃣ Meta
builder.defineMetaHandler(async (args) => {
    if (args.id === "vavoo_SKY SPORTS F1|group:it") {
        return {
            meta: {
                id: "vavoo_SKY SPORTS F1|group:it",
                type: "tv",
                name: "Sky Sport F1",
                poster: "https://raw.githubusercontent.com/blvckroby/provaTV/main/skyf1.jpg",
                description: "Sky Sport F1 – Live",
                genres: ["Sport"]
            }
        }
    }

    return { meta: {} }
});


// 4️⃣ Avvio server
module.exports = builder.getInterface();

