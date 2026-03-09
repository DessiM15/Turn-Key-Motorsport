import type { AppointmentRequest, AppointmentStatus } from '@/lib/types';

function weekdayOffset(base: Date, daysAhead: number): string {
  const d = new Date(base);
  let added = 0;
  while (added < daysAhead) {
    d.setDate(d.getDate() + 1);
    const dow = d.getDay();
    if (dow !== 0 && dow !== 6) added++;
  }
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

const now = new Date();

const MOCK_APPOINTMENTS: AppointmentRequest[] = [
  {
    referenceNumber: 'TKM-A1B2C',
    name: 'Marcus Johnson',
    email: 'marcus.j@example.com',
    phone: '(713) 555-0142',
    preferredContact: 'call',
    vehicleYear: '2018',
    vehicleMake: 'Dodge',
    vehicleModel: 'Challenger SRT Hellcat',
    servicesRequested: ['Custom EFI Calibrations & Tuning', 'Supercharger / Turbo Kit Installation'],
    projectDescription: 'Want to upgrade to a Whipple supercharger and get a custom tune. Currently stock pulley setup.',
    appointmentDate: weekdayOffset(now, 1),
    appointmentTime: '9:00 AM',
    status: 'submitted',
    submittedAt: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    referenceNumber: 'TKM-D3E4F',
    name: 'Sarah Chen',
    email: 'sarah.chen@example.com',
    phone: '(281) 555-0198',
    preferredContact: 'email',
    vehicleYear: '2020',
    vehicleMake: 'Chevrolet',
    vehicleModel: 'Camaro SS 1LE',
    servicesRequested: ['Full Engine Builds', 'Custom Fabrication'],
    projectDescription: 'Full forged bottom end build for track use. Need custom headers fabricated.',
    appointmentDate: weekdayOffset(now, 2),
    appointmentTime: '10:00 AM',
    status: 'submitted',
    submittedAt: new Date(now.getTime() - 5 * 60 * 60 * 1000).toISOString(),
  },
  {
    referenceNumber: 'TKM-G5H6J',
    name: 'Derek Williams',
    email: 'dwilliams@example.com',
    phone: '(832) 555-0267',
    preferredContact: 'text',
    vehicleYear: '2015',
    vehicleMake: 'Ford',
    vehicleModel: 'Mustang GT',
    servicesRequested: ['Performance Parts Installation', 'Custom EFI Calibrations & Tuning'],
    projectDescription: 'Coyote cam swap with Comp Cams stage 2 kit. Need install and tune.',
    appointmentDate: weekdayOffset(now, 3),
    appointmentTime: '1:00 PM',
    status: 'submitted',
    submittedAt: new Date(now.getTime() - 8 * 60 * 60 * 1000).toISOString(),
  },
  {
    referenceNumber: 'TKM-K7L8M',
    name: 'Tony Rivera',
    email: 'tony.r@example.com',
    phone: '(346) 555-0311',
    preferredContact: 'call',
    vehicleYear: '2021',
    vehicleMake: 'Ram',
    vehicleModel: '1500 TRX',
    servicesRequested: ['Diagnostics & Troubleshooting'],
    projectDescription: 'Check engine light after aftermarket intake install. Need diag and possible retune.',
    appointmentDate: weekdayOffset(now, 4),
    appointmentTime: '11:00 AM',
    status: 'pending',
    submittedAt: new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    referenceNumber: 'TKM-N9P0Q',
    name: 'Amanda Foster',
    email: 'amanda.foster@example.com',
    phone: '(713) 555-0455',
    preferredContact: 'email',
    vehicleYear: '2019',
    vehicleMake: 'Chevrolet',
    vehicleModel: 'Corvette C7 Z06',
    servicesRequested: ['Suspension & Drivetrain Upgrades', 'Custom EFI Calibrations & Tuning'],
    projectDescription: 'Coilover install and alignment plus E85 flex fuel tune.',
    appointmentDate: weekdayOffset(now, 5),
    appointmentTime: '2:00 PM',
    status: 'pending',
    submittedAt: new Date(now.getTime() - 36 * 60 * 60 * 1000).toISOString(),
  },
  {
    referenceNumber: 'TKM-R2S3T',
    name: 'Jake Morrison',
    email: 'jake.m@example.com',
    phone: '(281) 555-0522',
    preferredContact: 'call',
    vehicleYear: '2017',
    vehicleMake: 'Chevrolet',
    vehicleModel: 'Camaro ZL1',
    servicesRequested: ['Full Engine Builds', 'Engine Installation', 'Custom EFI Calibrations & Tuning'],
    projectDescription: 'Forged LT4 build, 700+ whp goal. Need full build and install.',
    appointmentDate: weekdayOffset(now, 6),
    appointmentTime: '9:00 AM',
    status: 'confirmed',
    submittedAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    referenceNumber: 'TKM-U4V5W',
    name: 'Lisa Park',
    email: 'lisa.park@example.com',
    phone: '(832) 555-0689',
    preferredContact: 'text',
    vehicleYear: '2022',
    vehicleMake: 'Dodge',
    vehicleModel: 'Charger Scat Pack',
    servicesRequested: ['Performance Parts Installation'],
    projectDescription: 'Long tube headers and mid-pipe install. Already have the parts.',
    appointmentDate: weekdayOffset(now, 7),
    appointmentTime: '3:00 PM',
    status: 'confirmed',
    submittedAt: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    referenceNumber: 'TKM-X6Y7Z',
    name: 'Carlos Mendez',
    email: 'carlos.m@example.com',
    phone: '(346) 555-0733',
    preferredContact: 'call',
    vehicleYear: '2016',
    vehicleMake: 'Ford',
    vehicleModel: 'Mustang Shelby GT350',
    servicesRequested: ['Pre-Purchase Inspections'],
    projectDescription: 'Buying a used GT350, need PPI before purchase. Voodoo engine check.',
    appointmentDate: weekdayOffset(now, 8),
    appointmentTime: '10:00 AM',
    status: 'rescheduled',
    submittedAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    referenceNumber: 'TKM-B8C9D',
    name: 'Ryan Thompson',
    email: 'ryan.t@example.com',
    phone: '(713) 555-0877',
    preferredContact: 'email',
    vehicleYear: '2014',
    vehicleMake: 'Chevrolet',
    vehicleModel: 'Silverado 1500',
    servicesRequested: ['Maintenance for Modified Vehicles'],
    projectDescription: 'Oil change and inspection on my cammed 5.3. Want to make sure everything is healthy.',
    appointmentDate: weekdayOffset(now, 2),
    appointmentTime: '4:00 PM',
    status: 'cancelled',
    submittedAt: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export function getAllAppointments(): AppointmentRequest[] {
  return [...MOCK_APPOINTMENTS].sort(
    (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
  );
}

export function getAppointmentByRef(ref: string): AppointmentRequest | undefined {
  return MOCK_APPOINTMENTS.find((a) => a.referenceNumber === ref);
}

export function updateAppointmentStatus(
  ref: string,
  status: AppointmentStatus,
  newDate?: string,
  newTime?: string
): AppointmentRequest | undefined {
  const appointment = MOCK_APPOINTMENTS.find((a) => a.referenceNumber === ref);
  if (!appointment) return undefined;

  appointment.status = status;
  if (newDate) appointment.appointmentDate = newDate;
  if (newTime) appointment.appointmentTime = newTime;

  return { ...appointment };
}

export function addAppointment(appointment: AppointmentRequest): void {
  MOCK_APPOINTMENTS.push(appointment);
}
