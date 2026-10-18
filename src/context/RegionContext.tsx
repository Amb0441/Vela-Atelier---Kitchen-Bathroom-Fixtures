import React, { createContext, useContext, useState } from 'react';

export type Region = 'AUSTRALIA' | 'NEW ZEALAND' | 'UNITED KINGDOM' | 'INTERNATIONAL';

interface RegionContextType {
  region: Region;
  setRegion: (region: Region) => void;
  formatPrice: (price: number) => string;
}

const RegionContext = createContext<RegionContextType>({
  region: 'AUSTRALIA',
  setRegion: () => {},
  formatPrice: (price) => `$${price.toFixed(2)}`
});

export const RegionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [region, setRegion] = useState<Region>('AUSTRALIA');

  const formatPrice = (price: number) => {
    switch (region) {
      case 'NEW ZEALAND':
        return `NZ$${(price * 1.09).toFixed(2)}`;
      case 'UNITED KINGDOM':
        return `£${(price * 0.52).toFixed(2)}`;
      case 'INTERNATIONAL':
        return `US$${(price * 0.66).toFixed(2)}`;
      case 'AUSTRALIA':
      default:
        return `$${price.toFixed(2)}`;
    }
  };

  return (
    <RegionContext.Provider value={{ region, setRegion, formatPrice }}>
      {children}
    </RegionContext.Provider>
  );
};

export const useRegion = () => useContext(RegionContext);
