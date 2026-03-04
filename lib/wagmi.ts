// lib/wagmi.ts
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { base } from 'wagmi/chains'; // Import Base chain dari wagmi

export const config = getDefaultConfig({
  appName: 'NexxForge v2',
  projectId: 'YOUR_WALLET_CONNECT_PROJECT_ID', // Dapat dari https://cloud.walletconnect.com
  chains: [base], // Fokus Base only
  ssr: true, // Support SSR di Next.js/Vercel
});
