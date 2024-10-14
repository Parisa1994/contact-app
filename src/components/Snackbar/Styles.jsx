// @mui
import { GlobalStyles } from '@mui/material';
import { useTheme } from '@mui/material/styles';
export default function StyledNotistack() {
  const theme = useTheme();

  const isLight = theme.palette.mode === 'light';

  const inputGlobalStyles = (
    <GlobalStyles
      styles={{
        body: {
          '.notistack-SnackbarContainer': { alignItems: 'flex-start' },
          '.notistack-MuiContent': {
            width: '100%',
            padding: '0px 0px 0px 8px',
            margin: theme.spacing(0.25, 0),
            boxShadow: 'rgba(145, 158, 171, 0.16) 0px 8px 16px 0px !important',
            borderRadius: '12px !important',
            gap: 10,
            color: isLight ? theme.palette.common.white : theme.palette.grey[800],
            backgroundColor: isLight ? theme.palette.grey[900] : theme.palette.common.white,
            '&.notistack-MuiContent-success, &.notistack-MuiContent-error, &.notistack-MuiContent-warning, &.notistack-MuiContent-info':
            {
              color: theme.palette.text.primary,
              backgroundColor: theme.palette.background.paper
            },
            [theme.breakpoints.up('md')]: {
              minWidth: 240
            }
          },
          '.notistack-MuiContent> div:nth-of-type(2)': {
            display: 'flex',
            alignItems: 'center',
            marginRight: '-8px',
            paddingLeft: '16px',
            marginLeft: 'auto'
          }
        }
      }}
    />
  );

  return inputGlobalStyles;
}
