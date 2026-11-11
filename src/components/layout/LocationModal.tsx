import React from 'react';
import { MapPin, Check, Navigation } from 'lucide-react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LocationModal: React.FC<LocationModalProps> = ({ isOpen, onClose }) => {
  const { currentLocation, setCurrentLocation, allLocations } = useApp();

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Select Your Delivery Location" maxWidth="md">
      <div className="space-y-4">
        <p className="text-sm text-slate-500">
          Hyperlocal multi-vendor orders are grouped based on your geographic zone. Choose your area to see nearby active stores.
        </p>

        {/* Auto detect button */}
        <button
          type="button"
          onClick={() => {
            setCurrentLocation(allLocations[0]);
            onClose();
          }}
          className="w-full flex items-center justify-between p-3.5 rounded-xl border border-brand-200 bg-brand-50/70 text-brand-700 hover:bg-brand-100 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-brand-600 text-white flex items-center justify-center shadow-sm">
              <Navigation className="w-5 h-5 animate-pulse" />
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-brand-900">Use My Current GPS Location</p>
              <p className="text-xs text-brand-600">Auto-detect nearest delivery cluster</p>
            </div>
          </div>
          <span className="text-xs font-semibold px-2 py-1 bg-brand-200/60 rounded-md text-brand-800">
            Fastest
          </span>
        </button>

        <div className="pt-2">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            Available Service Zones
          </p>
          <div className="space-y-2">
            {allLocations.map(loc => {
              const isSelected = loc.id === currentLocation.id;
              return (
                <button
                  key={loc.id}
                  onClick={() => {
                    setCurrentLocation(loc);
                    onClose();
                  }}
                  className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'border-brand-600 bg-brand-50/50 ring-1 ring-brand-500'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        isSelected ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{loc.name}</p>
                      <p className="text-xs text-slate-500">
                        {loc.city} • <span className="text-brand-700 font-medium">{loc.zone}</span>
                      </p>
                    </div>
                  </div>
                  {isSelected && <Check className="w-5 h-5 text-brand-600" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </Modal>
  );
};
