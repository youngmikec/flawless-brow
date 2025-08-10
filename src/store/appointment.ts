import { create } from 'zustand';
import { Appointment } from '../interfaces';

interface AppointmentStore {
  isLoading: boolean;
  createAppointment: any;
  appointmentData: any;
  appointments: Appointment[];
  clearCreateAppointment: () => void;
  setAppointmentData: (data: any) => void;
  appendAppointData: (data: any) => void;
  setAppointments: (data: Appointment[]) => void;
}

export const useAppointmentStore = create<AppointmentStore>((set) => ({
  isLoading: false,
  appointmentData: null,
  appointments: [],
  createAppointment: {},
  setAppointmentData: (data: any) => set({ appointmentData: data }),
  appendAppointData: (data: any) => set((state) => {
    const { createAppointment } = state;
    const newValue = { ...createAppointment, ...data };
    state.createAppointment = newValue;
    return state;
  }),
  clearCreateAppointment: () => set({ createAppointment: {} }),
  setAppointments: (data: Appointment[]) => set({ appointments: data }),
}));
