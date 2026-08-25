"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Download } from "lucide-react";

export default function MonthlyReportPage() {
  const [month, setMonth] = useState("AUGUST");
  const [year, setYear] = useState("2026");
  const [municipality, setMunicipality] = useState("Atok");
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const municipalitiesList = [
    "Atok",
    "La Trinidad",
    "Baguio City"
  ];

  const monthsList = [
    "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
    "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
  ];

  useEffect(() => {
    const fetchReportData = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("visitor_records")
        .select("*")
        .eq("month", month)
        .eq("year", year)
        .eq("municipality", municipality);

      if (error) {
        console.error("Error fetching report data:", error.message);
      } else {
        setRecords(data || []);
      }
      setLoading(false);
    };

    fetchReportData();
  }, [month, year, municipality]);

  // Calculate totals for the table
  const totals = records.reduce(
    (acc, curr) => {
      acc.this_mun += (curr.this_mun_male || 0) + (curr.this_mun_female || 0);
      acc.other_mun += (curr.other_mun_male || 0) + (curr.other_mun_female || 0);
      acc.other_prov += (curr.other_prov_male || 0) + (curr.other_prov_female || 0);
      acc.foreign += (curr.foreign_male || 0) + (curr.foreign_female || 0);
      acc.unspecified += (curr.unspecified_male || 0) + (curr.unspecified_female || 0);
      return acc;
    },
    { this_mun: 0, other_mun: 0, other_prov: 0, foreign: 0, unspecified: 0 }
  );

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Official Monthly Report</h1>
          <p className="text-zinc-400 text-sm">Department of Tourism - Provincial Statistics Generation</p>
        </div>
        <button
          onClick={() => window.print()}
          className="bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
        >
          <Download size={18} /> Export Report
        </button>
      </div>

      {/* Filters Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#18181b] border border-zinc-800 p-6 rounded-xl mb-8">
        <div>
          <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Month</label>
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="w-full bg-[#27272a] border border-zinc-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-amber-500"
          >
            {monthsList.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Year</label>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-full bg-[#27272a] border border-zinc-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-amber-500"
          >
            <option value="2026">2026</option>
            <option value="2025">2025</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Municipality</label>
          <select
            value={municipality}
            onChange={(e) => setMunicipality(e.target.value)}
            className="w-full bg-[#27272a] border border-zinc-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-amber-500"
          >
            {municipalitiesList.map((mun) => (
              <option key={mun} value={mun}>{mun}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Report Banner */}
      <div className="bg-[#18181b] border border-zinc-800 rounded-xl p-6 mb-8 text-center">
        <h2 className="text-sm font-semibold tracking-wider text-amber-500 uppercase mb-1">Province of Benguet • Tourism Division</h2>
        <p className="text-white font-bold text-lg">
          MONTHLY VISITOR ARRIVAL REPORT — {month} {year} | MUNICIPALITY: {municipality.toUpperCase()}
        </p>
      </div>

      {/* Data Table */}
      <div className="bg-[#18181b] border border-zinc-800 rounded-xl overflow-hidden mb-12">
        <div className="grid grid-cols-6 bg-[#27272a] px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider text-center">
          <div className="text-left">Tourist Attraction</div>
          <div>This Municipality</div>
          <div>Other Municipality</div>
          <div>Other Province</div>
          <div>Foreign Country</div>
          <div>Unspecified</div>
        </div>

        {loading ? (
          <div className="p-12 text-center text-zinc-500">Loading records...</div>
        ) : records.length === 0 ? (
          <div className="p-12 text-center text-zinc-500">No records found for {municipality} in {month} {year}.</div>
        ) : (
          <div>
            {records.map((rec) => (
              <div key={rec.id} className="grid grid-cols-6 px-6 py-4 border-t border-zinc-800 items-center text-center text-sm">
                <div className="text-left font-medium text-white">{rec.attraction_name}</div>
                <div className="text-zinc-300">
                  <span className="font-bold text-white">{(rec.this_mun_male || 0) + (rec.this_mun_female || 0)}</span>
                  <div className="text-xs text-zinc-500">M: {rec.this_mun_male || 0} | F: {rec.this_mun_female || 0}</div>
                </div>
                <div className="text-zinc-300">
                  <span className="font-bold text-white">{(rec.other_mun_male || 0) + (rec.other_mun_female || 0)}</span>
                  <div className="text-xs text-zinc-500">M: {rec.other_mun_male || 0} | F: {rec.other_mun_female || 0}</div>
                </div>
                <div className="text-zinc-300">
                  <span className="font-bold text-white">{(rec.other_prov_male || 0) + (rec.other_prov_female || 0)}</span>
                  <div className="text-xs text-zinc-500">M: {rec.other_prov_male || 0} | F: {rec.other_prov_female || 0}</div>
                </div>
                <div className="text-zinc-300">
                  <span className="font-bold text-white">{(rec.foreign_male || 0) + (rec.foreign_female || 0)}</span>
                  <div className="text-xs text-zinc-500">M: {rec.foreign_male || 0} | F: {rec.foreign_female || 0}</div>
                </div>
                <div className="text-zinc-300">
                  <span className="font-bold text-white">{(rec.unspecified_male || 0) + (rec.unspecified_female || 0)}</span>
                  <div className="text-xs text-zinc-500">M: {rec.unspecified_male || 0} | F: {rec.unspecified_female || 0}</div>
                </div>
              </div>
            ))}

            {/* Total Row */}
            <div className="grid grid-cols-6 px-6 py-4 bg-[#27272a]/50 border-t-2 border-zinc-700 items-center text-center font-bold text-white">
              <div className="text-left">TOTAL OF THIS MONTH:</div>
              <div>{totals.this_mun}</div>
              <div>{totals.other_mun}</div>
              <div>{totals.other_prov}</div>
              <div>{totals.foreign}</div>
              <div>{totals.unspecified}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}