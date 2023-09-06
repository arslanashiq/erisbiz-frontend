import { useState, useEffect } from 'react';

function useSupplierIncome(income, currency) {
  const [supplierIncome, setSupplierIncome] = useState([]);
  useEffect(() => {
    if (supplierIncome) {
      const customSupplierIncome = income
        ? income.map(item => ({
          name: `${item.month} ${item.year}`,
          [currency]: item.income,
          amt: 1000,
        }))
        : [];
      setSupplierIncome([...customSupplierIncome]);
    }
  }, [supplierIncome]);
  return {
    supplierIncome,
  };
}

export default useSupplierIncome;
