import merge from 'lodash.merge';
import { Theme, darkTheme } from '@rainbow-me/rainbowkit';

export const customTheme = merge(darkTheme(), {
  colors: {
    accentColor: '#00f5d4',
    accentColorForeground: '#0f172a',
    connectButtonBackground: '#00f5d4',
    connectButtonText: '#0f172a',
    modalBackground: '#0f172a',
  },
  radii: {
    actionButton: '12px',
    connectButton: '12px',
    modal: '16px',
  },
  shadows: {
    connectButton: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
} as Theme);
