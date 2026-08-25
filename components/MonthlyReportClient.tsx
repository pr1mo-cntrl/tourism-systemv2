"use client";

import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
export default function MonthlyReportClient({ initialRecords }: { initialRecords: any[] }) {
  // 1. Filter States
  const [month, setMonth] = useState("AUGUST");
  const [year, setYear] = useState("2026");
  const [municipality, setMunicipality] = useState("La Trinidad");

 // 2. Filter the data based on dropdowns (Case-Insensitive AND Whitespace-Proof)
  const filteredRecords = initialRecords.filter((record) => {
    const dbMonth = (record.month || "").toString().trim().toUpperCase();
    const dbYear = (record.year || "").toString().trim();
    const dbMuni = (record.municipality || "").toString().trim().toUpperCase();
    
    const filterMonth = month.trim().toUpperCase();
    const filterYear = year.trim();
    const filterMuni = municipality.trim().toUpperCase();

    return dbMonth === filterMonth && dbYear === filterYear && dbMuni === filterMuni;
  });

  // 3. Calculate Totals for the Table Footer
  const totalPh = filteredRecords.reduce((sum, r) => sum + (r.ga_ph_count || 0), 0);
  const totalForeign = filteredRecords.reduce((sum, r) => sum + (r.ga_non_fil_count || 0), 0);
  const totalOverseas = filteredRecords.reduce((sum, r) => sum + (r.ga_overseas_filipinos || 0), 0);
  const totalUnspecified = filteredRecords.reduce((sum, r) => sum + (r.ga_unspecified || 0), 0);

  // 4. Calculate Yearly Trend Data (with Bulletproof Filters!)
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const filterYear = year.toString().trim();
  const filterMuni = municipality.toString().trim().toUpperCase();

  const yearlyData = months.map(m => {
    const targetMonthPrefix = m.toUpperCase(); // "JAN", "FEB", etc.

    // Filter records safely for the specific month in the loop
    const monthRecords = initialRecords.filter(r => {
       const dbMonthPrefix = (r.month || "").toString().trim().substring(0, 3).toUpperCase();
       const dbYear = (r.year || "").toString().trim();
       const dbMuni = (r.municipality || "").toString().trim().toUpperCase();

       return dbMonthPrefix === targetMonthPrefix && dbYear === filterYear && dbMuni === filterMuni;
    });

    const totalVisitors = monthRecords.reduce((sum, r) => sum + (r.ga_ph_count || 0) + (r.ga_non_fil_count || 0) + (r.ga_overseas_filipinos || 0) + (r.ga_unspecified || 0), 0);
    return { name: m, visitors: totalVisitors };
  });

  // 5. Chart 1: Male vs Female (Using a 50/50 split of total guests for visual testing until exact columns are added)
  const totalAllGuests = totalPh + totalForeign + totalOverseas + totalUnspecified;
  const genderData = [
    { name: 'Male', value: Math.floor(totalAllGuests * 0.5), color: '#a855f7' }, // Purple
    { name: 'Female', value: Math.ceil(totalAllGuests * 0.5), color: '#ec4899' }, // Pink
  ].filter(d => d.value > 0);

  // 6. Chart 2: Detailed Residence Breakdown
  const residenceData = [
    { name: 'PH Residents', value: totalPh, color: '#3b82f6' }, // Blue
    { name: 'Overseas Filipinos', value: totalOverseas, color: '#f59e0b' }, // Amber
    { name: 'Foreign', value: totalForeign, color: '#ef4444' }, // Red
    { name: 'Unspecified', value: totalUnspecified, color: '#71717a' }, // Gray
  ].filter(d => d.value > 0);

  // 7. Chart 3: Domestic vs Foreign
  const domesticTotal = totalPh + totalOverseas;
  const domVsForData = [
    { name: 'Domestic (Local + Prov)', value: domesticTotal, color: '#10b981' }, // Green
    { name: 'Foreign', value: totalForeign, color: '#ef4444' }, // Red
    { name: 'Unspecified', value: totalUnspecified, color: '#71717a' }, // Gray
  ].filter(d => d.value > 0);

  return (
    <div className="mt-6">
      
      {/* FILTER DROPDOWNS */}
      <div className="flex flex-wrap gap-6 mb-10">
        <div>
          <label className="block text-zinc-400 text-xs font-bold mb-2 uppercase">Month</label>
          <select value={month} onChange={(e) => setMonth(e.target.value)} className="bg-[#18181b] border border-zinc-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 min-w-[150px]">
            <option value="JANUARY">JANUARY</option>
            <option value="FEBRUARY">FEBRUARY</option>
            <option value="MARCH">MARCH</option>
            <option value="APRIL">APRIL</option>
            <option value="MAY">MAY</option>
            <option value="JUNE">JUNE</option>
            <option value="JULY">JULY</option>
            <option value="AUGUST">AUGUST</option>
            <option value="SEPTEMBER">SEPTEMBER</option>
            <option value="OCTOBER">OCTOBER</option>
            <option value="NOVEMBER">NOVEMBER</option>
            <option value="DECEMBER">DECEMBER</option>
          </select>
        </div>
        <div>
          <label className="block text-zinc-400 text-xs font-bold mb-2 uppercase">Year</label>
          <select value={year} onChange={(e) => setYear(e.target.value)} className="bg-[#18181b] border border-zinc-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 min-w-[150px]">
            <option value="2025">2025</option>
            <option value="2026">2026</option>
            <option value="2027">2027</option>
          </select>
        </div>
        <div>
          <label className="block text-zinc-400 text-xs font-bold mb-2 uppercase">Municipality</label>
          <select value={municipality} onChange={(e) => setMunicipality(e.target.value)} className="bg-[#18181b] border border-zinc-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 min-w-[200px]">
            <option value="La Trinidad">La Trinidad</option>
            <option value="Atok">Atok</option>
            <option value="Baguio City">Baguio City</option>
          </select>
        </div>
      </div>

      {/* DYNAMIC HEADER */}
      <div className="text-center mb-8">
        <h2 className="text-xl font-bold text-white mb-2">Month: {month} &nbsp;&nbsp; Year: {year}</h2>
        <p className="text-zinc-400 uppercase tracking-widest text-sm">Municipality: {municipality}</p>
      </div>

      {/* THE DATA TABLE */}
      <div className="bg-[#18181b] border border-zinc-800 rounded-xl overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-center border-collapse text-sm">
            <thead>
              <tr className="bg-[#27272a] border-b border-zinc-800 text-zinc-300 text-xs uppercase tracking-wider">
                <th className="p-4 text-left font-semibold">Tourist Attraction</th>
                <th className="p-4 font-semibold">This Municipality</th>
                <th className="p-4 font-semibold">Other Municipality</th>
                <th className="p-4 font-semibold">Other Province</th>
                <th className="p-4 font-semibold">Foreign Country</th>
                <th className="p-4 font-semibold">Unspecified</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {filteredRecords.length === 0 ? (
                <tr><td colSpan={6} className="p-8 text-zinc-500">No records found for this period.</td></tr>
              ) : (
                filteredRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-zinc-800/50 transition-colors">
                    <td className="p-4 text-left">
                      <div className="font-bold text-white uppercase">{record.name}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-white text-lg">{record.ga_ph_count || 0}</div>
                      <div className="text-[10px] text-zinc-500">M: 0 | F: 0</div>
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-white text-lg">0</div>
                      <div className="text-[10px] text-zinc-500">M: 0 | F: 0</div>
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-white text-lg">{record.ga_overseas_filipinos || 0}</div>
                      <div className="text-[10px] text-zinc-500">M: 0 | F: 0</div>
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-white text-lg">{record.ga_non_fil_count || 0}</div>
                      <div className="text-[10px] text-zinc-500">M: 0 | F: 0</div>
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-amber-500 text-lg">{record.ga_unspecified || 0}</div>
                      <div className="text-[10px] text-zinc-500">M: 0 | F: 0</div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
            {/* FOOTER TOTALS */}
            <tfoot>
              <tr className="bg-[#27272a] border-t-2 border-zinc-700">
                <td className="p-4 text-left font-bold text-white">TOTAL OF THIS MONTH:</td>
                <td className="p-4">
                  <div className="font-bold text-white text-lg">{totalPh}</div>
                  <div className="text-[10px] text-zinc-500">M: 0 | F: 0</div>
                </td>
                <td className="p-4">
                  <div className="font-bold text-white text-lg">0</div>
                  <div className="text-[10px] text-zinc-500">M: 0 | F: 0</div>
                </td>
                <td className="p-4">
                  <div className="font-bold text-white text-lg">{totalOverseas}</div>
                  <div className="text-[10px] text-zinc-500">M: 0 | F: 0</div>
                </td>
                <td className="p-4">
                  <div className="font-bold text-white text-lg">{totalForeign}</div>
                  <div className="text-[10px] text-zinc-500">M: 0 | F: 0</div>
                </td>
                <td className="p-4">
                  <div className="font-bold text-amber-500 text-lg">{totalUnspecified}</div>
                  <div className="text-[10px] text-zinc-500">M: 0 | F: 0</div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* THE CHARTS SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        {/* Chart 1: Male vs Female */}
        <div className="bg-[#18181b] border border-zinc-800 rounded-xl p-6 flex flex-col items-center">
          <h3 className="text-sm font-bold text-white mb-2 text-center">Male vs Female Visitors</h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={genderData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={2} dataKey="value" stroke="none">
                  {genderData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#27272a', borderColor: '#3f3f46', color: '#fff', borderRadius: '8px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-4 text-[10px] text-zinc-400 mt-2 font-bold uppercase tracking-wider">
            {genderData.map((d, i) => (
              <span key={i} className="flex items-center gap-1"><div className="w-3 h-2 rounded-sm" style={{ backgroundColor: d.color }}></div>{d.name}</span>
            ))}
          </div>
        </div>

        {/* Chart 2: Detailed Residence */}
        <div className="bg-[#18181b] border border-zinc-800 rounded-xl p-6 flex flex-col items-center">
          <h3 className="text-sm font-bold text-white mb-2 text-center">Detailed Residence Breakdown</h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={residenceData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={2} dataKey="value" stroke="none">
                  {residenceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#27272a', borderColor: '#3f3f46', color: '#fff', borderRadius: '8px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-3 text-[10px] text-zinc-400 mt-2 font-bold uppercase tracking-wider">
             {residenceData.map((d, i) => (
              <span key={i} className="flex items-center gap-1"><div className="w-3 h-2 rounded-sm" style={{ backgroundColor: d.color }}></div>{d.name}</span>
            ))}
          </div>
        </div>

        {/* Chart 3: Domestic vs Foreign */}
        <div className="bg-[#18181b] border border-zinc-800 rounded-xl p-6 flex flex-col items-center">
          <h3 className="text-sm font-bold text-white mb-2 text-center">Domestic vs Foreign Tourists</h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={domVsForData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={2} dataKey="value" stroke="none">
                  {domVsForData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#27272a', borderColor: '#3f3f46', color: '#fff', borderRadius: '8px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-[10px] text-zinc-400 mt-2 font-bold uppercase tracking-wider">
             {domVsForData.map((d, i) => (
              <span key={i} className="flex items-center gap-1"><div className="w-3 h-2 rounded-sm" style={{ backgroundColor: d.color }}></div>{d.name}</span>
            ))}
          </div>
        </div>

      </div>

      {/* YEARLY TREND CHART */}
      <div className="bg-[#18181b] border border-zinc-800 rounded-xl p-6 shadow-sm">
        <h3 className="text-sm font-bold text-white text-center mb-6">Visitors Per Month (Yearly Trend)</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={yearlyData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
              <XAxis dataKey="name" stroke="#a1a1aa" fontSize={12} tickMargin={10} axisLine={false} tickLine={false} />
              <YAxis stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip cursor={{ fill: '#27272a' }} contentStyle={{ backgroundColor: '#27272a', borderColor: '#3f3f46', color: '#fff', borderRadius: '8px' }} />
              <Bar dataKey="visitors" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Total Visitors" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}