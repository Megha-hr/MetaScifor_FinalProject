// contentfulManagementClient.js
import { createClient } from 'contentful-management';

export const managementClient = createClient({
    accessToken: import.meta.env.VITE_MANAGEMENT_ACCESS_TOKEN
});
