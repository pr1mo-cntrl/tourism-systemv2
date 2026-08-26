"use client";

import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AnalyticsCharts({ accommodations = [], visitorRecords = [] }: { accommodations?: any[], visitorRecords?: any[] }) {
  // 1. Crunch the math for the Donut Chart (Visitors by Origin - Accommodations)
  const phTotal = accommodations.reduce((sum, r) => sum + (r.ga_ph_count || 0), 0);
  const foreignTotal = accommodations.reduce((sum, r) => sum + (r.ga_non_fil_count || 0), 0);
  const overseasTotal = accommodations.reduce((sum, r) => sum + (r.ga_overseas_filipinos || 0), 0);
  const unspecifiedTotal = accommodations.reduce((sum, r) => sum + (r.ga_unspecified || 0), 0);

  const donutData = [
    { name: 'Philippine Residents', value: phTotal, color: '#ef4444' }, // Red
    { name: 'Foreign Visitors', value: foreignTotal, color: '#3b82f6' }, // Blue
    { name: 'Overseas Filipinos', value: overseasTotal, color: '#10b981' }, // Green
    { name: 'Unspecified', value: unspecifiedTotal, color: '#f59e0b' }, // Amber
  ].filter(d => d.value > 0); // Hides slices that have 0 visitors

  // 2. Crunch the math for the Accommodations Bar Chart
  const accTotals: Record<string, number> = {};
  accommodations.forEach(record => {
    const name = record.name || 'Unknown';
    const totalGuests = (record.ga_ph_count || 0) + (record.ga_non_fil_count || 0) + (record.ga_overseas_filipinos || 0) + (record.ga_unspecified || 0);
    accTotals[name] = (accTotals[name] || 0) + totalGuests;
  });
  
  const accBarData = Object.keys(accTotals)
    .map(name => ({ name, visitors: accTotals[name] }))
    .sort((a, b) => b.visitors - a.visitors) // Sort highest to lowest
    .slice(0, 5); // Top 5

  // 3. Crunch the math for the Attractions Bar Chart (Visitor Records)
  const attTotals: Record<string, number> = {};
  visitorRecords.forEach(record => {
    const name = record.attraction_name || record.name || 'Unknown';
    const totalGuests = 
      (record.this_mun_male || 0) + (record.this_mun_female || 0) +
      (record.other_mun_male || 0) + (record.other_mun_female || 0) +
      (record.other_prov_male || 0) + (record.other_prov_female || 0) +
      (record.foreign_male || 0) + (record.foreign_female || 0) +
      (record.unspecified_male || 0) + (record.unspecified_female || 0);
      
    attTotals[name] = (attTotals[name] || 0) + totalGuests;
  });

  const attBarData = Object.keys(attTotals)
    .map(name => ({ name, visitors: attTotals[name] }))
    .sort((a, b) => b.visitors - a.visitors) // Sort highest to lowest
    .slice(0, 5); // Top 5

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
      
      {/* DONUT CHART (Accommodations Demographics) */}
      <div className="bg-[#18181b] border border-zinc-800 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-white mb-6">Accommodation Visitors by Origin</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={donutData}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={120}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
              >
                {donutData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#27272a', borderColor: '#3f3f46', color: '#fff', borderRadius: '8px' }}
                itemStyle={{ color: '#fff' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {/* Custom Chart Legend */}
        <div className="flex flex-wrap justify-center gap-4 mt-4 text-xs text-zinc-400">
          {donutData.map((entry, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
              {entry.name}
            </div>
          ))}
        </div>
      </div>

      {/* ACCOMMODATIONS BAR CHART */}
      <div className="bg-[#18181b] border border-zinc-800 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-white mb-6">Most Visited Accommodations (Top 5)</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={accBarData} margin={{ top: 10, right: 10, left: -20, bottom: 40 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
              <XAxis 
                dataKey="name" 
                stroke="#a1a1aa" 
                fontSize={10} 
                tickMargin={10} 
                angle={-20} 
                textAnchor="end" 
              />
              <YAxis stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                cursor={{ fill: '#27272a' }}
                contentStyle={{ backgroundColor: '#27272a', borderColor: '#3f3f46', color: '#fff', borderRadius: '8px' }}
              />
              <Bar dataKey="visitors" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Total Guests" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ATTRACTIONS BAR CHART (Full Width) */}
      <div className="bg-[#18181b] border border-zinc-800 rounded-xl p-6 shadow-sm lg:col-span-2">
        <h3 className="text-lg font-bold text-white mb-6">Most Visited Attractions (Top 5)</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={attBarData} margin={{ top: 10, right: 10, left: -20, bottom: 40 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
              <XAxis 
                dataKey="name" 
                stroke="#a1a1aa" 
                fontSize={10} 
                tickMargin={10} 
                angle={-10} 
                textAnchor="end" 
              />
              <YAxis stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                cursor={{ fill: '#27272a' }}
                contentStyle={{ backgroundColor: '#27272a', borderColor: '#3f3f46', color: '#fff', borderRadius: '8px' }}
              />
              <Bar dataKey="visitors" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Total Visitors" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}