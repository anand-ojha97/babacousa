// Replace src/data/brands.js with this file.
// New video files belong in public/videos/ and are served from /videos/.
// Meenu keeps one existing clip from public/videoss/.
// Preserve this brand order so existing numeric brand links keep working.
// Keep "adrash_snacks.mp4" exactly as shown in your uploaded file list.
// Add categories with a unique id, a label and a video path. No images/posters.
export const brandCatalog = [	
  {
    "name": "Anand",
    "categories": [
      {
        "id": "anand-frozen-vegetables",
        "label": "Frozen Vegetables",
        "video": "/videos/anand_ash_gourd.mp4"
      },
      {
        "id": "anand-frozen-food",
        "label": "Frozen Food",
        "video": "/videos/anand_ragi_puttu.mp4"
      },
      {
        "id": "anand-dry-whole-chili",
        "label": "Dry Whole Chili",
        "video": "/videos/anand_dry_whole_chili.mp4"
      },
      {
        "id": "anand-chili-powder",
        "label": "Chili Powder",
        "video": "/videos/anand_chili_powder.mp4"
      },
      {
        "id": "anand-snacks",
        "label": "Anand Snacks",
        "video": "/videos/anand_snacks.mp4"
      },
      {
        "id": "anand-jaggery",
        "label": "Anand Jaggery",
        "video": "/videos/anand_jaggery.mp4"
      },
      {
        "id": "anand-millet",
        "label": "Anand Millet",
        "video": "/videos/anand_millet.mp4"
      },
      {
        "id": "anand_fryums",
        "label": "Anand Fryums",
        "video" : "/videos/anand_fryums.mp4"    
      }
    ]
  },
  {
    "name": "Adarsh",
    "categories": [
      {
        "id": "adarsh-snacks",
        "label": "Snacks",
        "video": "/videos/adarsh_snacks.mp4"
      }
    ]
  },
  {
    "name": "Meenu",
    "categories": [
      {
        "id": "meenu-frozen-fish",
        "label": "Frozen Fish",
        "video": "/videos/meenu_fish.mp4"
      }
    ]
  },
  {
    "name": "Ullasam",
    "categories": [
      {
        "id": "ullasam-sweets",
        "label": "Sweets",
        "video": "/videos/ullasam_sweets.mp4"
      },
      {
        "id": "ullasam-snacks",
        "label": "Snacks",
        "video": "/videos/ullasam_snacks.mp4"
      },
      {
        "id": "ullasam-rice",
        "label": "Rice",
        "video": "/videos/ullasam_rice.mp4"
      },
      {
        "id": "ullasam-podi",
        "label": "Podi",
        "video": "/videos/ullasam_podi.mp4"
      },
      {
        "id": "ullasam-pickle",
        "label": "Pickle",
        "video": "/videos/ullasam_pickle.mp4"
      },
      {
        "id": "ullasam-chutney",
        "label": "Chutney",
        "video": "/videos/ullasam_chutney.mp4"
      },
      {
        "id": "ullasam-chammanthi",
        "label": "Chammanthi",
        "video": "/videos/ullasam_chammanthi.mp4"
      }
    ]
  }
];
