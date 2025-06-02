import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { DoorOpen, DoorClosed } from "lucide-react";

export const StatusSelector = ({ value, onChange }) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue>
          <div className="flex items-center gap-2">
            {value === "open" ? (
              <DoorOpen className="h-4 w-4 text-green-500" />
            ) : (
              <DoorClosed className="h-4 w-4 text-red-500" />
            )}
            <span>{value === "open" ? "Open" : "Closed"}</span>
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="open">
          <div className="flex items-center gap-2">
            <DoorOpen className="h-4 w-4 text-green-500" />
            <span>Open</span>
          </div>
        </SelectItem>
        <SelectItem value="closed">
          <div className="flex items-center gap-2">
            <DoorClosed className="h-4 w-4 text-red-500" />
            <span>Closed</span>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
};