import { Card } from "@/components/ui/card";
import { FinancialRecord } from "@/lib/types";

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

export function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload) return null;

  return (
    <Card className="bg-background/95 backdrop-blur p-3 border shadow-lg">
      <p className="font-medium">{label}</p>
      {payload.map((item, index) => (
        <div key={index} className="flex items-center gap-2 text-sm">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: item.color }}
          />
          <span>{item.name}:</span>
          <span className="font-medium">
            {item.name === 'profit_margin'
              ? `${item.value.toFixed(2)}%`
              : `$${item.value.toLocaleString()}`}
          </span>
        </div>
      ))}
    </Card>
  );
}