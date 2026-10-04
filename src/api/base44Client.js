import { createClient } from '@base44/sdk';

// Create a client with authentication required for production use
export const base44 = createClient({
  appId: import.meta.env.VITE_BASE44_APP_ID,
  requiresAuth: true
});
