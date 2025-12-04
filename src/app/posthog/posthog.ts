import PostHog from 'posthog-react-native';

export const posthog = new PostHog('phc_3VCbvJ9U974fl5QZbliZHepXZXTkoFbySugni3OBblD', {
  host: 'https://us.posthog.com',
  captureAppLifecycleEvents: true,
  flushInterval: 3000,
});
