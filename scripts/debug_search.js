
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; // OR SUPABASE_SERVICE_ROLE_KEY if you want to bypass RLS for testing

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkData() {
    console.log('--- Checking Categories ---');
    const { data: categories, error: catError } = await supabase
        .from('categories')
        .select('*')
        .eq('slug', 'restaurants');

    if (catError) console.error('Category Error:', catError);
    else console.log('Restaurants Category:', categories);

    if (!categories || categories.length === 0) {
        console.log('!!! RESTAURANTS CATEGORY NOT FOUND !!!');
        return;
    }

    const catId = categories[0].id;
    console.log(`Using Category ID: ${catId}`);

    console.log('\n--- Checking Providers by Category ID ---');
    const { data: providers, error: provError } = await supabase
        .from('providers')
        .select('id, business_name, city, area')
        .eq('category_id', catId);

    if (provError) console.error('Provider Error:', provError);
    else {
        console.log(`Found ${providers.length} providers for this category.`);
        if (providers.length > 0) {
            console.log('Sample Provider:', providers[0]);
        } else {
            console.log('!!! NO PROVIDERS FOUND FOR THIS CATEGORY !!!');
        }
    }

    console.log('\n--- Checking Providers by Slug Join (Search Page Logic) ---');
    const { data: joinProviders, error: joinError } = await supabase
        .from('providers')
        .select('*, categories!inner(*)')
        .eq('categories.slug', 'restaurants');

    if (joinError) console.error('Join Query Error:', joinError);
    else {
        console.log(`Found ${joinProviders.length} providers using Join logic.`);
    }
}

checkData();
