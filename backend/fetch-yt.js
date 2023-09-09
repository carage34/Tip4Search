import fetch from 'node-fetch';
import {schemaVideo} from './models/Video.js'
import {default as mongoose} from "mongoose";
import {default as axios} from "axios";

const CHANNEL_ID = "UCdCdW2k5265_OXpAy5Nvy2g";
const PUBLISHED_AFTER = "2022-12-01T00:00:00Z";
const MAX_RESULT = 150;
const API_KEY = process.env.YOUTUBE_API;
const MONGO_URI = process.env.MONGO_URI
const videosYt = [];
let json = `{
  "kind": "youtube#searchListResponse",
  "etag": "HxMF8QP24E1upnXSBnCjBREyr0w",
  "prevPageToken": "CDIQAQ",
  "regionCode": "DE",
  "pageInfo": {
    "totalResults": 93,
    "resultsPerPage": 43
  },
  "items": [
    {
      "kind": "youtube#searchResult",
      "etag": "BeD6ofn9U5LiIPi6YaYGIgQTRkk",
      "id": {
        "kind": "youtube#video",
        "videoId": "cMTSCb5VWtA"
      },
      "snippet": {
        "publishedAt": "2023-04-15T10:21:18Z",
        "channelId": "UCdCdW2k5265_OXpAy5Nvy2g",
        "title": "(18 01 23) (Semaine 124) Soirée Compo",
        "description": "Broadcasted live on Twitch -- Watch live at https://www.twitch.tv/tipstevens.",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/cMTSCb5VWtA/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/cMTSCb5VWtA/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/cMTSCb5VWtA/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "Tip Stevens Replay",
        "liveBroadcastContent": "none",
        "publishTime": "2023-04-15T10:21:18Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "K8zQUubVEeWL7Ngt4-jzlsOupnQ",
      "id": {
        "kind": "youtube#video",
        "videoId": "nPNwiTi4n-4"
      },
      "snippet": {
        "publishedAt": "2023-07-21T21:30:07Z",
        "channelId": "UCdCdW2k5265_OXpAy5Nvy2g",
        "title": "(30 04 23) Blabla et teaser du nouveau clip ! (Stream musical à 21h30 comme d&#39;hab)| !tournée !bout",
        "description": "Broadcasted live on Twitch -- Watch live at https://www.twitch.tv/tipstevens.",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/nPNwiTi4n-4/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/nPNwiTi4n-4/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/nPNwiTi4n-4/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "Tip Stevens Replay",
        "liveBroadcastContent": "none",
        "publishTime": "2023-07-21T21:30:07Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "sgRs4J7_N12BE5f6Gyx1cfcwsY4",
      "id": {
        "kind": "youtube#video",
        "videoId": "QoDJBaZbCNk"
      },
      "snippet": {
        "publishedAt": "2023-07-21T21:26:52Z",
        "channelId": "UCdCdW2k5265_OXpAy5Nvy2g",
        "title": "(10 03 23) Stream musical détente",
        "description": "Broadcasted live on Twitch -- Watch live at https://www.twitch.tv/tipstevens.",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/QoDJBaZbCNk/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/QoDJBaZbCNk/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/QoDJBaZbCNk/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "Tip Stevens Replay",
        "liveBroadcastContent": "none",
        "publishTime": "2023-07-21T21:26:52Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "0npHK_aIxQbxVvHPVeTJijMdFrE",
      "id": {
        "kind": "youtube#video",
        "videoId": "7Ua8e0-Ojjc"
      },
      "snippet": {
        "publishedAt": "2023-07-21T21:26:33Z",
        "channelId": "UCdCdW2k5265_OXpAy5Nvy2g",
        "title": "(08 03 23) (Semaine 4) Stream Dessin",
        "description": "Broadcasted live on Twitch -- Watch live at https://www.twitch.tv/tipstevens.",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/7Ua8e0-Ojjc/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/7Ua8e0-Ojjc/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/7Ua8e0-Ojjc/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "Tip Stevens Replay",
        "liveBroadcastContent": "none",
        "publishTime": "2023-07-21T21:26:33Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "KTm2AUEX8Bmf1VxJ5yg52i0vbNI",
      "id": {
        "kind": "youtube#video",
        "videoId": "D98SeODVLnk"
      },
      "snippet": {
        "publishedAt": "2023-04-15T10:30:47Z",
        "channelId": "UCdCdW2k5265_OXpAy5Nvy2g",
        "title": "(17 02 23) Stream musical détente :)",
        "description": "Broadcasted live on Twitch -- Watch live at https://www.twitch.tv/tipstevens.",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/D98SeODVLnk/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/D98SeODVLnk/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/D98SeODVLnk/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "Tip Stevens Replay",
        "liveBroadcastContent": "none",
        "publishTime": "2023-04-15T10:30:47Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "Bz-eCX32q6_p6l-beG471pp4tGI",
      "id": {
        "kind": "youtube#video",
        "videoId": "uOsv24lvq2I"
      },
      "snippet": {
        "publishedAt": "2023-01-17T11:56:36Z",
        "channelId": "UCdCdW2k5265_OXpAy5Nvy2g",
        "title": "(04 11 22) Stream musical détente",
        "description": "Broadcasted live on Twitch -- Watch live at https://www.twitch.tv/tipstevens.",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/uOsv24lvq2I/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/uOsv24lvq2I/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/uOsv24lvq2I/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "Tip Stevens Replay",
        "liveBroadcastContent": "none",
        "publishTime": "2023-01-17T11:56:36Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "GprMR05mGqaevcAaSli-7tcW9ik",
      "id": {
        "kind": "youtube#video",
        "videoId": "4Cq2eAg7zLA"
      },
      "snippet": {
        "publishedAt": "2023-01-17T11:55:40Z",
        "channelId": "UCdCdW2k5265_OXpAy5Nvy2g",
        "title": "(30 10 22) Pré live blabla / On fait de la musique dès 21h30",
        "description": "Broadcasted live on Twitch -- Watch live at https://www.twitch.tv/tipstevens.",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/4Cq2eAg7zLA/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/4Cq2eAg7zLA/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/4Cq2eAg7zLA/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "Tip Stevens Replay",
        "liveBroadcastContent": "none",
        "publishTime": "2023-01-17T11:55:40Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "BkTtYI1Ilye86OKO8vt52PqJB68",
      "id": {
        "kind": "youtube#video",
        "videoId": "XE2vtPYzGKU"
      },
      "snippet": {
        "publishedAt": "2023-07-21T21:28:23Z",
        "channelId": "UCdCdW2k5265_OXpAy5Nvy2g",
        "title": "(12 04 23) (Semaine 128) Soirée Compo",
        "description": "Broadcasted live on Twitch -- Watch live at https://www.twitch.tv/tipstevens.",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/XE2vtPYzGKU/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/XE2vtPYzGKU/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/XE2vtPYzGKU/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "Tip Stevens Replay",
        "liveBroadcastContent": "none",
        "publishTime": "2023-07-21T21:28:23Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "iS5TIBjdGIKTFyw7LQL0u-LRXbc",
      "id": {
        "kind": "youtube#video",
        "videoId": "xwBHGiHmveU"
      },
      "snippet": {
        "publishedAt": "2023-01-17T11:56:04Z",
        "channelId": "UCdCdW2k5265_OXpAy5Nvy2g",
        "title": "(30 10 22) Le traditionnel stream musical du dimanche soir :)",
        "description": "Broadcasted live on Twitch -- Watch live at https://www.twitch.tv/tipstevens.",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/xwBHGiHmveU/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/xwBHGiHmveU/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/xwBHGiHmveU/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "Tip Stevens Replay",
        "liveBroadcastContent": "none",
        "publishTime": "2023-01-17T11:56:04Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "J6Zj29f2GWQNsmyKrFuuRNrMbP4",
      "id": {
        "kind": "youtube#video",
        "videoId": "zY7Vyug015Q"
      },
      "snippet": {
        "publishedAt": "2023-01-17T12:16:31Z",
        "channelId": "UCdCdW2k5265_OXpAy5Nvy2g",
        "title": "(20 11 22) Pré live blabla (Le traditionnel stream musical du dimanche soir à 21h30)",
        "description": "Broadcasted live on Twitch -- Watch live at https://www.twitch.tv/tipstevens.",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/zY7Vyug015Q/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/zY7Vyug015Q/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/zY7Vyug015Q/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "Tip Stevens Replay",
        "liveBroadcastContent": "none",
        "publishTime": "2023-01-17T12:16:31Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "nqeziheWTb-gG4iYvLvDnxhdSkw",
      "id": {
        "kind": "youtube#video",
        "videoId": "mcnUshBi8dE"
      },
      "snippet": {
        "publishedAt": "2023-07-21T21:29:20Z",
        "channelId": "UCdCdW2k5265_OXpAy5Nvy2g",
        "title": "(26 04 23) Un peu de blabla et après on voit ce qu&#39;on fait",
        "description": "Broadcasted live on Twitch -- Watch live at https://www.twitch.tv/tipstevens.",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/mcnUshBi8dE/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/mcnUshBi8dE/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/mcnUshBi8dE/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "Tip Stevens Replay",
        "liveBroadcastContent": "none",
        "publishTime": "2023-07-21T21:29:20Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "0Rvc96aw8VstFdm9OffKNDzSqWA",
      "id": {
        "kind": "youtube#video",
        "videoId": "CnKRkFXMJ_s"
      },
      "snippet": {
        "publishedAt": "2023-01-17T12:18:07Z",
        "channelId": "UCdCdW2k5265_OXpAy5Nvy2g",
        "title": "(27 11 22) Pré live blabla (Le traditionnel stream musical du dimanche soir à 21h30)",
        "description": "Broadcasted live on Twitch -- Watch live at https://www.twitch.tv/tipstevens.",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/CnKRkFXMJ_s/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/CnKRkFXMJ_s/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/CnKRkFXMJ_s/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "Tip Stevens Replay",
        "liveBroadcastContent": "none",
        "publishTime": "2023-01-17T12:18:07Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "HOQp_3-wwTFaV0jSu2eJB4jITnQ",
      "id": {
        "kind": "youtube#video",
        "videoId": "LSy_j3KolSA"
      },
      "snippet": {
        "publishedAt": "2023-01-17T12:23:34Z",
        "channelId": "UCdCdW2k5265_OXpAy5Nvy2g",
        "title": "(14 12 22) (Semaine 121) Soirée Compo",
        "description": "Broadcasted live on Twitch -- Watch live at https://www.twitch.tv/tipstevens.",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/LSy_j3KolSA/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/LSy_j3KolSA/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/LSy_j3KolSA/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "Tip Stevens Replay",
        "liveBroadcastContent": "none",
        "publishTime": "2023-01-17T12:23:34Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "xzKtSj81-JipEr_cquOM8DjKof0",
      "id": {
        "kind": "youtube#video",
        "videoId": "96zeQe92AaU"
      },
      "snippet": {
        "publishedAt": "2023-07-21T21:28:16Z",
        "channelId": "UCdCdW2k5265_OXpAy5Nvy2g",
        "title": "(07 04 23) Répétition des compos pour s’entraîner au chant avant les prochains concerts !",
        "description": "Broadcasted live on Twitch -- Watch live at https://www.twitch.tv/tipstevens.",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/96zeQe92AaU/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/96zeQe92AaU/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/96zeQe92AaU/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "Tip Stevens Replay",
        "liveBroadcastContent": "none",
        "publishTime": "2023-07-21T21:28:16Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "0DTdYqABnYzeVVw_4XtBcvmv7wU",
      "id": {
        "kind": "youtube#video",
        "videoId": "Q3sKg8QbDhQ"
      },
      "snippet": {
        "publishedAt": "2023-07-21T21:29:16Z",
        "channelId": "UCdCdW2k5265_OXpAy5Nvy2g",
        "title": "(23 04 23) Pré live blabla (Stream musical à 21h30 comme d&#39;hab)",
        "description": "Broadcasted live on Twitch -- Watch live at https://www.twitch.tv/tipstevens.",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/Q3sKg8QbDhQ/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/Q3sKg8QbDhQ/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/Q3sKg8QbDhQ/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "Tip Stevens Replay",
        "liveBroadcastContent": "none",
        "publishTime": "2023-07-21T21:29:16Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "mUdjeoqQQ5u77HpZg53MnqkDG78",
      "id": {
        "kind": "youtube#video",
        "videoId": "NYWXF7MKRus"
      },
      "snippet": {
        "publishedAt": "2023-04-15T10:33:56Z",
        "channelId": "UCdCdW2k5265_OXpAy5Nvy2g",
        "title": "(26 02 23) Annonce de la tournée ! (Stream musical comme d&#39;hab à 21h30)",
        "description": "Broadcasted live on Twitch -- Watch live at https://www.twitch.tv/tipstevens.",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/NYWXF7MKRus/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/NYWXF7MKRus/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/NYWXF7MKRus/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "Tip Stevens Replay",
        "liveBroadcastContent": "none",
        "publishTime": "2023-04-15T10:33:56Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "DVT7U1sYOIKtYTKGOVL3GektSZA",
      "id": {
        "kind": "youtube#video",
        "videoId": "q19dDGUzOzw"
      },
      "snippet": {
        "publishedAt": "2023-04-15T10:22:40Z",
        "channelId": "UCdCdW2k5265_OXpAy5Nvy2g",
        "title": "(25 01 23) Le retour des streams dessins (Aled j&#39;ai pas dessiné depuis 1000 ans)",
        "description": "Broadcasted live on Twitch -- Watch live at https://www.twitch.tv/tipstevens.",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/q19dDGUzOzw/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/q19dDGUzOzw/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/q19dDGUzOzw/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "Tip Stevens Replay",
        "liveBroadcastContent": "none",
        "publishTime": "2023-04-15T10:22:40Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "vPX26Fah5jkqbu-o8qG9hI2WCZE",
      "id": {
        "kind": "youtube#video",
        "videoId": "44v3CfGuuo8"
      },
      "snippet": {
        "publishedAt": "2023-01-17T12:15:52Z",
        "channelId": "UCdCdW2k5265_OXpAy5Nvy2g",
        "title": "(16 11 22) (Semaine 117) Soirée Compo P2",
        "description": "Broadcasted live on Twitch -- Watch live at https://www.twitch.tv/tipstevens.",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/44v3CfGuuo8/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/44v3CfGuuo8/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/44v3CfGuuo8/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "Tip Stevens Replay",
        "liveBroadcastContent": "none",
        "publishTime": "2023-01-17T12:15:52Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "29AM9tlSweIJ9rYANqeaLoGoWVs",
      "id": {
        "kind": "youtube#video",
        "videoId": "mZQr3i8U7LU"
      },
      "snippet": {
        "publishedAt": "2023-07-21T21:29:36Z",
        "channelId": "UCdCdW2k5265_OXpAy5Nvy2g",
        "title": "(28 04 23) Stream musical détente | !tournée !boutique",
        "description": "Broadcasted live on Twitch -- Watch live at https://www.twitch.tv/tipstevens.",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/mZQr3i8U7LU/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/mZQr3i8U7LU/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/mZQr3i8U7LU/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "Tip Stevens Replay",
        "liveBroadcastContent": "none",
        "publishTime": "2023-07-21T21:29:36Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "Pnwl-VCddc1jpIUSHIRJaTApWiw",
      "id": {
        "kind": "youtube#video",
        "videoId": "WuJk5Wyk2VM"
      },
      "snippet": {
        "publishedAt": "2023-04-15T10:23:31Z",
        "channelId": "UCdCdW2k5265_OXpAy5Nvy2g",
        "title": "(27 01 23) Stream musical détente",
        "description": "Broadcasted live on Twitch -- Watch live at https://www.twitch.tv/tipstevens.",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/WuJk5Wyk2VM/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/WuJk5Wyk2VM/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/WuJk5Wyk2VM/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "Tip Stevens Replay",
        "liveBroadcastContent": "none",
        "publishTime": "2023-04-15T10:23:31Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "x0eTuHFsKFeNeM-dAflDu31LES4",
      "id": {
        "kind": "youtube#video",
        "videoId": "ZDjqp2RtLsI"
      },
      "snippet": {
        "publishedAt": "2023-01-17T11:52:39Z",
        "channelId": "UCdCdW2k5265_OXpAy5Nvy2g",
        "title": "(16 10 22) Le traditionnel stream musical du dimanche soir",
        "description": "Broadcasted live on Twitch -- Watch live at https://www.twitch.tv/tipstevens.",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/ZDjqp2RtLsI/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/ZDjqp2RtLsI/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/ZDjqp2RtLsI/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "Tip Stevens Replay",
        "liveBroadcastContent": "none",
        "publishTime": "2023-01-17T11:52:39Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "8kPVs4UpfRdHKeSPNDS_HwxS9k0",
      "id": {
        "kind": "youtube#video",
        "videoId": "loD-AL-BxX8"
      },
      "snippet": {
        "publishedAt": "2023-01-17T12:17:17Z",
        "channelId": "UCdCdW2k5265_OXpAy5Nvy2g",
        "title": "(23 11 22) (Semaine 118) Soirée Compo",
        "description": "Broadcasted live on Twitch -- Watch live at https://www.twitch.tv/tipstevens.",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/loD-AL-BxX8/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/loD-AL-BxX8/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/loD-AL-BxX8/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "Tip Stevens Replay",
        "liveBroadcastContent": "none",
        "publishTime": "2023-01-17T12:17:17Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "YVmGnjqBq3JqlIZwTnna1GYXg3E",
      "id": {
        "kind": "youtube#video",
        "videoId": "gvoLBEkIkXU"
      },
      "snippet": {
        "publishedAt": "2023-01-17T12:22:50Z",
        "channelId": "UCdCdW2k5265_OXpAy5Nvy2g",
        "title": "(07 12 22) (Semaine 120) Soirée Compo",
        "description": "Broadcasted live on Twitch -- Watch live at https://www.twitch.tv/tipstevens.",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/gvoLBEkIkXU/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/gvoLBEkIkXU/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/gvoLBEkIkXU/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "Tip Stevens Replay",
        "liveBroadcastContent": "none",
        "publishTime": "2023-01-17T12:22:50Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "jwQZ3fshAocpD9Ai4a8pk9t4tg4",
      "id": {
        "kind": "youtube#video",
        "videoId": "gsOgJz-DPn8"
      },
      "snippet": {
        "publishedAt": "2023-07-21T21:31:44Z",
        "channelId": "UCdCdW2k5265_OXpAy5Nvy2g",
        "title": "(21 05 23) Écoute en avant première de mon nouvel EP &quot;Bengal&quot; à 22h | !boutique !tournée !bengal",
        "description": "Broadcasted live on Twitch -- Watch live at https://www.twitch.tv/tipstevens.",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/gsOgJz-DPn8/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/gsOgJz-DPn8/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/gsOgJz-DPn8/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "Tip Stevens Replay",
        "liveBroadcastContent": "none",
        "publishTime": "2023-07-21T21:31:44Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "wiwxqNKBiVe7NwfHgyA44VW5Uu4",
      "id": {
        "kind": "youtube#video",
        "videoId": "f_3NvVkzTcc"
      },
      "snippet": {
        "publishedAt": "2023-01-17T11:51:53Z",
        "channelId": "UCdCdW2k5265_OXpAy5Nvy2g",
        "title": "(09 10 22) Le traditionnel stream musical du dimanche soir",
        "description": "Broadcasted live on Twitch -- Watch live at https://www.twitch.tv/tipstevens.",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/f_3NvVkzTcc/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/f_3NvVkzTcc/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/f_3NvVkzTcc/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "Tip Stevens Replay",
        "liveBroadcastContent": "none",
        "publishTime": "2023-01-17T11:51:53Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "PyiCGBnOOA2P1cfHewDQdw88p_0",
      "id": {
        "kind": "youtube#video",
        "videoId": "3Vz5PNKkLVM"
      },
      "snippet": {
        "publishedAt": "2023-01-17T11:50:44Z",
        "channelId": "UCdCdW2k5265_OXpAy5Nvy2g",
        "title": "(05 10 22) (Semaine 114) Soirée Compo",
        "description": "Broadcasted live on Twitch -- Watch live at https://www.twitch.tv/tipstevens.",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/3Vz5PNKkLVM/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/3Vz5PNKkLVM/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/3Vz5PNKkLVM/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "Tip Stevens Replay",
        "liveBroadcastContent": "none",
        "publishTime": "2023-01-17T11:50:44Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "SOR7pxb4VvMZyR-Zf6qaLTTi1pM",
      "id": {
        "kind": "youtube#video",
        "videoId": "gtOklhxRJCY"
      },
      "snippet": {
        "publishedAt": "2023-04-15T10:34:31Z",
        "channelId": "UCdCdW2k5265_OXpAy5Nvy2g",
        "title": "(01 03 23) (Semaine 127) Soirée Compo",
        "description": "Broadcasted live on Twitch -- Watch live at https://www.twitch.tv/tipstevens.",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/gtOklhxRJCY/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/gtOklhxRJCY/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/gtOklhxRJCY/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "Tip Stevens Replay",
        "liveBroadcastContent": "none",
        "publishTime": "2023-04-15T10:34:31Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "uaswx87wPBZvaWo-OLJU0rOKibA",
      "id": {
        "kind": "youtube#video",
        "videoId": "NJrIduQP6Ow"
      },
      "snippet": {
        "publishedAt": "2023-07-21T21:29:12Z",
        "channelId": "UCdCdW2k5265_OXpAy5Nvy2g",
        "title": "(21 04 23) Stream musical détente",
        "description": "Broadcasted live on Twitch -- Watch live at https://www.twitch.tv/tipstevens.",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/NJrIduQP6Ow/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/NJrIduQP6Ow/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/NJrIduQP6Ow/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "Tip Stevens Replay",
        "liveBroadcastContent": "none",
        "publishTime": "2023-07-21T21:29:12Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "FJsjOdrWVvH0h2AokhUWyu53_r8",
      "id": {
        "kind": "youtube#video",
        "videoId": "kic9AI12QCI"
      },
      "snippet": {
        "publishedAt": "2023-01-17T12:17:45Z",
        "channelId": "UCdCdW2k5265_OXpAy5Nvy2g",
        "title": "(25 11 22) Stream musical détente",
        "description": "Broadcasted live on Twitch -- Watch live at https://www.twitch.tv/tipstevens.",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/kic9AI12QCI/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/kic9AI12QCI/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/kic9AI12QCI/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "Tip Stevens Replay",
        "liveBroadcastContent": "none",
        "publishTime": "2023-01-17T12:17:45Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "JWK4sgPJKSSdQO80qbwFOumyOEQ",
      "id": {
        "kind": "youtube#video",
        "videoId": "zNPNAG-_1eg"
      },
      "snippet": {
        "publishedAt": "2023-07-21T21:32:10Z",
        "channelId": "UCdCdW2k5265_OXpAy5Nvy2g",
        "title": "(28 05 23) Débrief de la tournée, petit live blabla chill | !boutique !tournée !bengal",
        "description": "Broadcasted live on Twitch -- Watch live at https://www.twitch.tv/tipstevens.",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/zNPNAG-_1eg/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/zNPNAG-_1eg/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/zNPNAG-_1eg/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "Tip Stevens Replay",
        "liveBroadcastContent": "none",
        "publishTime": "2023-07-21T21:32:10Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "aaYNb9qUZW2rxd3J0Y1Egnrg6Dg",
      "id": {
        "kind": "youtube#video",
        "videoId": "mJ5P4hWZfr4"
      },
      "snippet": {
        "publishedAt": "2023-07-21T21:31:15Z",
        "channelId": "UCdCdW2k5265_OXpAy5Nvy2g",
        "title": "(10 05 23) Petit stream chill avant le début de la tournée | !tournée !boutique !bengal",
        "description": "Broadcasted live on Twitch -- Watch live at https://www.twitch.tv/tipstevens.",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/mJ5P4hWZfr4/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/mJ5P4hWZfr4/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/mJ5P4hWZfr4/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "Tip Stevens Replay",
        "liveBroadcastContent": "none",
        "publishTime": "2023-07-21T21:31:15Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "kPt9wHSgPLZWS5zgACd02HmtmTE",
      "id": {
        "kind": "youtube#video",
        "videoId": "gak1mHTVgbE"
      },
      "snippet": {
        "publishedAt": "2023-01-17T12:19:28Z",
        "channelId": "UCdCdW2k5265_OXpAy5Nvy2g",
        "title": "(30 11 22) (Semaine 119) Soirée Compo",
        "description": "Broadcasted live on Twitch -- Watch live at https://www.twitch.tv/tipstevens.",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/gak1mHTVgbE/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/gak1mHTVgbE/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/gak1mHTVgbE/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "Tip Stevens Replay",
        "liveBroadcastContent": "none",
        "publishTime": "2023-01-17T12:19:28Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "WeRpnEbCzNnZly9ZWCrBGqUTfvQ",
      "id": {
        "kind": "youtube#video",
        "videoId": "lnAUvZtu-1s"
      },
      "snippet": {
        "publishedAt": "2023-01-17T11:54:59Z",
        "channelId": "UCdCdW2k5265_OXpAy5Nvy2g",
        "title": "(23 10 22) Écoute en avant-première de mon nouvel EP &quot;Kaioty&quot; P2",
        "description": "Broadcasted live on Twitch -- Watch live at https://www.twitch.tv/tipstevens.",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/lnAUvZtu-1s/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/lnAUvZtu-1s/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/lnAUvZtu-1s/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "Tip Stevens Replay",
        "liveBroadcastContent": "none",
        "publishTime": "2023-01-17T11:54:59Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "2AWFJucpiVfYqYk1M1AoQdTqcIQ",
      "id": {
        "kind": "youtube#video",
        "videoId": "BUfYX6KOR6k"
      },
      "snippet": {
        "publishedAt": "2023-04-15T10:35:01Z",
        "channelId": "UCdCdW2k5265_OXpAy5Nvy2g",
        "title": "(05 03 23) Y&#39;a du nouveau concernant la tournée ! Grosse annonce puis stream musical comme d&#39;hab !t",
        "description": "Broadcasted live on Twitch -- Watch live at https://www.twitch.tv/tipstevens.",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/BUfYX6KOR6k/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/BUfYX6KOR6k/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/BUfYX6KOR6k/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "Tip Stevens Replay",
        "liveBroadcastContent": "none",
        "publishTime": "2023-04-15T10:35:01Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "pG1huNUxogP7geZYdv2ObGXICFU",
      "id": {
        "kind": "youtube#video",
        "videoId": "pALaBqqv5cM"
      },
      "snippet": {
        "publishedAt": "2023-04-15T10:35:16Z",
        "channelId": "UCdCdW2k5265_OXpAy5Nvy2g",
        "title": "(07 03 23) Outer Wilds ! (On finit ce soir ??) // Spoil = Ban",
        "description": "Broadcasted live on Twitch -- Watch live at https://www.twitch.tv/tipstevens.",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/pALaBqqv5cM/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/pALaBqqv5cM/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/pALaBqqv5cM/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "Tip Stevens Replay",
        "liveBroadcastContent": "none",
        "publishTime": "2023-04-15T10:35:16Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "MXGhBv0uehTUGS5L1f5s_2T316g",
      "id": {
        "kind": "youtube#video",
        "videoId": "B0Xy1NUaP5s"
      },
      "snippet": {
        "publishedAt": "2023-07-21T21:30:47Z",
        "channelId": "UCdCdW2k5265_OXpAy5Nvy2g",
        "title": "(07 05 23) &quot;Sugar Rush&quot; nouveau clip à 22h // Sortie sur les plateformes de streaming à 00h | !sug",
        "description": "Broadcasted live on Twitch -- Watch live at https://www.twitch.tv/tipstevens.",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/B0Xy1NUaP5s/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/B0Xy1NUaP5s/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/B0Xy1NUaP5s/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "Tip Stevens Replay",
        "liveBroadcastContent": "none",
        "publishTime": "2023-07-21T21:30:47Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "Xq1Vbw_6Oi0iP4oB0iuqnE48SuM",
      "id": {
        "kind": "youtube#video",
        "videoId": "H46gyYR_kvU"
      },
      "snippet": {
        "publishedAt": "2023-04-15T10:21:36Z",
        "channelId": "UCdCdW2k5265_OXpAy5Nvy2g",
        "title": "(20 01 23) Stream musical détente :)",
        "description": "Broadcasted live on Twitch -- Watch live at https://www.twitch.tv/tipstevens.",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/H46gyYR_kvU/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/H46gyYR_kvU/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/H46gyYR_kvU/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "Tip Stevens Replay",
        "liveBroadcastContent": "none",
        "publishTime": "2023-04-15T10:21:36Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "McS_tHsyku9XMnCAuPWQiAciLlQ",
      "id": {
        "kind": "youtube#video",
        "videoId": "eLIIb7FElJ4"
      },
      "snippet": {
        "publishedAt": "2023-04-15T10:34:16Z",
        "channelId": "UCdCdW2k5265_OXpAy5Nvy2g",
        "title": "(28 02 23) On continue (et termine peut être ?) Outer Wilds // NO SPOIL",
        "description": "Broadcasted live on Twitch -- Watch live at https://www.twitch.tv/tipstevens.",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/eLIIb7FElJ4/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/eLIIb7FElJ4/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/eLIIb7FElJ4/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "Tip Stevens Replay",
        "liveBroadcastContent": "none",
        "publishTime": "2023-04-15T10:34:16Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "4PUJ2wQd2InZ_3wbzmhdcWiQuhg",
      "id": {
        "kind": "youtube#video",
        "videoId": "Qmk2nUITa6E"
      },
      "snippet": {
        "publishedAt": "2023-01-17T12:22:33Z",
        "channelId": "UCdCdW2k5265_OXpAy5Nvy2g",
        "title": "(04 12 22) Le traditionnel stream musical du dimanche soir P2",
        "description": "Broadcasted live on Twitch -- Watch live at https://www.twitch.tv/tipstevens.",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/Qmk2nUITa6E/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/Qmk2nUITa6E/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/Qmk2nUITa6E/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "Tip Stevens Replay",
        "liveBroadcastContent": "none",
        "publishTime": "2023-01-17T12:22:33Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "aER7szSV2tyoWxMosrGJliWJcqQ",
      "id": {
        "kind": "youtube#video",
        "videoId": "pDNvsUFRG4k"
      },
      "snippet": {
        "publishedAt": "2023-04-15T10:21:58Z",
        "channelId": "UCdCdW2k5265_OXpAy5Nvy2g",
        "title": "(22 01 23) Le traditionnel stream musical du dimanche soir à 21h30",
        "description": "Broadcasted live on Twitch -- Watch live at https://www.twitch.tv/tipstevens.",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/pDNvsUFRG4k/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/pDNvsUFRG4k/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/pDNvsUFRG4k/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "Tip Stevens Replay",
        "liveBroadcastContent": "none",
        "publishTime": "2023-04-15T10:21:58Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "plArIETBxQuKKeTuA7KUN-8iPQ8",
      "id": {
        "kind": "youtube#video",
        "videoId": "RL9U9sE84V0"
      },
      "snippet": {
        "publishedAt": "2023-04-15T10:22:14Z",
        "channelId": "UCdCdW2k5265_OXpAy5Nvy2g",
        "title": "(24 01 23) On continue Outer Wilds",
        "description": "Broadcasted live on Twitch -- Watch live at https://www.twitch.tv/tipstevens.",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/RL9U9sE84V0/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/RL9U9sE84V0/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/RL9U9sE84V0/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "Tip Stevens Replay",
        "liveBroadcastContent": "none",
        "publishTime": "2023-04-15T10:22:14Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "6eVnKC6hcTuRfANSPptUKtHa3Qw",
      "id": {
        "kind": "youtube#video",
        "videoId": "BJb0qP8-New"
      },
      "snippet": {
        "publishedAt": "2023-01-17T11:54:37Z",
        "channelId": "UCdCdW2k5265_OXpAy5Nvy2g",
        "title": "(23 10 22) Écoute en avant-première de mon nouvel EP &quot;Kaioty&quot; P1",
        "description": "Broadcasted live on Twitch -- Watch live at https://www.twitch.tv/tipstevens.",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/BJb0qP8-New/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/BJb0qP8-New/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/BJb0qP8-New/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "Tip Stevens Replay",
        "liveBroadcastContent": "none",
        "publishTime": "2023-01-17T11:54:37Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "cMny63pxe3HLWYaO7I85UoTMtjY",
      "id": {
        "kind": "youtube#video",
        "videoId": "a20WynwLzg0"
      },
      "snippet": {
        "publishedAt": "2023-04-15T10:05:11Z",
        "channelId": "UCdCdW2k5265_OXpAy5Nvy2g",
        "title": "(17 01 23) (Mardi Gaming) Découverte d&#39;Outer Wilds",
        "description": "Broadcasted live on Twitch -- Watch live at https://www.twitch.tv/tipstevens.",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/a20WynwLzg0/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/a20WynwLzg0/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/a20WynwLzg0/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "Tip Stevens Replay",
        "liveBroadcastContent": "none",
        "publishTime": "2023-04-15T10:05:11Z"
      }
    }
  ]
}
`
getVideosTest();
function getVideos(pageToken) {
    //return new Promise((resolve, reject) => {
        let url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&maxResults=${MAX_RESULT}&publishedAfter=${PUBLISHED_AFTER}&key=${API_KEY}`
        if(pageToken) {
            url += `&pageToken=${pageToken}`;
        }
        fetch(url)
            .then(res => {
                return res.json()
            }).then(json => {
            console.log(json)
            let snippet = json.items.map(item => item);
            videosYt.push(snippet);
            if(json.nextPageToken) {
                getVideos(json.nextPageToken);
            } else {
                start();
            }
            //console.log(snippet);
            //resolve(snippet);
        });
    //});
}

function getVideosTest() {
    const obj = JSON.parse(json);
    let snippet = obj.items.map(item => item);
    videosYt.push(snippet);
    start();
}

async function start() {
    await connectToMongo();
    let vodTwitch = await getVods();
    for(let i=0; i < vodTwitch.length; i++) {
        if(!vodTwitch[i].twitchid) {
            //vodTwitch[i].available = false;
            vodTwitch[i].set({available: false})
        }
        let twitchDateSplit = vodTwitch[i].postedAt.toLocaleDateString();
        let youtubeDateFormat = `(${twitchDateSplit.substring(0, 2)} ${twitchDateSplit.substring(3, 5)} ${twitchDateSplit.substring(8, 10)})`;
        let items = videosYt[0].filter(item => item.snippet.title.includes(youtubeDateFormat));
        if(items.length > 0) {
            console.log(items);
            console.log(vodTwitch[i]);
            //vodTwitch[i].youtubeid = items[0].id.videoId;
            vodTwitch[i].set({youtubeid: items[0].id.videoId})
        }
        if(vodTwitch[i].twitchid) {
            vodTwitch[i].set({available: await isVodAvailable(vodTwitch[i].twitchid)});
            //vodTwitch[i].available = await isVodAvailable(vodTwitch[i].twitchid);
        }
        await vodTwitch[i].save();
    }
}

function getVods() {
    return new Promise((resolve, reject) => {
        schemaVideo.find().then(video => {
            resolve(video);
        })
            .catch(err => {
                console.log(err);
            })
    });
}

function connectToMongo() {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(MONGO_URI)
            .then((x) => {
                console.log(`Connecté à Mongo! Nom de la base: "${x.connections[0].name}"`)
                resolve();
            })
            .catch((err) => {
                console.error('Erreur de connexion à la base', err.reason)
            })
    })

}

function isVodAvailable(twitchId) {
    return new Promise((resolve, reject) => {
        fetch(`https://api.twitch.tv/helix/videos?id=${twitchId}`, {headers: {Authorization: process.env.TOKEN_TWITCH, "Client-ID": process.env.CLIENTID_TWITCH}})
            .then(res => {
                return res.json()
            })
            .then(json => {
                if(json.error) {
                    resolve(false);
                } else {
                    resolve(true);
                }
            })
    });
}

