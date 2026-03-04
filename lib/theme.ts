// lib/theme.ts
import merge from 'lodash.merge';
import { Theme, darkTheme } from '@rainbow-me/rainbowkit';

export const customTheme = merge(darkTheme(), {
  colors: {
    accentColor: '#00f5d4', // Teal-cyan utama
    accentColorForeground: '#0f172a', // Text gelap
    connectButtonBackground: '#00f5d4',
    connectButtonText: '#0f172a',
    modalBackground: '#0f172a', // Match dark bg app
  },
  radii: {
    actionButton: '12px', // Lebih rounded
    connectButton: '12px',
    modal: '16px', // Modal lebih smooth
  },
  shadows: {
    connectButton: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
} as Theme);
