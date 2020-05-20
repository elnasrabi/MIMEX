import { ApisauceInstance, create, ApiResponse } from "apisauce"
import { getGeneralApiProblem } from "./api-problem"
import { ApiConfig, DEFAULT_API_CONFIG } from "./api-config"
import * as Types from "./api.types"
import base64 from 'react-native-base64'

/**
 * Manages all requests to the API.
 */
export class Api {
  /**
   * The underlying apisauce instance which performs the requests.
   */
  apisauce: ApisauceInstance

  /**
   * Configurable options.
   */
  config: ApiConfig

  /**
   * Creates the api.
   *
   * @param config The configuration to use.
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
  }

  /**
   * Sets up the API.  This will be called during the bootup
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
        Accept: "application/xml",
      },
    })
  }

  async login(username: string, password: string): Promise<Types.LoginUserResult> {
    console.tron.log('Basic:', "Basic " + base64.encode(username + ":" + password))
    const xmlData = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<requests xmlns=\"http://www.moveit.com.au/schema/consignments.xsd\">\n    <userRequest>\n  </userRequest>\n</requests>"
    const response: ApiResponse<any> = await this.apisauce.post('', xmlData, { headers: { Authorization: "Basic " + base64.encode(username + ":" + password) } })
    console.tron.log('response', response)
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    try {
      const tokenData = response.data
      return { kind: "ok", user: tokenData }
    } catch {
      return { kind: "bad-data" }
    }
  }

  async forgotPassword(email: string): Promise<Types.LoginUserResult> {
    console.tron.log('Basic:', "Basic " + base64.encode(email))
    const xmlData = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<requests xmlns=\"http://www.moveit.com.au/schema/consignments.xsd\">\n    <userRequest>\n  </userRequest>\n</requests>"
    const response: ApiResponse<any> = await this.apisauce.post('', xmlData, { headers: { Authorization: "Basic " + base64.encode(username + ":" + password) } })
    console.tron.log('response', response)
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    try {
      const tokenData = response.data
      return { kind: "ok", user: tokenData }
    } catch {
      return { kind: "bad-data" }
    }
  }

  async getUser(id: string): Promise<Types.GetUserResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(`/users/${id}`)

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const resultUser: Types.User = {
        id: response.data.id,
        name: response.data.name,
      }
      return { kind: "ok", user: resultUser }
    } catch {
      return { kind: "bad-data" }
    }
  }
}
