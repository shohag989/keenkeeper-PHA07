"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const COLORS = {
  text: "#7E35E1",
  call: "#244D3F",
  video: "#37A163",
};

export default function InteractionPieChart({ data }) {
  return (
    <div className="w-[347px] h-[252px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={58}
            outerRadius={92}
            paddingAngle={1}
            stroke="transparent"
            isAnimationActive={false}
          >
            {data.map((entry) => (
              <Cell key={entry.key} fill={COLORS[entry.key] ?? "#CBD5E1"} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name) => [value, name]}
            contentStyle={{
              borderRadius: 8,
              borderColor: "#E9E9E9",
              fontFamily: "var(--font-sans)",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

