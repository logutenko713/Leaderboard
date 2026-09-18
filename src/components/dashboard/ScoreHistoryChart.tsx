import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { ScoreHistoryPoint } from '../../types/profile';

interface ScoreHistoryChartProps {
  data: ScoreHistoryPoint[];
}

export function ScoreHistoryChart({ data }: ScoreHistoryChartProps) {
  return (
    <div className="bg-white rounded-xl border border-outline-variant shadow-sm p-6 flex flex-col gap-4">
      <h2 className="text-headline-md text-on-surface">Динамика баллов</h2>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e3e5" />
            <XAxis dataKey="week" tick={{ fontSize: 12 }} stroke="#5d5e61" />
            <YAxis tick={{ fontSize: 12 }} stroke="#5d5e61" />
            <Tooltip />
            <Line type="monotone" dataKey="score" stroke="#006d30" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}