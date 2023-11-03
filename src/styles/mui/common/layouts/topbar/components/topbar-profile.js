import palette from 'styles/mui/theme/palette';

export const topbarProfile = {
  height: '100%',
  display: 'flex',
  cursor: 'pointer',
  position: 'relative',
  borderRadius: 0,
  border: 'none',
  transition: 'all 0.3s',
  boxShadow: 'none',
  padding: '0px 15px',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'transparent',
};
export const topbarProfileName = {
  color: 'black',
  fontSize: '13px',
  lineHeight: '18px',
  fontWeight: 500,
  marginLeft: '10px',
  display: { xs: 'none', md: 'block' },
};

export const topbarProfileMenu = {
  width: '160px',
};
export const topbarProfileMenuItem = {
  borderLeft: `2px solid ${palette.primary.backgroundColor}`,
  '&:hover': {
    borderLeft: `2px solid ${palette.primary.main}`,
    svg: {
      color: palette.primary.main,
    },
  },
};

export const topbarProfileMenuItemLink = {
  textDecoration: 'none',
  color: 'black',
};
export const topbarProfileMenuItemIcon = {
  color: '#999',
};
export const topbarProfileMenuItemOption = {
  fontSize: '14px',
  lineHeight: '16px',
};

export const topbarIcon = {
  marginLeft: '8px',
  height: '18px',
  fill: '#b1c3c8',
};
