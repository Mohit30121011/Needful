const fs = require('fs');
const path = require('path');

const areas = [
    // SOUTH MUMBAI
    'Churchgate', 'Marine Lines', 'Charni Road', 'Grant Road', 'Mumbai Central',
    'Mahalaxmi', 'Lower Parel', 'Prabhadevi', 'Worli', 'Worli Sea Face',
    'Dadar West', 'Dadar East', 'Matunga West', 'Matunga East', 'Mahim',
    'Colaba', 'Colaba Causeway', 'Cuffe Parade', 'Nariman Point', 'Fort',
    'Ballard Estate', 'Kalbadevi', 'Pydhonie', 'Girgaon', 'Walkeshwar',
    'Malabar Hill', 'Breach Candy', 'Peddar Road', 'Altamount Road',
    'Tardeo', 'Byculla', 'Mazgaon', 'Sewri', 'Wadala', 'Antop Hill', 'Sion',

    // WESTERN SUBURBS (Bandra to Andheri)
    'Bandra West', 'Bandra East', 'Pali Hill', 'Carter Road', 'Linking Road',
    'Hill Road', 'Bandstand', 'Mount Mary', 'Kherwadi', 'Bandra Kurla Complex (BKC)',
    'Khar West', 'Khar East', 'Khar Danda',
    'Santacruz West', 'Santacruz East', 'Vakola', 'Kalina',
    'Vile Parle West', 'Vile Parle East', 'Irla', 'Juhu', 'Juhu Tara Road',
    'Andheri West', 'Andheri East', 'Lokhandwala Complex', 'Versova',
    'Seven Bungalows', 'Four Bungalows', 'Yari Road', 'Oshiwara',
    'Amboli', 'DN Nagar', 'Azad Nagar', 'Gilbert Hill', 'Chakala',
    'JB Nagar', 'Marol', 'Saki Naka', 'Sahar', 'Chandivali', 'Powai',
    'Hiranandani Gardens', 'Raheja Vihar',

    // WESTERN SUBURBS (Jogeshwari to Dahisar)
    'Jogeshwari West', 'Jogeshwari East', 'Behram Baug',
    'Goregaon West', 'Goregaon East', 'Bangur Nagar', 'Shastri Nagar',
    'Aarey Colony', 'Royal Palms', 'Dindoshi', 'Gokuldham',
    'Malad West', 'Malad East', 'Mindspace', 'Evershine Nagar',
    'Chincholi Bunder', 'Malwani', 'Orlem', 'Liberty Garden',
    'Kandivali West', 'Kandivali East', 'Mahavir Nagar', 'Charkop',
    'Thakur Village', 'Thakur Complex', 'Lokhandwala (Kandivali)',
    'Borivali West', 'Borivali East', 'IC Colony', 'Yogi Nagar',
    'Vazira', 'Gorai', 'Shimpoli',
    'Dahisar West', 'Dahisar East', 'Anand Nagar',

    // MIRA-BHAYANDAR & VASAI-VIRAR
    'Mira Road', 'Mira Road East', 'Beverly Park', 'Shanti Nagar',
    'Bhayandar West', 'Bhayandar East',
    'Naigaon', 'Vasai West', 'Vasai East', 'Evershine City',
    'Nalasopara West', 'Nalasopara East', 'Virar West', 'Virar East', 'Global City',

    // CENTRAL SUBURBS
    'Kurla West', 'Kurla East', 'Nehru Nagar', 'Vidyavihar',
    'Ghatkopar West', 'Ghatkopar East', 'Pant Nagar', 'Garodia Nagar',
    'Vikhroli West', 'Vikhroli East', 'Tagore Nagar', 'Kannamwar Nagar',
    'Kanjurmarg West', 'Kanjurmarg East', 'Bhandup West', 'Bhandup East',
    'Nahur', 'Mulund West', 'Mulund East', 'Mulund Colony',

    // THANE & BEYOND
    'Thane West', 'Thane East', 'Naupada', 'Panchpakhadi', 'Teen Hath Naka',
    'Ghodbunder Road', 'Vartak Nagar', 'Majiwada', 'Hiranandani Estate',
    'Waghbil', 'Kasarvadavali', 'Kalwa', 'Mumbra', 'Diva',
    'Dombivli West', 'Dombivli East', 'Kalyan West', 'Kalyan East',
    'Ulhasnagar', 'Ambernath', 'Badlapur',

    // HARBOUR LINE & NAVI MUMBAI
    'GTB Nagar', 'Chunabhatti', 'Chembur', 'Chembur Camp', 'Diamond Garden',
    'Tilak Nagar', 'Govandi', 'Mankhurd',
    'Vashi', 'Sector 17 Vashi', 'Sanpada', 'Juinagar',
    'Nerul', 'Seawoods', 'Sector 40 Nerul',
    'Belapur', 'CBD Belapur', 'Kharghar', 'Sector 21 Kharghar',
    'Kamothe', 'Mansarovar', 'Khandeshwar', 'Panvel', 'New Panvel',
    'Airoli', 'Ghansoli', 'Koperkhairane', 'Mahape'
];

