// Use this import if you want to use "env.js" file
// const { API_URL } = require("../../config/env")
// Or just specify it directly like this:
export const API_URL = "http://uat2.afs.moveitnetexpress.com.au/moveit/gateway/"
export const CONSIGNMENT_SEARCH = "http://www.moveit.com.au/schema/consignments.xsd"
export const SAVE_CONSIGNMENT = "http://www.moveit.com.au/schema/metadata.xsd"

/**
 * The options used to configure the API.
 */
export interface ApiConfig {
  /**
   * The URL of the api.
   */
  url: string;

  /**
   * Milliseconds before we timeout the request.
   */
  timeout: number;
}

/**
 * The default configuration for the app.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: API_URL,
  timeout: 100000,
};
