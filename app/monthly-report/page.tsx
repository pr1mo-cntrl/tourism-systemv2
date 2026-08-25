import { supabase } from "@/lib/supabase";
import MonthlyReportClient from "@/components/MonthlyReportClient";

export const dynamic = "force-dynamic";

export default async function MonthlyReportPage() {
  // Fetch initial data (e.g., for default month/year/municipality)
  const defaultMonth = "AUGUST";
  const defaultYear = "2026";
  const defaultMunicipality = "Atok";

  const { data: initialRecords, error } = await supabase
    .from("visitor_records")
    .select("*")
    .eq("month", defaultMonth)
    .eq("year", defaultYear)
    .eq("municipality", defaultMunicipality);

  if (error) {
    console.error("Error fetching initial report data:", error.message);
  }

  return (
    <main className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-2 border-b border-zinc-800 pb-4">
        <h1 className="text-3xl font-bold text-white">Monthly Report</h1>
      </div>

      {/* Inject our interactive UI */}
      <MonthlyReportClient initialRecords={initialRecords || []} />
    </main>
  );
}