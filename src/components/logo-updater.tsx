import React, { memo, useCallback } from 'react';
import { useLogo } from './logo-provider';

const LogoUpdater = () => {
  const { logoUrl, updateLogo } = useLogo();

  const handleImageChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        updateLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [updateLogo]);

  return (
    <div>
      {logoUrl && <img src={logoUrl} alt="Logo" style={{ width: '100px', height: '100px' }} />}
      <input type="file" accept="image/*" onChange={handleImageChange} />
    </div>
  );
};

export default memo(LogoUpdater);
