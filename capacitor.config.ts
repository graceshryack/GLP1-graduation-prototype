import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.signos.glp1transition',
  appName: 'Signos GLP-1 Transition',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
}

export default config