const categories = [
    { id: 'c1', name: 'Electricians', slug: 'electricians', icon: 'Zap', display_order: 1 },
    { id: 'c2', name: 'Plumbers', slug: 'plumbers', icon: 'Wrench', display_order: 2 },
    { id: 'c3', name: 'AC Repair', slug: 'ac-repair', icon: 'AirVent', display_order: 3 },
    { id: 'c4', name: 'Restaurants', slug: 'restaurants', icon: 'UtensilsCrossed', display_order: 4 },
    { id: 'c5', name: 'Beauty & Spa', slug: 'beauty-spa', icon: 'Sparkles', display_order: 5 },
    { id: 'c6', name: 'Doctors', slug: 'doctors', icon: 'Stethoscope', display_order: 6 },
    { id: 'c7', name: 'Contractors', slug: 'contractors', icon: 'HardHat', display_order: 7 },
    { id: 'c8', name: 'Hotels', slug: 'hotels', icon: 'Hotel', display_order: 8 }
];

const firstNames = [
    'Royal', 'Super', 'Best', 'Premium', 'Star', 'Elite', 'Golden', 'Silver',
    'Crystal', 'Diamond', 'City', 'Mumbai', 'Urban', 'Metro', 'Rapid', 'Quick',
    'Expert', 'Pro', 'Master', 'Top', 'Prime', 'Ultra', 'Mega', 'Gokul',
    'Sai', 'Shree', 'Om', 'New', 'Classic', 'Modern', 'Perfect', 'A1',
    'Reliable', 'Trusted', 'Smart', 'Bright', 'Excel', 'Supreme', 'Grand',
    'Imperial', 'Majestic', 'Regal', 'Divine', 'Pioneer', 'Apex', 'Zenith',
    'Sunrise', 'Blue', 'Red', 'Green', 'Orange'
];

const lastNames = [
    'Services', 'Solutions', 'Works', 'Hub', 'Point', 'Center', 'Care',
    'Clinic', 'Studio', 'Agency', 'Group', 'Enterprises', 'Brothers',
    'Partners', 'Tech', 'Zone', 'World', 'Plaza', 'Square', 'Corner',
    'Station', 'House', 'Villa', 'Depot', 'Mart', 'Store', 'Outlet',
    'Company', 'Corporation', 'Associates', 'Consultants', 'Specialists',
    'Experts', 'Masters', 'Professionals', 'Wizards', 'Gurus', 'Wing',
    'Link', 'Connection', 'Network', 'Systems', 'Innovations'
];

