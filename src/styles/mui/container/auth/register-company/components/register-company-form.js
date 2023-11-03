import palette from 'styles/mui/theme/palette';

export const registerCompanyParentWrapperStyle = { height: '100vh', alignItems: 'center' };
export const registerCompanyChildWrapperStyle = { width: '100%', maxWidth: 600 };
export const registerCompanyFormLogoStyle = { maxWidth: 250 };
export const registerCompanyFormTitleStyle = {
  textAlign: 'center',
  fontSize: 20,
  fontWeight: 'bold',
  color: palette.primary.main,
};
export const registerCompanyFormWrapperStyle = { borderTop: `1px solid ${palette.primary.main}` };
export const registerCompanyCompanyLogoWrapperStyle = {
  cursor: 'pointer',
  backgroundColor: '#eaeaea',
  height: 180,
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  '&:hover': { backgroundColor: '#e0e0e0' },
};
export const registerCompanyCompanyLogoStyle = { height: 170, width: '100%', objectFit: 'contain' };
export const registerCompanyCompanyInnerFormWrapperStyle = {
  height: 170,
  width: '100%',
  objectFit: 'contain',
};
export const registerCompanyUploadLogoIconStyle = { fontSize: 100 };
export const registerCompanyUploadLogoTypography = { fontSize: 14 };
export const registerCompanySubmitButton = { fontSize: 18, width: '100%' };
