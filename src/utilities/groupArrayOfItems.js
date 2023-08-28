const groupItems = item => {
  const groupedItems = item.reduce((agg, currentItem) => {
    const found = agg.find(rec => rec.service_type === currentItem.service_type);
    if (found) {
      found.items.push(currentItem);
      found.currency = currentItem.currency;
      found.num_nights += parseFloat(currentItem.num_nights);
      found.unit_price_ex_vat += parseFloat(currentItem.unit_price_ex_vat);
      found.gross_amount += parseFloat(currentItem.gross_amount);
      found.vat_amount += parseFloat(currentItem.vat_amount);
    } else {
      agg.push({
        items: [currentItem],
        service_type: currentItem.service_type,
        currency: currentItem.currency,
        num_nights: parseFloat(currentItem.num_nights),
        unit_price_ex_vat: parseFloat(currentItem.unit_price_ex_vat),
        gross_amount: parseFloat(currentItem.gross_amount),
        amount_ex_vat: parseFloat(currentItem.amount_ex_vat),
      });
    }
    return agg;
  }, []);
  return groupedItems;
};

export default groupItems;
