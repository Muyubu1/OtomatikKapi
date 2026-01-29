-- ============================================
-- CKS Otomatik Kapı - Çoklu Dil Desteği (Complete SQL)
-- Bu dosyayı Supabase SQL Editor'da çalıştırın
-- ============================================

-- ============================================
-- BÖLÜM 1: TABLOLARA İNGİLİZCE SÜTUNLAR EKLEME
-- ============================================

-- PRODUCTS tablosuna İngilizce sütunlar
ALTER TABLE products ADD COLUMN IF NOT EXISTS name_en VARCHAR(255);
ALTER TABLE products ADD COLUMN IF NOT EXISTS short_description_en TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS full_description_en TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS features_en JSONB DEFAULT '[]'::jsonb;
ALTER TABLE products ADD COLUMN IF NOT EXISTS category_en VARCHAR(255);

-- NAVIGATION_ITEMS tablosuna İngilizce sütun
ALTER TABLE navigation_items ADD COLUMN IF NOT EXISTS name_en VARCHAR(255);

-- ============================================
-- BÖLÜM 2: SETTINGS (Instagram, LinkedIn, Video URL)
-- ============================================

INSERT INTO site_content (key, value, updated_at)
VALUES (
    'settings',
    '{
        "instagramUrl": "",
        "linkedinUrl": "",
        "heroVideoUrl": "/videos/hero-bg.webm"
    }'::jsonb,
    NOW()
)
ON CONFLICT (key) 
DO UPDATE SET 
    value = site_content.value || EXCLUDED.value,
    updated_at = NOW();

-- ============================================
-- BÖLÜM 3: HERO SECTION İngilizce
-- ============================================

UPDATE site_content 
SET value = value || '{
    "title_en": "Industrial Automatic Door",
    "subtitle_en": "and Loading Systems",
    "description_en": "Take your business one step ahead with safe, fast and quality automatic door solutions."
}'::jsonb,
updated_at = NOW()
WHERE key = 'hero';

-- ============================================
-- BÖLÜM 4: FEATURES SECTION İngilizce
-- ============================================

UPDATE site_content 
SET value = value || '{
    "title_en": "You Are Safer With Us",
    "items_en": [
        "Automate Your Door, Simplify Your Life!",
        "Automatic Doors, Automatic Solutions!",
        "Automatic Doors for Safe and Comfortable Access!",
        "Doors That Open with a Single Touch!",
        "Automatic Doors, Smart Lifestyle!"
    ]
}'::jsonb,
updated_at = NOW()
WHERE key = 'features';

-- ============================================
-- BÖLÜM 5: WHY US SECTION İngilizce
-- ============================================

UPDATE site_content 
SET value = value || '{
    "title_en": "WHY US",
    "items_en": [
        {
            "title": "EXPERIENCE",
            "description": "We Have an Experienced and Professional Team"
        },
        {
            "title": "PRICE",
            "description": "We Offer Superior Service at Affordable Prices"
        },
        {
            "title": "TECHNOLOGY",
            "description": "We Use the Latest Technologies in the Industry"
        },
        {
            "title": "CUSTOM SOLUTIONS",
            "description": "We Provide Project-Specific Solutions"
        },
        {
            "title": "RELIABLE AND REPUTABLE",
            "description": "We Take Pride in Being a Reliable and Reputable Company"
        }
    ]
}'::jsonb,
updated_at = NOW()
WHERE key = 'whyUs';

-- ============================================
-- BÖLÜM 6: PROJECT SOLUTIONS SECTION İngilizce
-- ============================================

UPDATE site_content 
SET value = value || '{
    "title_en": "PROJECT-SPECIFIC SOLUTIONS",
    "paragraphs_en": [
        "Automatic doors are an indispensable part of the modern world. Whether it is a shopping mall, office building, or residential complex, automatic doors provide both security and convenience.",
        "Here, CKS Automatic Door and Loading Systems, a leader in automatic door companies, provides project-specific solutions by producing solutions suitable for our customers needs.",
        "CKS Automatic Door, which offers project-specific solutions, understands the unique needs and challenges of each project. This includes considering the size, budget, timeline, and goals of the project.",
        "As a result, our automatic door company, which offers project-specific solutions, provides the flexibility and expertise required to ensure the success of every project."
    ]
}'::jsonb,
updated_at = NOW()
WHERE key = 'projectSolutions';

