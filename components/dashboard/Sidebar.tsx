'use client';

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Download, Printer } from "lucide-react";

interface SidebarProps {
  metrics: {
    revenue: boolean;
    cost: boolean;
    profit: boolean;
  };
  onMetricToggle: (metric: string) => void;
  onExport: () => void;
  onPrint: () => void;
}

export function Sidebar({ metrics, onMetricToggle, onExport, onPrint }: SidebarProps) {
  return (
    <Card className="p-6 space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Metrics</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="revenue"
              checked={metrics.revenue}
              onCheckedChange={() => onMetricToggle('revenue')}
            />
            <Label htmlFor="revenue">Revenue</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="cost"
              checked={metrics.cost}
              onCheckedChange={() => onMetricToggle('cost')}
            />
            <Label htmlFor="cost">Cost</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="profit"
              checked={metrics.profit}
              onCheckedChange={() => onMetricToggle('profit')}
            />
            <Label htmlFor="profit">Profit</Label>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Actions</h3>
        <div className="space-y-2">
          <Button
            variant="outline"
            className="w-full"
            onClick={onExport}
          >
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={onPrint}
          >
            <Printer className="mr-2 h-4 w-4" />
            Print View
          </Button>
        </div>
      </div>
    </Card>
  );
}