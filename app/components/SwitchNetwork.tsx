'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import qs from 'query-string';

import Select from "react-select";

const options = [
  { value: 'ethereum', label: 'Ethereum' },
  { value: 'arbitrum', label: 'Arbitrum' },
]

interface SwitchNetworkProps {
  chain?: string | undefined | null;
}

const SwitchNetwork = ({ chain }: SwitchNetworkProps) => {
  
  const router = useRouter();

  const handleClick = useCallback((selectedOption: any) => {
    const selectedChain = selectedOption.value;
    const updatedQuery = { chain: selectedChain };
    const url = qs.stringifyUrl({
      url: '/',
      query: updatedQuery
    }, { skipNull: true });
    router.push(url);
  }, [router]);

  const getControlStyle = (provided:any, state:any) => {
    const isFocused = state.isFocused;
    
    return {
      ...provided,
      backgroundColor: '#141619',
      borderRadius: '8px',
      padding: '8px',
      border: 'none',
      boxShadow: isFocused ? '0 0 0 1px #6e29da' : 'none',
      caretColor: 'white', // Changer la couleur du curseur
      '& input': {
        color: 'white', // Changer la couleur du texte
      },
    };
  };
  const getInputStyle = (provided:any, state:any) => {
    return {
      ...provided,
      color: 'white'
    };
  };
  const getPlaceholderStyle = (provided:any, state:any) => {
    return {
      ...provided,
      color: 'white'
    };
  };  
  const getOptionStyle = (provided: any, state: any) => {
    const isSelected = state.isSelected;
    const isFocused = state.isFocused;
  
    return {
      ...provided,
      backgroundColor: isSelected ? '#6e29da' : isFocused ? '#2e3138' : '#141619',
      color: 'white',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    };
  };
  const getMenuStyle = (provided: any, state: any) => ({
    ...provided,
    backgroundColor: 'inherit',
  });

  return (
    <div className='mb-4'>
      {chain && (
        <Select
          options={options}
          onChange={(newValue) => handleClick(newValue)}
          value={options.find((option) => option.value === chain)}
          styles={{
            input: (provided, state) => getInputStyle(provided, state),
            singleValue: (provided, state) => getPlaceholderStyle(provided, state),
            control: (provided, state) => getControlStyle(provided, state),
            option: (provided, state) => getOptionStyle(provided, state),
            menu: (provided, state) => getMenuStyle(provided, state),
          }}
        />
      )}
    </div>
  );
};

export default SwitchNetwork;
