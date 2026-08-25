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

  // All 13 official municipalities of Benguet (excluding Baguio City)
  const benguetMunicipalities = [
    "Atok",
    "Bakun",
    "Bokod",
    "Buguias",
    "Itogon",
    "Kabayan",
    "Kapangan",
    "Kibungan",
    "La Trinidad",
    "Mankayan",
    "Sablan",
    "Tuba",
    "Tublay"
  ];

  const monthsList = [
    "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
    "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
  ];

  const yearlyMonths = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
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

  // Calculate aggregated totals for dashboard cards
  const totals = records.reduce(
    (acc, curr) => {
      acc.this_mun_m += curr.this_mun_male || 0;
      acc.this_mun_f += curr.this_mun_female || 0;
      acc.other_mun_m += curr.other_mun_male || 0;
      acc.other_mun_f += curr.other_mun_female || 0;
      acc.other_prov_m += curr.other_prov_male || 0;
      acc.other_prov_f += curr.other_prov_female || 0;
      acc.foreign_m += curr.foreign_male || 0;
      acc.foreign_f += curr.foreign_female || 0;
      acc.unspecified_m += curr.unspecified_male || 0;
      acc.unspecified_f += curr.unspecified_female || 0;
      return acc;
    },
    {
      this_mun_m: 0, this_mun_f: 0,
      other_mun_m: 0, other_mun_f: 0,
      other_prov_m: 0, other_prov_f: 0,
      foreign_m: 0, foreign_f: 0,
      unspecified_m: 0, unspecified_f: 0
    }
  );

  const totalThisMun = totals.this_mun_m + totals.this_mun_f;
  const totalOtherMun = totals.other_mun_m + totals.other_mun_f;
  const totalOtherProv = totals.other_prov_m + totals.other_prov_f;
  const totalForeign = totals.foreign_m + totals.foreign_f;
  const totalUnspecified = totals.unspecified_m + totals.unspecified_f;

  const grandTotal = totalThisMun + totalOtherMun + totalOtherProv + totalForeign + totalUnspecified;
  const totalMale = totals.this_mun_m + totals.other_mun_m + totals.other_prov_m + totals.foreign_m + totals.unspecified_m;
  const totalFemale = totals.this_mun_f + totals.other_mun_f + totals.other_prov_f + totals.foreign_f + totals.unspecified_f;

  // Table total sum row calculation
  const tableTotals = records.reduce(
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
            {benguetMunicipalities.map((mun) => (
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

      {/* Top Total Statistics Bar */}
      <div className="bg-[#18181b] border border-zinc-800 rounded-xl p-6 mb-8 grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
        <div className="border-r border-zinc-800 last:border-none">
          <div className="text-xs text-zinc-400 uppercase font-semibold mb-1">This Mun.</div>
          <div className="text-xl font-bold text-white">{totalThisMun}</div>
          <div className="text-xs text-zinc-500">M: {totals.this_mun_m} | F: {totals.this_mun_f}</div>
        </div>
        <div className="border-r border-zinc-800 last:border-none">
          <div className="text-xs text-zinc-400 uppercase font-semibold mb-1">Other Mun.</div>
          <div className="text-xl font-bold text-white">{totalOtherMun}</div>
          <div className="text-xs text-zinc-500">M: {totals.other_mun_m} | F: {totals.other_mun_f}</div>
        </div>
        <div className="border-r border-zinc-800 last:border-none">
          <div className="text-xs text-zinc-400 uppercase font-semibold mb-1">Other Prov.</div>
          <div className="text-xl font-bold text-white">{totalOtherProv}</div>
          <div className="text-xs text-zinc-500">M: {totals.other_prov_m} | F: {totals.other_prov_f}</div>
        </div>
        <div className="border-r border-zinc-800 last:border-none">
          <div className="text-xs text-zinc-400 uppercase font-semibold mb-1">Foreign</div>
          <div className="text-xl font-bold text-white">{totalForeign}</div>
          <div className="text-xs text-zinc-500">M: {totals.foreign_m} | F: {totals.foreign_f}</div>
        </div>
        <div>
          <div className="text-xs text-zinc-400 uppercase font-semibold mb-1">Total Visitors</div>
          <div className="text-xl font-bold text-amber-500">{grandTotal}</div>
          <div className="text-xs text-zinc-500">Overall Sum</div>
        </div>
      </div>

      {/* Three Analytics Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#18181b] border border-zinc-800 rounded-xl p-6 flex flex-col items-center justify-center min-h-[220px]">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-6">Male vs Female Visitors</h3>
          <div className="relative w-32 h-32 rounded-full border-4 border-amber-500/20 flex items-center justify-center">
            <div className="text-center">
              <span className="text-xl font-bold text-white">{grandTotal}</span>
              <div className="text-[10px] text-zinc-400">M: {totalMale} | F: {totalFemale}</div>
            </div>
          </div>
        </div>

        <div className="bg-[#18181b] border border-zinc-800 rounded-xl p-6 flex flex-col items-center justify-center min-h-[220px]">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-6">Detailed Residence Breakdown</h3>
          <div className="flex gap-4 text-xs text-zinc-400 items-center justify-center flex-wrap">
            <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-amber-500"></span> Local: {totalThisMun}</div>
            <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-blue-500"></span> Other Mun: {totalOtherMun}</div>
            <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-emerald-500"></span> Other Prov: {totalOtherProv}</div>
          </div>
        </div>

        <div className="bg-[#18181b] border border-zinc-800 rounded-xl p-6 flex flex-col items-center justify-center min-h-[220px]">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-6">Domestic vs Foreign Tourists</h3>
          <div className="flex gap-6 text-center">
            <div>
              <div className="text-lg font-bold text-white">{totalThisMun + totalOtherMun + totalOtherProv}</div>
              <div className="text-xs text-zinc-500">Domestic</div>
            </div>
            <div className="border-r border-zinc-800"></div>
            <div>
              <div className="text-lg font-bold text-amber-500">{totalForeign}</div>
              <div className="text-xs text-zinc-500">Foreign</div>
            </div>
          </div>
        </div>
      </div>

      {/* Data Table Section */}
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
              <div>{tableTotals.this_mun}</div>
              <div>{tableTotals.other_mun}</div>
              <div>{tableTotals.other_prov}</div>
              <div>{tableTotals.foreign}</div>
              <div>{tableTotals.unspecified}</div>
            </div>
          </div>
        )}
      </div>

      {/* Yearly Trend Chart Box */}
      <div className="bg-[#18181b] border border-zinc-800 rounded-xl p-6 mb-12">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-400 text-center mb-8">Visitors Per Month (Yearly Trend)</h3>
        <div className="h-40 flex items-end justify-between px-4 border-b border-zinc-800 pb-2">
          {yearlyMonths.map((m) => (
            <div key={m} className="flex flex-col items-center gap-2 flex-1">
              <div className="w-4 bg-zinc-800 rounded-t h-2 hover:bg-amber-500 transition-colors"></div>
              <span className="text-[10px] text-zinc-500">{m}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}