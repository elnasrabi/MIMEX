import { ApiResponse, ApisauceInstance, create } from "apisauce";
import * as Types from "./API.types";
import { ApiConfig, DEFAULT_API_CONFIG } from "./Upload-api-config";
import { getGeneralApiProblem } from "./Upload-api-problem";
const jsonxml = require("jsontoxml");


/**
 * Manages all requests to the UploadAPI.
 */
export class UploadAPI {
  /**
   * The underlying apisauce instance which performs the requests.
   */
  apisauce: ApisauceInstance;

  /**
   * Configurable options.
   */
  config: ApiConfig;

  /**
   * Creates the UploadAPI.
   *
   * @param config The configuration to use.
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config;
  }

  /**
   * Sets up the UploadAPI.  This will be called during the bootup
   * sequence and will happen before the first React component
   * is mounted.
   *
   * Be as quick as possible in here.
   */
  setup() {
    // construct the apisauce instance
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
        'Content-Type': 'multipart/form-data'
      },
    });
  }

  

  
 
 

 async UploadFile(code:any,relatedobject:any,documentdesc:any,loginname:any,file:any): Promise<Types.DocumentResult> {

  const headers = {
    Accept: "application/json",
    'Content-Type': 'multipart/form-data'
  }
  const response: ApiResponse<any> = await this.apisauce.post(`https://mobileappservices20200924204033.azurewebsites.net/api/Document/Upload?code=${code}&relatedobject=${relatedobject}&documentdesc=${documentdesc}&loginname=${loginname}`, file,
    { headers }); 
    
  if (!response.ok) {
    const problem = getGeneralApiProblem(response);
    if (problem) return problem;

  }
  try {
    const documentposted = response.data;
    return { kind: "ok", Document: documentposted ,Status:response.status};
  } catch {
    return { kind: "bad-data" };
  }
 }


 



}
