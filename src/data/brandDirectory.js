// Brand names, categories and origins from the approved brand directory.
export const inhouseBrands = [
  { name: "Anand", slug: "anand", index: 0 },
  { name: "Adarsh", slug: "adarsh", index: 1 },
  { name: "Ullasam", slug: "ullasam", index: 3 },
  { name: "Meenu", slug: "meenu", index: 2 },
];

// Updated Our Brands PDF: one Anand banner above Adarsh and Ullasam.
// Existing product photographs replace the reference's text placeholders.
export const inhouseProductBanners = [
  { name: "Anand", slug: "anand", index: 0, image: "anand-product-range-hd", alt: "Anand range of snacks, frozen meals, grated coconut and finger millet", width: 1920, height: 1080, position: "center", featured: true },
  { name: "Adarsh", slug: "adarsh", index: 1, image: "adarsh-mixture", alt: "Adarsh Aval Mixture surrounded by bowls of South Indian snacks", width: 1025, height: 1025, position: "50% 60%" },
  { name: "Ullasam", slug: "ullasam", index: 3, image: "ullasam-rice-powder", alt: "Ullasam Roasted Rice Powder with bowls of rice and flour", width: 2045, height: 2045, position: "50% 35%" },
];

export const partnerBrands = [
  { name: "Adarsh", slug: "adarsh", category: "Snacks", origin: "South India" },
  { name: "Anand", slug: "anand", category: "Snacks & Frozen", origin: "South India" },
  { name: "Anil", slug: "anil", category: "Vermicelli", origin: "Tamil Nadu, India" },
  { name: "Annapoorna", slug: "annapoorna", category: "Masalas", origin: "Coimbatore" },
  { name: "Ariya", slug: "ariya", category: "Food & Spices", origin: "Sri Lanka" },
  { name: "Bedekar", slug: "bedekar", category: "Pickles & Frozen", origin: "Mumbai, India" },
  { name: "BON", slug: "bon", category: "Masalas", origin: "South India" },
  { name: "Brahmin’s", slug: "brahmins", category: "Rice, Flour & Spices", origin: "Kerala, India" },
  { name: "Double Horse", slug: "double-horse", category: "Rice, Flour & Spices", origin: "Kerala, India" },
  { name: "Gullón", slug: "gullon", category: "Cookies", origin: "Spain", label: "Gullon" },
  { name: "ITC Limited", slug: "itc-limited", category: "Kitchen staples", origin: "South India" },
  { name: "Kwality", slug: "kwality", category: "Ice Cream", origin: "UAE" },
  { name: "Laxminarayan", slug: "laxminarayan", category: "Snacks", origin: "Pune, India" },
  { name: "McVitie’s", slug: "mcvities", category: "Cookies", origin: "UK" },
  { name: "Meenu", slug: "meenu", category: "Frozen Fish and Seafood", origin: "South India" },
  { name: "Nana Shetty Masala", slug: "nana-shetty-masala", category: "Masalas", origin: "South India" },
  { name: "Nirapara", slug: "nirapara", category: "Rice, Flour & Spices", origin: "Kerala, India" },
  { name: "Pavizham", slug: "pavizham", category: "Matta Rice", origin: "Kerala" },
  { name: "Priyagold", slug: "priyagold", category: "Cookies", origin: "India" },
  { name: "Sakthi", slug: "sakthi", category: "Masalas", origin: "Tamil Nadu, India" },
  { name: "Ustad Banne Nawab’s", slug: "ustad-banne-nawabs", category: "Masalas", origin: "Hyderabad, India" },
  { name: "Mayil", slug: "mayil", category: "Rice & Flour", origin: "Kerala, India" },
  { name: "Janaki’s", slug: "janakis", category: "Matta Rice", origin: "Kerala" },
  { name: "Abhiruchi", slug: "abhiruchi", category: "Cookies", origin: "Hyderabad" },
  { name: "Maliban", slug: "maliban", category: "Cookies", origin: "Sri Lanka" },
].sort((a, b) => (a.label || a.name).localeCompare(b.label || b.name, "en", {
  sensitivity: "base",
  ignorePunctuation: true,
}));
