import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "@/lib/format";
import React from "react";
interface DataCardProps {
  value: number;
  label: string;
  shouldFormat?: boolean;
}
const DataCard = ({ value, label, shouldFormat }: DataCardProps) => {
  return (
    <Card>
      <CardHeader className="flex-row pb-2 space-y-2 flex items-center justify-between">
        <CardTitle className=" font-medium text-sm">{label}</CardTitle>
      </CardHeader>
      <CardContent className=" text-xl font-bold">
        {shouldFormat ? format(value) : value}
      </CardContent>
    </Card>
  );
};

export default DataCard;
