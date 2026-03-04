import { Theme, darkTheme } from '@rainbow-me/rainbowkit';

const baseDark = darkTheme();

export const customTheme: Theme = {
  ...baseDark,
  colors: {
    ...baseDark.colors,
    accentColor: '#00f5d4',
    accentColorForeground: '#0f172a',
    connectButtonBackground: '#00f5d4',
    connectButtonText: '#0f172a',
    modalBackground: '#0f172a',
  },
  radii: {
    ...baseDark.radii,
    actionButton: '12px',
    connectButton: '12px',
    modal: '16px',
  },
  shadows: {
    ...baseDark.shadows,
    connectButton: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
};
