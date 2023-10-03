import { useNavigate } from 'react-router';

function useReportHeaderFilters() {
  const navigate = useNavigate();
  const handleSubmitCustomDateFilter = async (values, { setSubmitting }, handleClose) => {
    navigate({
      pathname: `${window.location.pathname}`,
      search: `duration='custom'&custom_start_date=${values.start_date}&custom_end_date=${values.end_date}`,
    });

    setSubmitting(false);
    handleClose();
  };

  const handleChangeFilter = selectedFilterOption => {
    if (selectedFilterOption.value) {
      navigate({
        pathname: `${window.location.pathname}`,
        search: `duration=${selectedFilterOption.value}`,
      });
    }
  };
  return { handleChangeFilter, handleSubmitCustomDateFilter };
}

export default useReportHeaderFilters;
