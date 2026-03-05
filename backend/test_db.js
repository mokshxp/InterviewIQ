const { createClient } = require("@supabase/supabase-js");
require("dotenv").config({ path: __dirname + "/.env" });
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
(async () => {
    console.log("Testing auth and db query...");
    const { data: d1, error: e1 } = await supabase.from("interview_sessions").select("*").order("start_time", { ascending: false }).limit(2);
    console.log("Query 'start_time' Error:", e1?.message);
    const { data: d2, error: e2 } = await supabase.from("interview_sessions").select("*").order("created_at", { ascending: false }).limit(2);
    console.log("Query 'created_at' Error:", e2?.message);
})();
