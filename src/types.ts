export type Status = 'confirmed' | 'pending' | 'canceled';
export type Note = { text: string; reviewed: boolean };
export type Appointment = {
  id: string;
  patientName: string;
  timeISO: string;
  symptom: string;
  status: Status;
  notes?: Note;
};
