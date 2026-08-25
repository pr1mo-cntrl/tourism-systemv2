"use client";

import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AnalyticsCharts({ accommodations }: { accommodations: any[] }) {
  // 1. Crunch the math for the Donut Chart (Visitors by Origin)
  const phTotal = accommodations.reduce((sum, r) => sum + (r.ga_ph_count || 0), 0);
  const foreignTotal = accommodations.reduce((sum, r) => sum + (r.ga_non_fil_count || 0), 0);
  const overseasTotal = accommodations.reduce((sum, r) => sum + (r.ga_overseas_filipinos || 0), 0);
  const unspecifiedTotal = accommodations.reduce((sum, r) => sum + (r.ga_unspecified || 0), 0);

  const donutData = [
    { name: 'Philippine Residents', value: phTotal, color: '#ef4444' }, // Red
    { name: 'Foreign Visitors', value: foreignTotal, color: '#3b82f6' }, // Blue
    { name: 'Overseas Filipinos', value: overseasTotal, color: '#10b981' }, // Green
    { name: 'Unspecified', value: unspecifiedTotal, color: '#f59e0b' }, // Amber
  ].filter(d => d.value > 0); // This hides slices that have 0 visitors

  // 2. Crunch the math for the Bar Chart (Top 5 Locations)
  const barData = accommodations.map(record => {
    const totalGuests = (record.ga_ph_count || 0) + (record.ga_non_fil_count || 0) + (record.ga_overseas_filipinos || 0) + (record.ga_unspecified || 0);
    return { name: record.name, visitors: totalGuests };
  })
  .sort((a, b) => b.visitors - a.visitors) // Sort highest to lowest
  .slice(0, 5); // Grab only the top 5

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
      
      {/* DONUT CHART */}
      <div className="bg-[#18181b] border border-zinc-800 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-white mb-6">Visitors by Origin</h3>
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

      {/* BAR CHART */}
      <div className="bg-[#18181b] border border-zinc-800 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-white mb-6">Most Visited Attractions (Top 5)</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 40 }}>
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
              <Bar dataKey="visitors" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Total Visitors" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}