-- ============================================
-- BÖLÜM 7: PRODUCTS İngilizce İÇERİK
-- ============================================

-- Endüstriyel Seksiyonel Kapı
UPDATE products SET 
    name_en = 'Industrial Sectional Door',
    short_description_en = 'Industrial durable panel door system',
    full_description_en = 'Industrial sectional doors are high-performance door systems specially designed for factories, warehouses and production facilities. These doors, made of steel or aluminum panels, offer excellent thermal insulation and durability.',
    features_en = '["High thermal insulation", "Galvanized steel panel", "Motorized/manual operation", "Long-lasting durability"]'::jsonb,
    category_en = 'Industrial Doors'
WHERE slug = 'endustriyel-seksiyonel-kapi';

-- Endüstriyel Katlanır Kapı
UPDATE products SET 
    name_en = 'Industrial Folding Door',
    short_description_en = 'Flexible folding system for large openings',
    full_description_en = 'Industrial folding doors offer ideal solutions for large openings. These doors, used in hangars, warehouses and production areas, save time with their fast opening and closing feature.',
    features_en = '["Suitable for large openings", "Fast opening/closing", "Light construction", "Custom size production"]'::jsonb,
    category_en = 'Industrial Doors'
WHERE slug = 'endustriyel-katlanir-kapi';

-- Şerit Perde Kapı
UPDATE products SET 
    name_en = 'Strip Curtain Door',
    short_description_en = 'PVC strip curtain systems',
    full_description_en = 'Strip curtain doors are widely used in cold storage, food facilities and industrial areas. Thanks to transparent PVC strips, the field of view is preserved while providing heat and dust insulation.',
    features_en = '["Thermal insulation", "Dust and insect barrier", "Transparent appearance", "Easy installation"]'::jsonb,
    category_en = 'High Speed Doors'
WHERE slug = 'serit-perde-kapi';

-- Personel Yangın Kapısı
UPDATE products SET 
    name_en = 'Personnel Fire Door',
    short_description_en = 'Steel door systems for fire safety',
    full_description_en = 'Personnel fire doors are used for safe evacuation in case of fire and to prevent fire spread. They provide 60-120 minutes of protection according to fire resistance class.',
    features_en = '["60-120 minutes fire resistance", "Panic bar system", "Automatic closing", "CE certified"]'::jsonb,
    category_en = 'Fire Doors'
WHERE slug = 'personel-yangin-kapisi';

-- Sarmal Yangın Kapısı
UPDATE products SET 
    name_en = 'Spiral Fire Door',
    short_description_en = 'High speed spiral fire door system',
    full_description_en = 'Spiral fire doors are modern door systems that automatically close in case of fire and can open and close at high speed. They provide both fire safety and efficiency, especially in high-traffic areas.',
    features_en = '["High speed operation", "Automatic fire closing", "Compact design", "Sensor safety"]'::jsonb,
    category_en = 'Fire Doors'
WHERE slug = 'sarmal-yangin-kapisi';

-- ============================================
-- BÖLÜM 8: NAVIGATION ITEMS İngilizce İÇERİK
-- (Manuel olarak menü öğelerinize göre güncelleyin)
-- ============================================

-- Örnek: Kategori isimlerini İngilizce olarak güncelleyin
UPDATE navigation_items SET name_en = 'Industrial Doors' WHERE name = 'Endüstriyel Kapılar';
UPDATE navigation_items SET name_en = 'High Speed Doors' WHERE name = 'Yüksek Hızlı Kapılar';
UPDATE navigation_items SET name_en = 'Fire Doors' WHERE name = 'Yangın Kapıları';
UPDATE navigation_items SET name_en = 'Loading Systems' WHERE name = 'Yükleme Sistemleri';
UPDATE navigation_items SET name_en = 'Security Systems' WHERE name = 'Güvenlik Sistemleri';
UPDATE navigation_items SET name_en = 'PVC Doors' WHERE name = 'PVC Kapılar';

