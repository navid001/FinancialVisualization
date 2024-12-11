"use client";

import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange as DateRangeType } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useState } from "react";
import { DateRange } from "react-day-picker";

interface DateRangePickerProps {
    date: DateRangeType;
    onSelect: (range: DateRangeType) => void;
}

export function DateRangePicker({ date, onSelect }: DateRangePickerProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (range: DateRange | undefined) => {
        if (range?.from && range.to) {
            onSelect({ start: range.from, end: range.to });
            setIsOpen(false);
        }
    };

    return (
        <div className="grid gap-2">
            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                            "w-[300px] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date?.start ? (
                            date.end ? (
                                <>
                                    {format(date.start, "LLL dd, y")} -{" "}
                                    {format(date.end, "LLL dd, y")}
                                </>
                            ) : (
                                format(date.start, "LLL dd, y")
                            )
                        ) : (
                            <span>Pick a date range</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.start}
                        selected={{
                            from: date?.start,
                            to: date?.end,
                        }}
                        onSelect={handleSelect}
                        numberOfMonths={2}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}
