'use client'

import React, { memo, useCallback } from 'react';
import { useLogo } from '../context-api/logoContextProvider';
import PageSubTitle from './PageSubTitle';

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
    <div className='flex flex-col justify-center item-center my-5'>
      <PageSubTitle text='Change Site Logo' />
      {logoUrl ? (<img src={logoUrl} alt="Logo" style={{ width: '100px', height: '100px' }} />) : <span>Choose logo Image from library</span>}
      <input type="file" placeholder='Choose Logo Image' accept="image/*" className='my-5' onChange={handleImageChange} />
    </div>
  );
};

export default memo(LogoUpdater);
