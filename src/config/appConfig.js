import "dotenv/config";

export const appConfig = {
  node: process.env.NODE_ENV || "development",
  isProduction: process.env.NODE_ENV === "production",
  isDevelopment: process.env.NODE_ENV === "development",
  name: process.env.APP_NAME,
  port: Number(process.env.PORT),
  routePrefix: process.env.APP_ROUTE_PREFIX,
  sessionSecret: process.env.SESSION_SECRET,
  allowedDomain: process.env.ALLOWED_DOMAIN,
  useLimiter: true,
  useCompression: true,
  runsBehindProxy: false,
  version: "/api/v1",

  permissions: [
    "read",
    "create",
    "update",
    "delete",
    "assign",
    "revoke",
    "view",
    "list",
    "upload",
    "download",
  ],

  //  cronJobsEnabled: toBool(env("ENABLE_CRON_JOBS")),
};
