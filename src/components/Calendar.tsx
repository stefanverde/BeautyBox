import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DemoContainer, DemoItem} from "@mui/x-date-pickers/internals/demo";
import {DateCalendar} from "@mui/x-date-pickers/DateCalendar";
import dayjs, {Dayjs} from "dayjs";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import React from "react";

interface CalendarProps {
    value?: Dayjs;
    setValue: (value?: Dayjs) => void;
    isAbonament?: boolean;
}
const Calendar = ({value,setValue,isAbonament}:CalendarProps) => {
    return <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DateCalendar', 'DateCalendar']}>

                <DateCalendar
                    value={value}
                    onChange={(newValue) => setValue(newValue)}
                    autoFocus={false}
                    minDate={dayjs(new Date())}
                />

        </DemoContainer>
    </LocalizationProvider>;
}

export default Calendar