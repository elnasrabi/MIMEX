// Use this import if you want to use "env.js" file
// const { API_URL } = require("../../config/env")
// Or just specify it directly like this:
export const API_URL = "http://afs-sql01-dev/MobileAppDev/api/"

export const IMFORM_SEARCH = "http://www.imex.com.au/schema/consignments.xsd"
export const SAVE_CONSIGNMENT = "http://www.imex.com.au/schema/metadata.xsd"
let testurl='https://mobileappservices20200924204033.azurewebsites.net';
let azureurl='https://mobileappservices20200924204033.azurewebsites.net'
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
