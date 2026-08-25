"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function MonthlyReportPage() {
  const [month, setMonth] = useState("AUGUST");
  const [year, setYear] = useState("2026");
  const [municipality, setMunicipality] = useState("La Trinidad");
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
      // Using .ilike for case-insensitive matching so records load properly
      const { data, error } = await supabase
        .from("visitor_records")
        .select("*")
        .ilike("month", month)
        .eq("year", year)
        .ilike("municipality", municipality);

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
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Monthly Report</h1>
      </div>

      {/* Filters Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Month</label>
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="w-full bg-[#18181b] border border-zinc-800 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-amber-500"
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
            className="w-full bg-[#18181b] border border-zinc-800 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-amber-500"
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
            className="w-full bg-[#18181b] border border-zinc-800 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-amber-500"
          >
            {municipalitiesList.map((mun) => (
              <option key={mun} value={mun}>{mun}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Report Banner */}
      <div className="text-center my-6">
        <div className="text-zinc-400 text-sm font-semibold">Month: {month} &nbsp;&nbsp; Year: {year}</div>
        <div className="text-white font-bold text-sm tracking-wider uppercase mt-1">
          Municipality: {municipality}
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-[#18181b] border border-zinc-800 rounded-xl overflow-hidden mb-8">
        <div className="grid grid-cols-6 bg-[#18181b] px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider text-center border-b border-zinc-800">
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
              <div key={rec.id} className="grid grid-cols-6 px-6 py-4 border-b border-zinc-800 items-center text-center text-sm">
                <div className="text-left">
                  <div className="font-bold text-white">{rec.attraction_name}</div>
                  <div className="text-xs text-zinc-500">Code: {rec.code || rec.attraction_code || 'N/A'}</div>
                </div>
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
            <div className="grid grid-cols-6 px-6 py-4 bg-[#18181b] items-center text-center font-bold text-white">
              <div className="text-left">TOTAL OF THIS MONTH:</div>
              <div>
                <div>{totals.this_mun}</div>
                <div className="text-xs text-zinc-500 font-normal">M: 0 | F: 0</div>
              </div>
              <div>
                <div>{totals.other_mun}</div>
                <div className="text-xs text-zinc-500 font-normal">M: 0 | F: 0</div>
              </div>
              <div>
                <div>{totals.other_prov}</div>
                <div className="text-xs text-zinc-500 font-normal">M: 0 | F: 0</div>
              </div>
              <div>
                <div>{totals.foreign}</div>
                <div className="text-xs text-zinc-500 font-normal">M: 0 | F: 0</div>
              </div>
              <div>
                <div>{totals.unspecified}</div>
                <div className="text-xs text-zinc-500 font-normal">M: 0 | F: 0</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Three Analytics Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#18181b] border border-zinc-800 rounded-xl p-6 flex flex-col items-center justify-center min-h-[220px]">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-6">Male vs Female Visitors</h3>
          <div className="relative w-32 h-32 rounded-full border-4 border-amber-500/20 flex items-center justify-center">
            <div className="text-center">
              <span className="text-xl font-bold text-white">0</span>
              <div className="text-[10px] text-zinc-400">M: 0 | F: 0</div>
            </div>
          </div>
        </div>

        <div className="bg-[#18181b] border border-zinc-800 rounded-xl p-6 flex flex-col items-center justify-center min-h-[220px]">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-6">Detailed Residence Breakdown</h3>
          <div className="flex gap-4 text-xs text-zinc-400 items-center justify-center flex-wrap">
            <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-amber-500"></span> Local: 0</div>
            <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-blue-500"></span> Other Mun: 0</div>
            <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-emerald-500"></span> Other Prov: 0</div>
          </div>
        </div>

        <div className="bg-[#18181b] border border-zinc-800 rounded-xl p-6 flex flex-col items-center justify-center min-h-[220px]">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-6">Domestic vs Foreign Tourists</h3>
          <div className="flex gap-6 text-center">
            <div>
              <div className="text-lg font-bold text-white">0</div>
              <div className="text-xs text-zinc-500">Domestic</div>
            </div>
            <div className="border-r border-zinc-800"></div>
            <div>
              <div className="text-lg font-bold text-amber-500">0</div>
              <div className="text-xs text-zinc-500">Foreign</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}