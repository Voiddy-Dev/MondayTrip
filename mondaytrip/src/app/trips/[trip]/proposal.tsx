import { DateRange } from 'react-day-picker';

export interface Proposal {
    hostelId: number;
    hostelName: string;
    hostelDescription: string;
    hostelLocation: string;
    startDate: Date;
    endDate: Date;
    dateRange: DateRange;
    totalPriceToPay: number;
    approvals: number;
}