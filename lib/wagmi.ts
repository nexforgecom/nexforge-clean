import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { base } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'NexxForge v2',
  projectId: '1ca2482f7aa1c65ad3d2b2e143c89ef4',
  chains: [base],
  ssr: true,
});
