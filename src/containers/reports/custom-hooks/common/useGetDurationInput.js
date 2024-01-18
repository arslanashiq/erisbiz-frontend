import { FilterCustomReportsList } from 'containers/reports/utilities/constants';

function useGetDurationInput() {
  return {
    label: 'Duration',
    name: 'duration',
    labelClassName: '',
    className: 'w-100',
    options: FilterCustomReportsList,

    fullWidth: true,
  };
}

export default useGetDurationInput;
