import { useState, useEffect } from 'react';
import { DEFAULT_IMG } from 'utilities/constants';

function useSupplierDetail(supplierDetail) {
  const [address, setAddress] = useState([]);
  const [otherInfo, setOtherInfo] = useState([]);
  const [contactPerson, setContactPerson] = useState([]);
  useEffect(() => {
    if (supplierDetail) {
      const supplierAddress = [
        {
          name: 'Address',
          data: [
            { label: 'Address 1', value: supplierDetail.address_line1 || '' },
            { label: 'Address 2', value: supplierDetail.address_line2 || '' },
            { label: 'Country', value: supplierDetail.country || '' },
            { label: 'City', value: supplierDetail.city || '' },
          ],
        },
      ];
      setAddress([...supplierAddress]);
      const supplierOtherInfo = [
        { label: 'Supplier ID', value: supplierDetail.id || '' },
        { label: 'Currency Code', value: supplierDetail.currency_symbol || '' },
        { label: 'Source of Supply', value: supplierDetail.country || '' },
      ];
      setOtherInfo([...supplierOtherInfo]);
      const supplierContacts = supplierDetail.supplier_contacts.map(contact => ({
        image: contact.image || DEFAULT_IMG,
        name: contact.name || contact.first_name || '',
        designation: contact.designation || '',
        email: contact.email || '',
        mobile_num: contact.mobile_num || '',
        notes: contact.notes || '',
      }));

      setContactPerson([...supplierContacts]);
    }
  }, [supplierDetail]);
  return {
    address,
    otherInfo,
    contactPerson,
  };
}

export default useSupplierDetail;
