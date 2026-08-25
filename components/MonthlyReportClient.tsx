"use client";

import { useState, useMemo } from "react";
import { Download } from "lucide-react";

export default function MonthlyReportClient({ initialRecords }: { initialRecords: any[] }) {
  const [month, setMonth] = useState("AUGUST");
  const [year, setYear] = useState("2026");
  const [municipality, setMunicipality] = useState("La Trinidad");

  const municipalitiesList = [
    "Atok", "Bakun", "Bokod", "Buguias", "Itogon", "Kabayan",
    "Kapangan", "Kibungan", "La Trinidad", "Mankayan", "Sablan",
    "Tuba", "Tublay"
  ];

  const monthsList = [
    "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
    "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
  ];

  // Bulletproof filtering: case-insensitive and trims whitespace
  const filteredRecords = useMemo(() => {
    if (!initialRecords || !Array.isArray(initialRecords)) return [];
    
    return initialRecords.filter((r) => {
      const dbMonth = (r.month || "").trim().toUpperCase();
      const filterMonth = month.trim().toUpperCase();
      
      const dbYear = (r.year || "").toString().trim();
      const filterYear = year.trim();
      
      // If dbMun is empty, we force it to match so we can at least see the broken records!
      const dbMun = (r.municipality || "").trim().toUpperCase();
      const filterMun = municipality.trim().toUpperCase();

      const isMonthMatch = dbMonth === filterMonth;
      const isYearMatch = dbYear === filterYear;
      // If DB has no municipality, temporarily show it anyway so we know it exists
      const isMunMatch = dbMun === filterMun || dbMun === ""; 

      return isMonthMatch && isYearMatch && isMunMatch;
    });
  }, [initialRecords, month, year, municipality]);

  // Aggregate stats for Table Totals
  const tableTotals = filteredRecords.reduce((acc, curr) => {
    acc.this_mun += (curr.this_mun_male || 0) + (curr.this_mun_female || 0);
    acc.this_mun_m += (curr.this_mun_male || 0);
    acc.this_mun_f += (curr.this_mun_female || 0);

    acc.other_mun += (curr.other_mun_male || 0) + (curr.other_mun_female || 0);
    acc.other_mun_m += (curr.other_mun_male || 0);
    acc.other_mun_f += (curr.other_mun_female || 0);

    acc.other_prov += (curr.other_prov_male || 0) + (curr.other_prov_female || 0);
    acc.other_prov_m += (curr.other_prov_male || 0);
    acc.other_prov_f += (curr.other_prov_female || 0);

    acc.foreign += (curr.foreign_male || 0) + (curr.foreign_female || 0);
    acc.foreign_m += (curr.foreign_male || 0);
    acc.foreign_f += (curr.foreign_female || 0);

    acc.unspec += (curr.unspecified_male || 0) + (curr.unspecified_female || 0);
    acc.unspec_m += (curr.unspecified_male || 0);
    acc.unspec_f += (curr.unspecified_female || 0);

    return acc;
  }, {
    this_mun: 0, this_mun_m: 0, this_mun_f: 0,
    other_mun: 0, other_mun_m: 0, other_mun_f: 0,
    other_prov: 0, other_prov_m: 0, other_prov_f: 0,
    foreign: 0, foreign_m: 0, foreign_f: 0,
    unspec: 0, unspec_m: 0, unspec_f: 0
  });

  // Calculate totals for Analytics Cards
  const totalLocal = tableTotals.this_mun;
  const totalOtherMun = tableTotals.other_mun;
  const totalOtherProv = tableTotals.other_prov;
  const totalDomestic = totalLocal + totalOtherMun + totalOtherProv;
  const totalForeign = tableTotals.foreign;
  
  const totalMale = tableTotals.this_mun_m + tableTotals.other_mun_m + tableTotals.other_prov_m + tableTotals.foreign_m + tableTotals.unspec_m;
  const totalFemale = tableTotals.this_mun_f + tableTotals.other_mun_f + tableTotals.other_prov_f + tableTotals.foreign_f + tableTotals.unspec_f;
  const grandTotal = totalMale + totalFemale;

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <p className="text-zinc-400 text-sm">Department of Tourism - Provincial Statistics Generation</p>
        <button
          onClick={() => window.print()}
          className="bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
        >
          <Download size={18} /> Export Report
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 bg-[#18181b] border border-zinc-800 p-6 rounded-xl">
        <div>
          <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Month</label>
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="w-full bg-[#27272a] border border-zinc-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:border-amber-500"
          >
            {monthsList.map((m) => <option key={m} value={m}>{m}</option>)}
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
            {municipalitiesList.map((mun) => <option key={mun} value={mun}>{mun}</option>)}
          </select>
        </div>
      </div>

      {/* Banner */}
      <div className="bg-[#18181b] border border-zinc-800 rounded-xl p-6 mb-8 text-center">
        <h2 className="text-sm font-semibold tracking-wider text-amber-500 uppercase mb-1">Province of Benguet • Tourism Division</h2>
        <p className="text-white font-bold text-lg">
          MONTHLY VISITOR ARRIVAL REPORT — {month} {year} | MUNICIPALITY: {municipality.toUpperCase()}
        </p>
      </div>

      {/* Table */}
      <div className="bg-[#18181b] border border-zinc-800 rounded-xl overflow-hidden mb-8">
        <div className="grid grid-cols-6 bg-[#27272a] px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider text-center">
          <div className="text-left">Tourist Attraction</div>
          <div>This Municipality</div>
          <div>Other Municipality</div>
          <div>Other Province</div>
          <div>Foreign Country</div>
          <div>Unspecified</div>
        </div>

        {filteredRecords.length === 0 ? (
          <div className="p-12 text-center text-zinc-500">No records found for {municipality} in {month} {year}.</div>
        ) : (
          <div>
            {filteredRecords.map((rec, i) => (
              <div key={rec.id || i} className="grid grid-cols-6 px-6 py-4 border-t border-zinc-800 items-center text-center text-sm">
                <div className="text-left">
                  <div className="font-bold text-white uppercase">{rec.name || rec.attraction_name}</div>
                  <div className="text-xs text-zinc-500 mt-0.5">Code: {rec.code || rec.attraction_code || 'N/A'}</div>
                </div>
                <div className="text-zinc-300">
                  <span className="font-bold text-white text-base">{(rec.this_mun_male || 0) + (rec.this_mun_female || 0)}</span>
                  <div className="text-[10px] text-zinc-500">M: {rec.this_mun_male || 0} | F: {rec.this_mun_female || 0}</div>
                </div>
                <div className="text-zinc-300">
                  <span className="font-bold text-white text-base">{(rec.other_mun_male || 0) + (rec.other_mun_female || 0)}</span>
                  <div className="text-[10px] text-zinc-500">M: {rec.other_mun_male || 0} | F: {rec.other_mun_female || 0}</div>
                </div>
                <div className="text-zinc-300">
                  <span className="font-bold text-white text-base">{(rec.other_prov_male || 0) + (rec.other_prov_female || 0)}</span>
                  <div className="text-[10px] text-zinc-500">M: {rec.other_prov_male || 0} | F: {rec.other_prov_female || 0}</div>
                </div>
                <div className="text-zinc-300">
                  <span className="font-bold text-white text-base">{(rec.foreign_male || 0) + (rec.foreign_female || 0)}</span>
                  <div className="text-[10px] text-zinc-500">M: {rec.foreign_male || 0} | F: {rec.foreign_female || 0}</div>
                </div>
                <div className="text-zinc-300">
                  <span className="font-bold text-white text-base">{(rec.unspecified_male || 0) + (rec.unspecified_female || 0)}</span>
                  <div className="text-[10px] text-zinc-500">M: {rec.unspecified_male || 0} | F: {rec.unspecified_female || 0}</div>
                </div>
              </div>
            ))}

            <div className="grid grid-cols-6 px-6 py-4 bg-[#27272a]/50 border-t-2 border-zinc-700 items-center text-center font-bold text-white">
              <div className="text-left uppercase text-sm">TOTAL OF THIS MONTH:</div>
              <div>
                <div className="text-lg text-white">{tableTotals.this_mun}</div>
                <div className="text-[10px] text-zinc-500 font-normal mt-0.5">M: {tableTotals.this_mun_m} | F: {tableTotals.this_mun_f}</div>
              </div>
              <div>
                <div className="text-lg text-white">{tableTotals.other_mun}</div>
                <div className="text-[10px] text-zinc-500 font-normal mt-0.5">M: {tableTotals.other_mun_m} | F: {tableTotals.other_mun_f}</div>
              </div>
              <div>
                <div className="text-lg text-white">{tableTotals.other_prov}</div>
                <div className="text-[10px] text-zinc-500 font-normal mt-0.5">M: {tableTotals.other_prov_m} | F: {tableTotals.other_prov_f}</div>
              </div>
              <div>
                <div className="text-lg text-white">{tableTotals.foreign}</div>
                <div className="text-[10px] text-zinc-500 font-normal mt-0.5">M: {tableTotals.foreign_m} | F: {tableTotals.foreign_f}</div>
              </div>
              <div>
                <div className="text-lg text-white">{tableTotals.unspec}</div>
                <div className="text-[10px] text-zinc-500 font-normal mt-0.5">M: {tableTotals.unspec_m} | F: {tableTotals.unspec_f}</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#18181b] border border-zinc-800 rounded-xl p-6 flex flex-col items-center justify-center min-h-[220px]">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-6">Male vs Female Visitors</h3>
          <div className="relative w-32 h-32 rounded-full border-4 border-amber-500/20 flex items-center justify-center">
            <div className="text-center">
              <span className="text-3xl font-bold text-white">{grandTotal}</span>
              <div className="text-[10px] text-zinc-400 mt-1">M: {totalMale} | F: {totalFemale}</div>
            </div>
          </div>
        </div>

        <div className="bg-[#18181b] border border-zinc-800 rounded-xl p-6 flex flex-col items-center justify-center min-h-[220px]">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-6">Detailed Residence Breakdown</h3>
          <div className="flex gap-4 text-xs text-zinc-400 items-center justify-center flex-wrap">
            <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-amber-500"></span> Local: {totalLocal}</div>
            <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-blue-500"></span> Other Mun: {totalOtherMun}</div>
            <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-emerald-500"></span> Other Prov: {totalOtherProv}</div>
          </div>
        </div>

        <div className="bg-[#18181b] border border-zinc-800 rounded-xl p-6 flex flex-col items-center justify-center min-h-[220px]">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-6">Domestic vs Foreign Tourists</h3>
          <div className="flex gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-white">{totalDomestic}</div>
              <div className="text-xs text-zinc-500 mt-1">Domestic</div>
            </div>
            <div className="border-r border-zinc-800"></div>
            <div>
              <div className="text-2xl font-bold text-amber-500">{totalForeign}</div>
              <div className="text-xs text-zinc-500 mt-1">Foreign</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}