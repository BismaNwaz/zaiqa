-- Zaiqa Food Marketplace — Seed Data
-- Run AFTER schema.sql in your Supabase SQL Editor

-- ─── CATEGORIES ───────────────────────────────────────────────────────────────
insert into categories (id, name, slug, description, image_url, emoji) values
  ('cat-1', 'Rice & Biryani', 'rice-biryani', 'Fragrant, layered rice dishes cooked with aromatic spices', 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&q=80&auto=format&fit=crop', '🍚'),
  ('cat-2', 'Grills & BBQ',   'grills-bbq',   'Tender marinated meats cooked over open flame',             'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80&auto=format&fit=crop', '🍗'),
  ('cat-3', 'Curries',        'curries',       'Rich, slow-cooked gravies bursting with authentic flavors', 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80&auto=format&fit=crop', '🥘'),
  ('cat-4', 'Breads',         'breads',        'Freshly baked naan, roti, and paratha',                    'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80&auto=format&fit=crop', '🫓'),
  ('cat-5', 'Snacks',         'snacks',        'Crispy appetizers and street food favorites',              'https://images.unsplash.com/photo-1601050690117-7a1f3e1e35fe?w=600&q=80&auto=format&fit=crop', '🥟'),
  ('cat-6', 'Sweets',         'sweets',        'Traditional mithai and desserts',                          'https://images.unsplash.com/photo-1605197161470-5e43fb0d4b95?w=600&q=80&auto=format&fit=crop', '🍬'),
  ('cat-7', 'Drinks',         'drinks',        'Refreshing lassi, chai, and traditional beverages',        'https://images.unsplash.com/photo-1541014741259-de529411b96a?w=600&q=80&auto=format&fit=crop', '🥤'),
  ('cat-8', 'Spices',         'spices',        'Premium spice blends and condiments',                      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&q=80&auto=format&fit=crop', '🌶️')
on conflict (id) do nothing;

-- ─── PRODUCTS ─────────────────────────────────────────────────────────────────
insert into products (id, name, description, price, image_url, category_id, rating, reviews_count, is_featured, in_stock, spice_level, serves, origin) values
  -- Rice & Biryani
  ('p-1', 'Chicken Biryani',    'Aromatic basmati rice layered with tender chicken, saffron, and whole spices. A celebration in every bite.',          15.99, 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&q=80&auto=format&fit=crop', 'cat-1', 4.9, 342, true,  true, 'medium',     2, 'Lahore, Pakistan'),
  ('p-2', 'Beef Biryani',       'Slow-cooked beef dum biryani with caramelized onions, dried plums, and fragrant rice. Rich and indulgent.',          17.99, 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=800&q=80&auto=format&fit=crop', 'cat-1', 4.8, 218, true,  true, 'hot',        2, 'Karachi, Pakistan'),
  ('p-3', 'Vegetable Pulao',    'Light and fragrant rice cooked with seasonal vegetables and whole spices. Perfect comfort food.',                      11.99, 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=800&q=80&auto=format&fit=crop', 'cat-1', 4.5,  89, false, true, 'mild',       2, 'Punjab'),
  -- Grills & BBQ
  ('p-4', 'Seekh Kebab (6 pcs)','Hand-minced beef kebabs blended with fresh herbs and spices, grilled on skewers over charcoal.',                      13.99, 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80&auto=format&fit=crop', 'cat-2', 4.9, 267, true,  true, 'medium',     null, 'Peshawar, Pakistan'),
  ('p-5', 'Chapli Kebab (4 pcs)','Peshwari-style flat beef patties with coriander seeds, tomatoes, and green chilies. A NWFP specialty.',              14.99, 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&q=80&auto=format&fit=crop', 'cat-2', 4.8, 195, true,  true, 'hot',        null, 'KPK, Pakistan'),
  ('p-6', 'Chicken Tikka (8 pcs)','Bone-in chicken marinated in yogurt and spices, grilled to perfection with smoky char.',                            16.99, 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&q=80&auto=format&fit=crop', 'cat-2', 4.7, 312, false, true, 'medium',     null, 'Punjab, Pakistan'),
  -- Curries
  ('p-7', 'Chicken Karahi',     'Restaurant-style chicken karahi cooked in a wok with fresh tomatoes, ginger, and green chilies.',                     16.99, 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80&auto=format&fit=crop', 'cat-3', 4.8, 401, true,  true, 'hot',        2, 'Pakistan'),
  ('p-8', 'Nihari',             'Slow-braised beef shank stew simmered overnight with whole spices. A royal breakfast turned dinner staple.',           18.99, 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=800&q=80&auto=format&fit=crop', 'cat-3', 4.9, 278, true,  true, 'hot',        2, 'Old Delhi / Lahore'),
  ('p-9', 'Haleem',             'A beloved slow-cooked stew of wheat, lentils, and tender mutton. Topped with crispy onions and lemon.',               14.99, 'https://images.unsplash.com/photo-1577303935007-0d306ee638cf?w=800&q=80&auto=format&fit=crop', 'cat-3', 4.7, 156, false, true, 'medium',     2, 'Hyderabad, Pakistan'),
  -- Breads
  ('p-10', 'Butter Naan (4 pcs)','Soft, pillowy naan brushed with butter and baked in a tandoor. The perfect accompaniment to any curry.',               4.99, 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80&auto=format&fit=crop', 'cat-4', 4.6, 523, false, true, 'mild',       null, null),
  ('p-11', 'Garlic Naan (4 pcs)','Classic naan topped with roasted garlic and fresh coriander. Irresistibly aromatic.',                                  5.49, 'https://images.unsplash.com/photo-1574994369525-0a2f5d4c6e8a?w=800&q=80&auto=format&fit=crop', 'cat-4', 4.7, 298, false, true, 'mild',       null, null),
  -- Snacks
  ('p-12', 'Samosa (6 pcs)',    'Crispy pastry triangles filled with spiced potatoes and peas. A timeless South Asian snack.',                          7.99, 'https://images.unsplash.com/photo-1601050690117-7a1f3e1e35fe?w=800&q=80&auto=format&fit=crop', 'cat-5', 4.8, 445, true,  true, 'medium',     null, 'Punjab'),
  -- Sweets
  ('p-13', 'Gulab Jamun (8 pcs)','Soft milk-solid dumplings soaked in rose-scented sugar syrup. Pure indulgence.',                                      8.99, 'https://images.unsplash.com/photo-1605197161470-5e43fb0d4b95?w=800&q=80&auto=format&fit=crop', 'cat-6', 4.9, 389, true,  true, null,         null, 'Subcontinent'),
  ('p-14', 'Kheer (500ml)',     'Creamy rice pudding cooked with whole milk, cardamom, and topped with pistachios and saffron.',                        6.99, 'https://images.unsplash.com/photo-1613448856706-2f35e4ff1e89?w=800&q=80&auto=format&fit=crop', 'cat-6', 4.6, 167, false, true, null,         null, 'Pakistan'),
  -- Drinks
  ('p-15', 'Mango Lassi (16oz)','Thick, creamy blend of fresh Alphonso mangoes and tangy yogurt. Refreshingly sweet.',                                  5.99, 'https://images.unsplash.com/photo-1541014741259-de529411b96a?w=800&q=80&auto=format&fit=crop', 'cat-7', 4.8, 501, true,  true, null,         null, 'Punjab'),
  ('p-16', 'Kashmiri Chai',     'Pink tea brewed with Kashmiri tea leaves, milk, and cardamom. Topped with crushed pistachios.',                        4.99, 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=800&q=80&auto=format&fit=crop', 'cat-7', 4.7, 234, false, true, null,         null, 'Kashmir')
on conflict (id) do nothing;
