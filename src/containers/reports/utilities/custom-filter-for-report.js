export const CustomFilterForReportParams = params => {
  try {
    const newParamsObject = {};
    if (Object.keys(params)?.length > 0) {
      Object.keys(params).forEach(key => {
        newParamsObject[key] = params[key]?.replaceAll('%20', ' ');
      });
    }
    return newParamsObject;
  } catch (error) {
    return params;
  }
};

export const test = '';
