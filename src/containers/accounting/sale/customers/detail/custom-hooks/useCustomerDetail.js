import { useState, useEffect } from 'react';
import { DEFAULT_IMG } from 'utilities/constants';

function useCustomerDetail(customerDetail) {
  const [address, setAddress] = useState([]);
  const [otherInfo, setOtherInfo] = useState([]);
  const [contactPerson, setContactPerson] = useState([]);

  useEffect(() => {
    if (customerDetail) {
      const supplierAddress = [
        {
          name: 'Invoice Address',
          data: [
            { label: 'Address 1', value: customerDetail.invoice_address_line1 || '' },
            { label: 'Address 2', value: customerDetail.invoice_address_line2 || '' },
            { label: 'Country', value: customerDetail.invoice_country || '' },
            { label: 'City', value: customerDetail.invoice_country || '' },
          ],
        },
        {
          name: 'Delivery Address',
          data: [
            { label: 'Address 1', value: customerDetail.delivery_address_line1 || '' },
            { label: 'Address 2', value: customerDetail.delivery_address_line2 || '' },
            { label: 'Country', value: customerDetail.delivery_country || '' },
            { label: 'City', value: customerDetail.delivery_country || '' },
          ],
        },
      ];
      setAddress([...supplierAddress]);
      const supplierOtherInfo = [
        { label: 'Customer ID', value: customerDetail.id || '' },
        { label: 'Currency Code', value: customerDetail.currency_symbol || '' },
        {
          label: 'Source of Supply',
          value:
            `${customerDetail.delivery_city ? `${customerDetail.delivery_city}` : ''}${
              customerDetail.delivery_country
            }` || '',
        },
      ];
      setOtherInfo([...supplierOtherInfo]);
      const supplierContacts = customerDetail.sales_company_contact.map(contact => ({
        image: contact.image || DEFAULT_IMG,
        name: contact.name || contact.name || '',
        designation: contact.designation || '',
        email: contact.email || '',
        mobile_num: contact.mobile_num || '',
        notes: contact.notes || '',
      }));

      setContactPerson([...supplierContacts]);
    }
  }, [customerDetail]);
  return {
    address,
    otherInfo,
    contactPerson,
  };
}

export default useCustomerDetail;