// 30 verified working Unsplash images per category
const categoryImages = {
    'electricians': [
        'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500',
        'https://images.unsplash.com/photo-1558402529-d2638a7023e9?w=500',
        'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=500',
        'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500',
        'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=500',
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500',
        'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=500',
        'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=500',
        'https://images.unsplash.com/photo-1497366216548-37526070297c?w=500',
        'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=500',
        'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500',
        'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500',
        'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=500',
        'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500',
        'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500',
        'https://images.unsplash.com/photo-1560264280-88b68371db39?w=500',
        'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=500',
        'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=500',
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500',
        'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500',
        'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=500',
        'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=500',
        'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=500',
        'https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=500',
        'https://images.unsplash.com/photo-1498758536662-35b82cd15e29?w=500',
        'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=500',
        'https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=500',
        'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500',
        'https://images.unsplash.com/photo-1551434678-e076c223a692?w=500',
        'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=500'
    ],
    'plumbers': [
        'https://images.unsplash.com/photo-1585704032915-c3d57bc9f96c?w=500',
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500',
        'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500',
        'https://images.unsplash.com/photo-1581141849291-1125c7b692b5?w=500',
        'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500',
        'https://images.unsplash.com/photo-1497366216548-37526070297c?w=500',
        'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=500',
        'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=500',
        'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=500',
        'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=500',
        'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500',
        'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500',
        'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=500',
        'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500',
        'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=500',
        'https://images.unsplash.com/photo-1560264280-88b68371db39?w=500',
        'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=500',
        'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=500',
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500',
        'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500',
        'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=500',
        'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=500',
        'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=500',
        'https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=500',
        'https://images.unsplash.com/photo-1498758536662-35b82cd15e29?w=500',
        'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=500',
        'https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=500',
        'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500',
        'https://images.unsplash.com/photo-1551434678-e076c223a692?w=500',
        'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=500'
    ],
    'ac-repair': [
        'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=500',
        'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500',
        'https://images.unsplash.com/photo-1497366216548-37526070297c?w=500',
        'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=500',
        'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500',
        'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500',
        'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=500',
        'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500',
        'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500',
        'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500',
        'https://images.unsplash.com/photo-1558402529-d2638a7023e9?w=500',
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500',
        'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=500',
        'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=500',
        'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=500',
        'https://images.unsplash.com/photo-1560264280-88b68371db39?w=500',
        'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=500',
        'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=500',
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500',
        'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500',
        'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=500',
        'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=500',
        'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=500',
        'https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=500',
        'https://images.unsplash.com/photo-1498758536662-35b82cd15e29?w=500',
        'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=500',
        'https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=500',
        'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500',
        'https://images.unsplash.com/photo-1551434678-e076c223a692?w=500',
        'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=500'
    ],
    'restaurants': [
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500',
        'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=500',
        'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500',
        'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500',
        'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=500',
        'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=500',
        'https://images.unsplash.com/photo-1592861956120-e524fc739696?w=500',
        'https://images.unsplash.com/photo-1466978913421-dad938661248?w=500',
        'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=500',
        'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=500',
        'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=500',
        'https://images.unsplash.com/photo-1578474843222-9593bc88d298?w=500',
        'https://images.unsplash.com/photo-1544025162-d76694265947?w=500',
        'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500',
        'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500',
        'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500',
        'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500',
        'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500',
        'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=500',
        'https://images.unsplash.com/photo-1493770348161-369560ae357d?w=500',
        'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=500',
        'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500',
        'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=500',
        'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=500',
        'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=500',
        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500',
        'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500',
        'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=500',
        'https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?w=500',
        'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=500'
    ],
    'beauty-spa': [
        'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=500',
        'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500',
        'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500',
        'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=500',
        'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=500',
        'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=500',
        'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=500',
        'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=500',
        'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=500',
        'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=500',
        'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=500',
        'https://images.unsplash.com/photo-1560869713-7d0a29430803?w=500',
        'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=500',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500',
        'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=500',
        'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=500',
        'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500',
        'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500',
        'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=500',
        'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=500',
        'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=500',
        'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=500',
        'https://images.unsplash.com/photo-1559599101-f09722fb4948?w=500',
        'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500',
        'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=500',
        'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=500',
        'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500',
        'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500',
        'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=500',
        'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=500'
    ],
    'doctors': [
        'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500',
        'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=500',
        'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=500',
        'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500',
        'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=500',
        'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=500',
        'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500',
        'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500',
        'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=500',
        'https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?w=500',
        'https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=500',
        'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=500',
        'https://images.unsplash.com/photo-1551076805-e1869033e561?w=500',
        'https://images.unsplash.com/photo-1638202993928-7267aad84c31?w=500',
        'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=500',
        'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=500',
        'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=500',
        'https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=500',
        'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=500',
        'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=500',
        'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=500',
        'https://images.unsplash.com/photo-1584516150909-c43483ee7932?w=500',
        'https://images.unsplash.com/photo-1584515933487-779824d29309?w=500',
        'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=500',
        'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=500',
        'https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=500',
        'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=500',
        'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=500',
        'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=500',
        'https://images.unsplash.com/photo-1584516150909-c43483ee7932?w=500'
    ],
    'contractors': [
        'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500',
        'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=500',
        'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=500',
        'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=500',
        'https://images.unsplash.com/photo-1621905251147-380d0d8fc4a7?w=500',
        'https://images.unsplash.com/photo-1590486803833-1c5dc8ce84ac?w=500',
        'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500',
        'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500',
        'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=500',
        'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500',
        'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500',
        'https://images.unsplash.com/photo-1497366216548-37526070297c?w=500',
        'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=500',
        'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=500',
        'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=500',
        'https://images.unsplash.com/photo-1560264280-88b68371db39?w=500',
        'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=500',
        'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=500',
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500',
        'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500',
        'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=500',
        'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=500',
        'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=500',
        'https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=500',
        'https://images.unsplash.com/photo-1498758536662-35b82cd15e29?w=500',
        'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=500',
        'https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=500',
        'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500',
        'https://images.unsplash.com/photo-1551434678-e076c223a692?w=500',
        'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=500'
    ],
    'hotels': [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500',
        'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=500',
        'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=500',
        'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=500',
        'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=500',
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=500',
        'https://images.unsplash.com/photo-1590490360182-f33db139666c?w=500',
        'https://images.unsplash.com/photo-1518733057094-95b53143d2a7?w=500',
        'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=500',
        'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=500',
        'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?w=500',
        'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=500',
        'https://images.unsplash.com/photo-1596436807771-7a31605eac54?w=500',
        'https://images.unsplash.com/photo-1505773343861-5ad9ad1d2bc2?w=500',
        'https://images.unsplash.com/photo-1444201983204-c43cbd584d93?w=500',
        'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=500',
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=500',
        'https://images.unsplash.com/photo-1455587734955-081b22074882?w=500',
        'https://images.unsplash.com/photo-1439130490301-25e322d88054?w=500',
        'https://images.unsplash.com/photo-1549294413-26f195200c16?w=500',
        'https://images.unsplash.com/photo-1568495248636-6432b97bd949?w=500',
        'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=500',
        'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=500',
        'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?w=500',
        'https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?w=500',
        'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=500',
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=500',
        'https://images.unsplash.com/photo-1455587734955-081b22074882?w=500',
        'https://images.unsplash.com/photo-1439130490301-25e322d88054?w=500',
        'https://images.unsplash.com/photo-1549294413-26f195200c16?w=500'
    ]
};

