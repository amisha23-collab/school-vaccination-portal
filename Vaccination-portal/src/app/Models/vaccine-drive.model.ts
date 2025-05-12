export interface VaccinationDrive {
  id: number;
  vaccineName: string;
  date: string;  // Should be in the "yyyy-MM-dd" format
  availableDoses: number;
  applicableClasses: string[] | string;
  status: 'ACTIVE' | 'CANCELLED' | 'COMPLETED';
}
