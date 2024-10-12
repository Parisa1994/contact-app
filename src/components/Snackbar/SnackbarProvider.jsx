"use client";

// import { Box, Collapse, IconButton } from "@mui/material";
// // @mui
// import { alpha } from "@mui/material/styles";
// import type { SnackbarKey } from "notistack";
// import { SnackbarProvider as NotistackProvider } from "notistack";
// import { useRef } from "react";
// import {
//   PiCheckCircleFill,
//   PiInfoFill,
//   PiWarningCircleFill,
//   PiWarningOctagonFill,
//   PiX,
// } from "react-icons/pi";

// type Props = {
//   children: React.ReactNode;
// };

// export default function SnackbarProvider({ children }: Props) {
//   const notistackRef = useRef<any>(null);
//   const onClose = (key: SnackbarKey) => () => {
//     notistackRef.current.closeSnackbar(key);
//   };

//   return (

//     <NotistackProvider
//       ref={notistackRef}
//       dense
//       maxSnack={5}
//       autoHideDuration={8000}
//       TransitionComponent={Collapse}
//       variant="success"
//       anchorOrigin={{ vertical: "top", horizontal: "right" }}
//       iconVariant={{
//         info: <SnackbarIcon icon={<PiInfoFill size={24} />} color="info" />,
//         success: (
//           <SnackbarIcon
//             icon={<PiCheckCircleFill size={24} />}
//             color="success"
//           />
//         ),
//         warning: (
//           <SnackbarIcon
//             icon={<PiWarningOctagonFill size={24} />}
//             color="warning"
//           />
//         ),
//         error: (
//           <SnackbarIcon
//             icon={<PiWarningCircleFill size={24} />}
//             color="error"
//           />
//         ),
//       }}
//       // With close as default
//       action={(key) => (
//         <IconButton size="small" onClick={onClose(key)} sx={{ p: 0.5 }}>
//           <PiX />
//         </IconButton>
//       )}
//     >
//       {children}
//     </NotistackProvider>
//   );
// }

// // ----------------------------------------------------------------------

// type SnackbarIconProps = {
//   icon: React.ReactNode;
//   color: "info" | "success" | "warning" | "error";
// };

// function SnackbarIcon({ icon, color }: SnackbarIconProps) {
//   return (
//     <Box
//       component="span"
//       sx={{
//         mr: 1.5,
//         width: 40,
//         height: 40,
//         display: "flex",
//         borderRadius: 1.5,
//         alignItems: "center",
//         justifyContent: "center",
//         color: `${color}.main`,
//         bgcolor: (theme) => alpha(theme.palette[color].main, 0.16),
//       }}
//     >
//       {icon}
//     </Box>
//   );
// }
