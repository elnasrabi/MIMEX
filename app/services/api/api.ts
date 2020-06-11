import { ApisauceInstance, create, ApiResponse } from "apisauce"
import { getGeneralApiProblem } from "./api-problem"
import { ApiConfig, DEFAULT_API_CONFIG, CONSIGNMENT_SEARCH, SAVE_CONSIGNMENT } from "./api-config"
import * as Types from "./api.types"
import base64 from 'react-native-base64'
const jsonxml = require('jsontoxml')

const getOriginalRequest: any = (api: string, requestData: any) => {
  // const xmlData = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><requests xmlns=\"http://www.moveit.com.au/schema/consignments.xsd\"><consignmentMatchingExportRequest><connoteNumber>AMI000071</connoteNumber></consignmentMatchingExportRequest></requests>"
  let xml = jsonxml({ requestData })
  xml = xml.replace("<requestData>", "")
  xml = xml.replace("</requestData>", "")
  const newApi = "'" + api + "'"
  const xmlData = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<requests xmlns=" + newApi + ">\n" + xml + "\n</requests>"
  return xmlData
}
const getOriginalRequest2: any = (api: string, requestData: any) => {
  // const xmlData = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><requests xmlns=\"http://www.moveit.com.au/schema/consignments.xsd\"><consignmentMatchingExportRequest><connoteNumber>AMI000071</connoteNumber></consignmentMatchingExportRequest></requests>"
  let xml = jsonxml({ requestData })
  xml = xml.replace("<requestData>", "")
  xml = xml.replace("</requestData>", "")
  const newApi = "'" + api + "'"
  const xmlData = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<statusUpdates xmlns:meta=" + newApi + ">\n" + xml + "\n</statusUpdates>"
  return xmlData
}
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
    const xmlData = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<requests xmlns=\"http://www.moveit.com.au/schema/consignments.xsd\">\n    <userRequest>\n  </userRequest>\n</requests>"
    const Authorization = base64.encode(username + ":" + password)
    const response: ApiResponse<any> = await this.apisauce.post('', xmlData, { headers: { Authorization: "Basic " + Authorization } })
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    try {
      const tokenData = response.data
      return { kind: "ok", user: tokenData, authorization: Authorization }
    } catch {
      return { kind: "bad-data" }
    }
  }

  async consignmentSearchByNumber(authorization: string, consignmentRequest: any): Promise<Types.ConsignmentResult> {
    const response: ApiResponse<any> = await this.apisauce.post('', getOriginalRequest(CONSIGNMENT_SEARCH, consignmentRequest), { headers: { Authorization: "Basic " + authorization } })
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    try {
      const consignmentData = response.data
      return { kind: "ok", consignment: consignmentData }
    } catch {
      return { kind: "bad-data" }
    }
  }

  async saveConsignment(authorization: string, consignmentRequest: any): Promise<Types.ConsignmentResult> {
    const response: ApiResponse<any> = await this.apisauce.post('ccsLocal/statusUpdateXML', getOriginalRequest2(SAVE_CONSIGNMENT, consignmentRequest), { headers: { Authorization: "Basic " + authorization } })
    if (!response.ok) {
      console.log(response)
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    try {
      const consignmentData = response.data
      return { kind: "ok", consignment: consignmentData }
    } catch {
      return { kind: "bad-data" }
    }
  }

  async getTownAPI(townPostalCode: any): Promise<Types.GetTownResult> {
    const response: ApiResponse<any> = await this.apisauce.get(`https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyBFxYi9_fjIKVcmFOv00zejI8pks_TnzBw&address=${townPostalCode}&components=country:AU&sensor=true`)
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    try {
      const getTownData = response.data
      return { kind: "ok", getTownData: getTownData, Status: response.status }
    } catch {
      return { kind: "bad-data" }
    }
  }

  async getCurrentLocation(latitude: any, longitude: any): Promise<Types.GetLocationResult> {
    const response: ApiResponse<any> = await this.apisauce.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${latitude + "," + longitude}&key=AIzaSyBFxYi9_fjIKVcmFOv00zejI8pks_TnzBw`)
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    try {
      const location = response.data
      return { kind: "ok", location: location, Status: response.status }
    } catch {
      return { kind: "bad-data" }
    }
  }

  async getList(authorization: string, getListRequest: any): Promise<Types.GetListResult> {
    const response: ApiResponse<any> = await this.apisauce.post('', getOriginalRequest(CONSIGNMENT_SEARCH, getListRequest), { headers: { Authorization: "Basic " + authorization } })
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    try {
      const getListData = response.data
      return { kind: "ok", getList: getListData, Status: response.status }
    } catch {
      return { kind: "bad-data" }
    }
  }

  async getACalculatedRate(authorization: string, getARateRequest: any): Promise<Types.GetARateResult> {
    const response: ApiResponse<any> = await this.apisauce.post('', getOriginalRequest(CONSIGNMENT_SEARCH, getARateRequest), { headers: { Authorization: "Basic " + authorization } })
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    try {
      const getARateData = response.data
      return { kind: "ok", getaRate: getARateData, Status: response.status }
    } catch {
      return { kind: "bad-data" }
    }
  }

  async forgotPassword(email: string): Promise<Types.LoginUserResult> {
    const xmlData = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<requests xmlns=\"http://www.moveit.com.au/schema/consignments.xsd\">\n    <userRequest>\n  </userRequest>\n</requests>"
    const response: ApiResponse<any> = await this.apisauce.post('', xmlData, { headers: { Authorization: "Basic " + base64.encode(username + ":" + password) } })
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    try {
      const tokenData = response.data
      // return { kind: "ok", user: tokenData }
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
