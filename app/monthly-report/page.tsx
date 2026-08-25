"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { FileText, Download } from "lucide-react";

export default function MonthlyReportPage() {
  const [month, setMonth] = useState("AUGUST");
  const [year, setYear] = useState("2026");
  const [municipality, setMunicipality] = useState("Atok");
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // All 13 official municipalities of Benguet (excluding Baguio City)
  const benguetMunicipalities = [
    "Atok", "Bakun", "Bokod", "Buguias", "Itogon", "Kabayan", 
    "Kapangan", "Kibungan", "La Trinidad", "Mankayan", "Sablan", "Tuba", "Tublay"
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

  // Aggregate stats
  let totalThisMunM = 0, totalThisMunF = 0;
  let totalOtherMunM = 0, totalOtherMunF = 0;
  let totalOtherProvM = 0, totalOtherProvF = 0;
  let totalForeignM = 0, totalForeignF = 0;
  let totalUnspecM = 0, totalUnspecF = 0;

  records.forEach((r) => {
    totalThisMunM += r.this_mun_male || 0;
    totalThisMunF += r.this_mun_female || 0;
    totalOtherMunM += r.other_mun_male || 0;
    totalOtherMunF += r.other_mun_female || 0;
    totalOtherProvM += r.other_prov_male || 0;
    totalOtherProvF += r.other_prov_female || 0;
    totalForeignM += r.foreign_male || 0;
    totalForeignF += r.foreign_female || 0;
    totalUnspecM += r.unspecified_male || 0;
    totalUnspecF += r.unspecified_female || 0;
  });

  const grandTotalThis = totalThisMunM + totalThisMunF;
  const grandTotalOtherMun = totalOtherMunM + totalOtherMunF;
  const grandTotalOtherProv = totalOtherProvM + totalOtherProvF;
  const grandTotalForeign = totalForeignM + totalForeignF;
  const grandTotalUnspec = totalUnspecM + totalUnspecF;
  const grandTotalAll = grandTotalThis + grandTotalOtherMun + grandTotalOtherProv + grandTotalForeign + grandTotalUnspec;

  const totalMale = totalThisMunM + totalOtherMunM + totalOtherProvM + totalForeignM + totalUnspecM;
  const totalFemale = totalThisMunF + totalOtherMunF + totalOtherProvF + totalForeignF + totalUnspecF;

  return (
    <main className="p-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Official Monthly Report</h1>
          <p className="text-sm text-zinc-400">Department of Tourism - Provincial Statistics Generation</p>
        </div>
        <button 
          onClick={() => window.print()}
          className="bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors"
        >
          <Download size={16} />
          Export Report
        </button>
      </div>

      {/* Filter Controls Bar */}
      <div className="bg-[#18181b] border border-zinc-800 rounded-xl p-6 mb-8 grid grid-cols-1 md:grid-cols-3 gap-6 shadow-xl">
        <div>
          <label className="block text-zinc-400 text-xs font-bold mb-2 uppercase tracking-wider">Month</label>
          <select 
            value={month} 
            onChange={(e) => setMonth(e.target.value)}
            className="w-full bg-[#27272a] border border-zinc-700 text-white rounded-lg p-3 text-sm focus:outline-none focus:border-amber-500"
          >
            {monthsList.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-zinc-400 text-xs font-bold mb-2 uppercase tracking-wider">Year</label>
          <select 
            value={year} 
            onChange={(e) => setYear(e.target.value)}
            className="w-full bg-[#27272a] border border-zinc-700 text-white rounded-lg p-3 text-sm focus:outline-none focus:border-amber-500"
          >
            {["2025", "2026", "2027"].map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-zinc-400 text-xs font-bold mb-2 uppercase tracking-wider">Municipality</label>
          <select 
            value={municipality} 
            onChange={(e) => setMunicipality(e.target.value)}
            className="w-full bg-[#27272a] border border-zinc-700 text-white rounded-lg p-3 text-sm focus:outline-none focus:border-amber-500"
          >
            {benguetMunicipalities.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
      </div>

      {/* Report Summary Banner */}
      <div className="bg-[#18181b] border border-zinc-800 rounded-xl p-6 mb-8 text-center shadow-xl">
        <h2 className="text-xl font-bold text-white uppercase tracking-wide">
          PROVINCE OF BENGUET • TOURISM DIVISION
        </h2>
        <p className="text-amber-500 font-semibold mt-1">
          MONTHLY VISITOR ARRIVAL REPORT — {month} {year} | MUNICIPALITY: {municipality.toUpperCase()}
        </p>
      </div>

      {/* Table Data */}
      <div className="bg-[#18181b] border border-zinc-800 rounded-xl overflow-hidden shadow-xl mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#27272a] border-b border-zinc-800 text-zinc-300 text-xs uppercase tracking-wider">
                <th className="p-4 font-semibold">Tourist Attraction</th>
                <th className="p-4 font-semibold text-center">This Municipality</th>
                <th className="p-4 font-semibold text-center">Other Municipality</th>
                <th className="p-4 font-semibold text-center">Other Province</th>
                <th className="p-4 font-semibold text-center">Foreign Country</th>
                <th className="p-4 font-semibold text-center">Unspecified</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800 text-sm">
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-zinc-500">Loading monthly report...</td>
                </tr>
              ) : records.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-zinc-500">No records found for {municipality} in {month} {year}.</td>
                </tr>
              ) : (
                records.map((r) => (
                  <tr key={r.id} className="hover:bg-zinc-800/50 transition-colors">
                    <td className="p-4 font-bold text-white uppercase">
                      {r.attraction_name}
                      <div className="text-xs text-zinc-400 font-normal">Code: {r.attraction_code}</div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="font-bold text-emerald-400">{(r.this_mun_male || 0) + (r.this_mun_female || 0)}</div>
                      <div className="text-xs text-zinc-500">M: {r.this_mun_male || 0} | F: {r.this_mun_female || 0}</div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="font-bold text-blue-400">{(r.other_mun_male || 0) + (r.other_mun_female || 0)}</div>
                      <div className="text-xs text-zinc-500">M: {r.other_mun_male || 0} | F: {r.other_mun_female || 0}</div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="font-bold text-amber-400">{(r.other_prov_male || 0) + (r.other_prov_female || 0)}</div>
                      <div className="text-xs text-zinc-500">M: {r.other_prov_male || 0} | F: {r.other_prov_female || 0}</div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="font-bold text-purple-400">{(r.foreign_male || 0) + (r.foreign_female || 0)}</div>
                      <div className="text-xs text-zinc-500">M: {r.foreign_male || 0} | F: {r.foreign_female || 0}</div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="font-bold text-zinc-300">{(r.unspecified_male || 0) + (r.unspecified_female || 0)}</div>
                      <div className="text-xs text-zinc-500">M: {r.unspecified_male || 0} | F: {r.unspecified_female || 0}</div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
            {records.length > 0 && (
              <tfoot>
                <tr className="bg-[#27272a]/50 font-bold text-white border-t border-zinc-700">
                  <td className="p-4 uppercase">TOTAL OF THIS MONTH:</td>
                  <td className="p-4 text-center text-emerald-400">{grandTotalThis} <span className="text-xs block font-normal text-zinc-400">M: {totalThisMunM} | F: {totalThisMunF}</span></td>
                  <td className="p-4 text-center text-blue-400">{grandTotalOtherMun} <span className="text-xs block font-normal text-zinc-400">M: {totalOtherMunM} | F: {totalOtherMunF}</span></td>
                  <td className="p-4 text-center text-amber-400">{grandTotalOtherProv} <span className="text-xs block font-normal text-zinc-400">M: {totalOtherProvM} | F: {totalOtherProvF}</span></td>
                  <td className="p-4 text-center text-purple-400">{grandTotalForeign} <span className="text-xs block font-normal text-zinc-400">M: {totalForeignM} | F: {totalForeignF}</span></td>
                  <td className="p-4 text-center text-zinc-300">{grandTotalUnspec} <span className="text-xs block font-normal text-zinc-400">M: {totalUnspecM} | F: {totalUnspecF}</span></td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>

    </main>
  );
}