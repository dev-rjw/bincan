import { createClient } from "@supabase/supabase-js";

//supabass 연결
const SUPABASS_URL = "https://ltmlsvowetkigjbwwqwy.supabase.co";
const SUPABASS_KEY = import.meta.env.VITE_SUPABASE_KEY;
export const supabase = createClient(SUPABASS_URL, SUPABASS_KEY);
