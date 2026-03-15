'use client';

import { useGarage } from '@/lib/garage-context';
import AccountToast from './AccountToast';

export default function VehicleSaveToast() {
  const { vehicleJustAdded, clearVehicleJustAdded } = useGarage();

  return (
    <AccountToast
      show={vehicleJustAdded}
      onDismiss={clearVehicleJustAdded}
    />
  );
}