-- Ürün isimleri için
UPDATE navigation_items SET name_en = 'Industrial Sectional Door' WHERE name = 'Endüstriyel Seksiyonel Kapı';
UPDATE navigation_items SET name_en = 'Industrial Folding Door' WHERE name = 'Endüstriyel Katlanır Kapı';
UPDATE navigation_items SET name_en = 'Strip Curtain Door' WHERE name = 'Şerit Perde Kapı';
UPDATE navigation_items SET name_en = 'Personnel Fire Door' WHERE name = 'Personel Yangın Kapısı';
UPDATE navigation_items SET name_en = 'Spiral Fire Door' WHERE name = 'Sarmal Yangın Kapısı';
UPDATE navigation_items SET name_en = 'PVC Folding Door' WHERE name = 'PVC Katlanır Kapı';
UPDATE navigation_items SET name_en = 'PVC Roll-up Door' WHERE name = 'PVC Sarmal Kapı';
UPDATE navigation_items SET name_en = 'Industrial Roll-up Shutter' WHERE name = 'Endüstriyel Kepenk';
UPDATE navigation_items SET name_en = 'Dock Leveler' WHERE name = 'Dock Leveler';
UPDATE navigation_items SET name_en = 'Dock Shelter' WHERE name = 'Dock Shelter';
UPDATE navigation_items SET name_en = 'Barrier Systems' WHERE name = 'Bariyer Sistemleri';
UPDATE navigation_items SET name_en = 'Turnstile Systems' WHERE name = 'Turnikeler';

-- ============================================
-- BÖLÜM 9: FAQ SECTION İngilizce
-- ============================================

UPDATE site_content 
SET value = value || '{
    "title_en": "What are Industrial Automatic Door Systems?",
    "description_en": "Industrial automatic door systems are doors typically used in factories, warehouses, and other industrial facilities, usually controlled by remote control or motion sensors.",
    "faqs_en": [
        {
            "question": "What are the Advantages of Automatic Door Systems?",
            "answer": "Automatic door systems provide many advantages such as security, energy savings, hygiene and ease of use."
        },
        {
            "question": "How to Maintain Automatic Door Systems?",
            "answer": "Regular maintenance of automatic door systems is important. Professional service support is recommended."
        },
        {
            "question": "What is the Lifespan of Automatic Doors?",
            "answer": "When proper maintenance is done, automatic doors can work reliably for 15-20 years."
        },
        {
            "question": "In Which Areas Are Automatic Doors Used?",
            "answer": "Automatic doors are widely used in factories, warehouses, shopping malls, hospitals, hotels, airports and many commercial areas."
        }
    ]
}'::jsonb,
updated_at = NOW()
WHERE key = 'faq';

-- ============================================
-- BÖLÜM 10: ABOUT (HAKKIMIZDA) SECTION İngilizce
-- ============================================

UPDATE site_content 
SET value = value || '{
    "title_en": "ABOUT US",
    "content_en": "CKS Automatic Door and Loading Systems has been serving in the industrial door and loading systems sector for many years. Our company, which has completed thousands of successful projects in Turkey and many European countries, continues to add new customers with its reliability and quality understanding. We offer special solutions to our customers with our expert team and latest technology equipment. We take pride in being a pioneer in customer satisfaction with our professional approach in every project.",
    "vision_title_en": "OUR VISION",
    "vision_content_en": "To be the leading and most trusted brand in the industrial automatic door and loading systems sector. To increase customer satisfaction, improve product quality, and provide environmentally friendly and sustainable solutions.",
    "mission_title_en": "OUR MISSION",
    "mission_content_en": "To provide the highest quality products and services to our customers while continuously innovating and improving our processes. To create value for our employees, customers, and society while maintaining our commitment to excellence."
}'::jsonb,
updated_at = NOW()
WHERE key = 'about';

-- ============================================
-- DOĞRULAMA SORGULARI (Opsiyonel)
-- ============================================
-- SELECT key, value FROM site_content;
-- SELECT id, name, name_en FROM navigation_items;
-- SELECT slug, name, name_en, category, category_en FROM products;