function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function escapeSql(str) {
    if (str === null || str === undefined) return 'NULL';
    return `'${str.replace(/'/g, "''")}'`;
}

function generateUUID() {
    const chars = '0123456789abcdef';
    let uuid = '';
    for (let i = 0; i < 36; i++) {
        if (i === 8 || i === 13 || i === 18 || i === 23) {
            uuid += '-';
        } else if (i === 14) {
            uuid += '4';
        } else if (i === 19) {
            uuid += chars[Math.floor(Math.random() * 4) + 8];
        } else {
            uuid += chars[Math.floor(Math.random() * 16)];
        }
    }
    return uuid;
}

let fileCounter = 1;
const BATCH_SIZE = 500; // Smaller batches for file splitting

const writeChunk = (content, label) => {
    const fileName = `seed_${String(fileCounter).padStart(2, '0')}_${label}.sql`;
    const fullPath = path.join(__dirname, '..', fileName);

    // Add header to bypass FK constraints for every file
    const fileContent = `SET session_replication_role = 'replica';\n\n${content}\n\nSET session_replication_role = 'origin';\n`;

    fs.writeFileSync(fullPath, fileContent);
    console.log(`Generated ${fileName}`);
    fileCounter++;
};

const generateSQL = () => {
    // 1. CLEAR EXISTING DATA (File 01)
    let setupContent = `-- WARNING: This will clear existing mock data\n`;
    setupContent += `TRUNCATE TABLE provider_images CASCADE;\n`;
    setupContent += `TRUNCATE TABLE providers CASCADE;\n`;
    setupContent += `TRUNCATE TABLE users CASCADE;\n\n`;

    // 2. INSERT CATEGORIES
    setupContent += `-- Insert Categories\n`;
    categories.forEach(c => c.newId = generateUUID());
    const catValues = categories.map(c =>
        `('${c.newId}', ${escapeSql(c.name)}, ${escapeSql(c.slug)}, ${escapeSql(c.icon)}, ${c.display_order})`
    ).join(',\n    ');
    setupContent += `INSERT INTO categories (id, name, slug, icon, display_order)\nVALUES \n    ${catValues}\nON CONFLICT (slug) DO NOTHING;\n\n`;

    writeChunk(setupContent, 'setup');


    let userInserts = [];
    let providerInserts = [];
    let imageInserts = [];
    let usedSlugs = new Set();
    let idCounter = 1;

    categories.forEach(category => {
        for (let i = 0; i < 500; i++) {
            const area = getRandomElement(areas);
            const name = `${getRandomElement(firstNames)} ${getRandomElement(lastNames)} ${category.name}`;

            let baseSlug = name.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '');
            let slug = `${baseSlug}-${idCounter}`;
            while (usedSlugs.has(slug)) {
                idCounter++;
                slug = `${baseSlug}-${idCounter}`;
            }
            usedSlugs.add(slug);

            const providerId = generateUUID();
            const userId = generateUUID();
            const userEmail = `user${idCounter}@${slug.substring(0, 10)}.com`;

            // Create User Insert
            userInserts.push(`('${userId}', ${escapeSql(name)}, '${userEmail}', 'provider', NOW())`);

            const description = `Professional ${category.name} services in ${area}. We provide high-quality service with 100% satisfaction guarantee.`;
            const address = `Shop No. ${Math.floor(Math.random() * 100) + 1}, Main Road, ${area}, Mumbai`;
            const phone = `+91 98${Math.floor(Math.random() * 100000000)}`;
            const email = `contact@${slug.substring(0, 10)}.com`;
            const isVerified = Math.random() > 0.3 ? 'true' : 'false';
            const isResponsive = Math.random() > 0.4 ? 'true' : 'false';
            const rating = (3.5 + Math.random() * 1.5).toFixed(1);
            const reviewCount = Math.floor(Math.random() * 5000) + 10;
            const views = Math.floor(Math.random() * 10000) + 100;

            const categoryIdSubquery = `(SELECT id FROM categories WHERE slug = '${category.slug}' LIMIT 1)`;

            // Create Provider Insert
            providerInserts.push(`('${providerId}', '${userId}', ${escapeSql(name)}, ${escapeSql(slug)}, ${escapeSql(description)}, ${escapeSql(address)}, 'Mumbai', ${escapeSql(phone)}, ${escapeSql(phone)}, ${escapeSql(email)}, ${categoryIdSubquery}, ${isVerified}, ${isResponsive}, true, '9:00 AM - 9:00 PM', ${rating}, ${reviewCount}, ${views}, NOW())`);

            // Image
            const imageId = generateUUID();
            const imgUrl = getRandomElement(categoryImages[category.slug] || categoryImages['electricians']);
            imageInserts.push(`('${imageId}', '${providerId}', ${escapeSql(imgUrl)}, 1, true)`);

            idCounter++;
        }
    });

    // Batch insert Users
    for (let i = 0; i < userInserts.length; i += BATCH_SIZE) {
        const batch = userInserts.slice(i, i + BATCH_SIZE);
        const sql = `INSERT INTO users (id, name, email, role, created_at) VALUES \n${batch.join(',\n')};\n`;
        writeChunk(sql, `users_${(i / BATCH_SIZE) + 1}`);
    }

    // Batch insert Providers
    for (let i = 0; i < providerInserts.length; i += BATCH_SIZE) {
        const batch = providerInserts.slice(i, i + BATCH_SIZE);
        const sql = `INSERT INTO providers (id, user_id, business_name, slug, description, address, city, phone, whatsapp, email, category_id, is_verified, is_responsive, is_available, operating_hours, rating, review_count, views, created_at) VALUES \n${batch.join(',\n')};\n`;
        writeChunk(sql, `providers_${(i / BATCH_SIZE) + 1}`);
    }

    // Batch insert Images
    for (let i = 0; i < imageInserts.length; i += BATCH_SIZE) {
        const batch = imageInserts.slice(i, i + BATCH_SIZE);
        const sql = `INSERT INTO provider_images (id, provider_id, url, display_order, is_primary) VALUES \n${batch.join(',\n')};\n`;
        writeChunk(sql, `images_${(i / BATCH_SIZE) + 1}`);
    }
};

generateSQL();
