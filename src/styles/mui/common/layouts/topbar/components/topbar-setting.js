import palette from 'styles/mui/theme/palette';

export const topbarSettingMenuItem = {
  borderLeft: `2px solid ${palette.primary.backgroundColor}`,
  padding: '10px 15px',
  '&:hover': {
    borderLeft: `2px solid ${palette.primary.main}`,
  },
};

export const topbarSettingMenuItemLink = {
  textDecoration: 'none',
  color: 'black',
};
export const topbarSettingMenuItemOption = {
  fontSize: '14px',
  lineHeight: '16px',
  margin: '0px',
};
