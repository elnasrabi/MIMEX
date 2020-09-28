import { ApiResponse, ApisauceInstance, create } from "apisauce";
import { ApiConfig, DEFAULT_API_CONFIG } from "./api-config";
import { getGeneralApiProblem } from "./api-problem";
import * as Types from "./api.types";
const jsonxml = require("jsontoxml");

const convertToXMLRequest: any = (api: string, requestData: any, requestType: any) => {
  // const xmlData = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><requests xmlns=\"http://www.imex.com.au/schema/consignments.xsd\"><consignmentMatchingExportRequest><connoteNumber>AMI000071</connoteNumber></consignmentMatchingExportRequest></requests>"
  let xml = jsonxml({ requestData });
  xml = xml.replace("<requestData>", "");
  xml = xml.replace("</requestData>", "");
  const newApi = "'" + api + "'";
  const xmlData =
    `<?xml version="1.0" encoding="UTF-8"?>\n<${requestType} xmlns${
      requestType === "statusUpdates" ? ":meta" : ""
    }=` +
    newApi +
    ">\n" +
    xml +
    `\n</${requestType}>`;
  return xmlData;
};

/**
 * Manages all requests to the API.
 */
export class Api {
  /**
   * The underlying apisauce instance which performs the requests.
   */
  apisauce: ApisauceInstance;

  /**
   * Configurable options.
   */
  config: ApiConfig;

  /**
   * Creates the api.
   *
   * @param config The configuration to use.
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config;
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
    });
  }

  //-------Related Objects ------------Upload ------------------

  async GetJsonRelatedObject(authorization: string): Promise<Types.RelatedObjectResult> {
    try {
      let response = await fetch(
        `https://mobileappservices20200924204033.azurewebsites.net/api/Document/getRelatedObject${authorization}`,
      );
      let json = await response.json();
      return { kind: "ok", RelatedObject: json };
    } catch (error) {
      return { kind: "bad-data" };
    }
  }

  //----------------User------------------------------------------

  async getUser(id: string): Promise<Types.GetUserResult> {
    // make the api call
    const response: ApiResponse<any> = await this.apisauce.get(`/users/${id}`);

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }

    // transform the data into the format we are expecting
    try {
      const resultUser: Types.User = {
        id: response.data.id,
        name: response.data.name,
      };
      return { kind: "ok", user: resultUser };
    } catch {
      return { kind: "bad-data" };
    }
  }

  async login(username: any, password: any): Promise<Types.LoginUserResult> {
    const Authorization = `?loginname=${username}&password=${password}`;
    const uri = `https://mobileappservices20200924204033.azurewebsites.net/api/ImexUser/Login?loginname=${username}&password=${password}`;
    //const response: ApiResponse<any> = await this.apisauce.get(uri,);
    const response: ApiResponse<any> = await this.apisauce.get(uri);
    console.log("Status is", response.status);
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    try {
      const tokendata = response.data;
      console.log(tokendata);
      return { kind: "ok", user: tokendata, authorization: Authorization, Status: response.status };
    } catch {
      return { kind: "bad-data" };
    }
  }

  async ChangePassword(
    loginname: string,
    newpassword: string,
  ): Promise<Types.ChangePasswordResult> {
    const uri = `https://mobileappservices20200924204033.azurewebsites.net/api/IMEXUser/ChangePassword?loginname=${loginname}&newpassword=${newpassword}`;
    const response: ApiResponse<any> = await this.apisauce.post(uri);

    if (!response.ok) {
      const problem = getGeneralApiProblem(response);

      if (problem) return problem;
    }
    try {
      const ChangePasswordResult = response.data;
      return { kind: "ok", ChangePassword: ChangePasswordResult };
    } catch {
      return { kind: "bad-data" };
    }
  }

  async VerifyUser(authorization: any): Promise<Types.VerifyUserResult> {
    const uri = `https://mobileappservices20200924204033.azurewebsites.net/api/IMEXUser/VerifyUser${authorization}`;
    const response: ApiResponse<any> = await this.apisauce.post(uri);
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    try {
      const VerifyUserResult = response.data;
      return { kind: "ok", VerifyUser: VerifyUserResult };
    } catch {
      return { kind: "bad-data" };
    }
  }

  async GetUserInfo(loginname: string): Promise<Types.GetUserInfo> {
    const uri = `https://mobileappservices20200924204033.azurewebsites.net/api/IMEXUser/GetUserInfo?loginname=${loginname}`;
    const response: ApiResponse<any> = await this.apisauce.get(uri);

    if (!response.ok) {
      const problem = getGeneralApiProblem(response);

      if (problem) return problem;
    }
    try {
      const GetUserResult = response.data;
      return { kind: "ok", GetUser: GetUserResult, Status: response.status };
    } catch {
      return { kind: "bad-data" };
    }
  }

  async GetClientStatus(authorization: any, cbosid: any): Promise<Types.GetClientStatus> {
    const uri = `https://mobileappservices20200924204033.azurewebsites.net/api/Client/getClientInfo${authorization}&cbosid=${cbosid}`;
    const response: ApiResponse<any> = await this.apisauce.get(uri);

    if (!response.ok) {
      const problem = getGeneralApiProblem(response);

      if (problem) return problem;
    }
    try {
      const ClientStatus = response.data;
      return { kind: "ok", ClientStatus: ClientStatus, status: response.status };
    } catch {
      return { kind: "bad-data" };
    }
  }

  //---------------Commodity---------------------------------------

  async GetJsonCommodity(authorization: string): Promise<Types.CommodityResult> {
    try {
      let response = await fetch(
        `https://mobileappservices20200924204033.azurewebsites.net/api/Commodity/getCommodity${authorization}`,
      );
      let json = await response.json();
      return { kind: "ok", Commodity: json };
    } catch (error) {
      return { kind: "bad-data" };
    }
  }

  async GetCommodity(authorization: string): Promise<Types.CommodityResult> {
    const uri = `https://mobileappservices20200924204033.azurewebsites.net/api/Commodity/getCommodity${authorization}`;
    //const response: ApiResponse<any> = await this.apisauce.get(uri,);
    const response: ApiResponse<any> = await this.apisauce.get(uri, {
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    try {
      const comm = response.data;

      return { kind: "ok", Commodity: comm };
    } catch {
      return { kind: "bad-data" };
    }
  }

  async SearchCommodity(
    authorization: string,
    searchword: string,
  ): Promise<Types.SearchCommodityResult> {
    const uri = `https://mobileappservices20200924204033.azurewebsites.net/api/Commodity/searchCommodity${authorization}&searchword=${searchword}`;
    //const response: ApiResponse<any> = await this.apisauce.get(uri,);
    const response: ApiResponse<any> = await this.apisauce.get(uri);

    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    try {
      const scomm = response.data;

      return { kind: "ok", SearchCommodity: scomm };
    } catch {
      return { kind: "bad-data" };
    }
  }

  //--------------Claim-------------------------------

  async getClaimList(
    authorization: string,
    getListRequest: any,
  ): Promise<Types.GetClaimListResult> {
    const uri = `https://mobileappservices20200924204033.azurewebsites.net/api/Claim/getAllClaims${authorization}&fromdate=${getListRequest.ClaimsByDate.FromDate}&todate=${getListRequest.ClaimsByDate.ToDate}`;
    //const response: ApiResponse<any> = await this.apisauce.get(uri,);
    const response: ApiResponse<any> = await this.apisauce.get(uri);

    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    try {
      const getClaimListData = response.data;
      return { kind: "ok", getClaimList: getClaimListData, Status: response.status };
    } catch {
      return { kind: "bad-data" };
    }
  }

  async ClaimSearchByNumber(authorization: string, Claimrequest: any): Promise<Types.ClaimResult> {
    const uri = `https://mobileappservices20200924204033.azurewebsites.net/api/Claim/getFormClaims${authorization}&formno=${Claimrequest}`;
    //const response: ApiResponse<any> = await this.apisauce.get(uri,);
    const response: ApiResponse<any> = await this.apisauce.get(uri);

    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    try {
      const Claim = response.data;
      console.log(Claim);

      return { kind: "ok", Claim: Claim, Status: response.status };
    } catch {
      return { kind: "bad-data" };
    }
  }

  async ClaimSearchByClaimCode(
    authorization: string,
    Claimrequest: any,
  ): Promise<Types.ClaimResult> {
    const uri = `https://mobileappservices20200924204033.azurewebsites.net/api/Claim/getClaimsbyClaimCode${authorization}&claimcode=${Claimrequest}`;
    //const response: ApiResponse<any> = await this.apisauce.get(uri,);
    const response: ApiResponse<any> = await this.apisauce.get(uri);

    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    try {
      const Claim = response.data;
      console.log(Claim);

      return { kind: "ok", Claim: Claim };
    } catch {
      return { kind: "bad-data" };
    }
  }

  //--------------Document-------------------------------

  async getDocumentList(authorization: string): Promise<Types.GetDocumentListResult> {
    const uri = `https://mobileappservices20200924204033.azurewebsites.net/api/Document/getAllDocs${authorization}`;
    //const response: ApiResponse<any> = await this.apisauce.get(uri,);
    const response: ApiResponse<any> = await this.apisauce.get(uri);

    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    try {
      const getDocumentListData = response.data;
      return { kind: "ok", getDocumentList: getDocumentListData, Status: response.status };
    } catch {
      return { kind: "bad-data" };
    }
  }

  async DocumentSearchByNumber(
    authorization: string,
    Documentrequest: any,
  ): Promise<Types.DocumentResult> {
    const uri = `https://mobileappservices20200924204033.azurewebsites.net/api/Document/getObjectDocument${authorization}&id=${Documentrequest}`;
    //const response: ApiResponse<any> = await this.apisauce.get(uri,);
    const response: ApiResponse<any> = await this.apisauce.get(uri);

    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    try {
      const Document = response.data;

      return { kind: "ok", Document: Document, Status: response.status };
    } catch {
      return { kind: "bad-data" };
    }
  }

  async GetDocPdf(authorization: string, Documentrequest: any): Promise<Types.DocumentResult> {
    const uri = `https://mobileappservices20200924204033.azurewebsites.net/api/Document/GetPdf${authorization}&id=${Documentrequest}`;
    //const response: ApiResponse<any> = await this.apisauce.get(uri,);
    const response: ApiResponse<any> = await this.apisauce.get(uri);

    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    try {
      const Document = response.data;

      return { kind: "ok", Document: Document, Status: response.status };
    } catch {
      return { kind: "bad-data" };
    }
  }

  async DocumentSearchByCode(
    authorization: string,
    Documentrequest: any,
  ): Promise<Types.DocumentResult> {
    const uri = `https://mobileappservices20200924204033.azurewebsites.net/api/Document/getObjectDocumentByCode${authorization}&code=${Documentrequest}`;
    //const response: ApiResponse<any> = await this.apisauce.get(uri,);
    const response: ApiResponse<any> = await this.apisauce.get(uri);

    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    try {
      const Document = response.data;

      return { kind: "ok", Document: Document, Status: response.status };
    } catch {
      return { kind: "bad-data" };
    }
  }

  //-------ClaimSettlement-------------------------------------

  async getClaimSettlementList(
    authorization: string,
    getListRequest: any,
  ): Promise<Types.GetClaimSettlementListResult> {
    const uri = `https://mobileappservices20200924204033.azurewebsites.net/api/ClaimSettlement/getAllClaimSettlement${authorization}&fromdate=${getListRequest.ClaimSettlementsByDate.FromDate}&todate=${getListRequest.ClaimSettlementsByDate.ToDate}`;
    //const response: ApiResponse<any> = await this.apisauce.get(uri,);
    const response: ApiResponse<any> = await this.apisauce.get(uri);

    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    try {
      const getClaimSettlementListData = response.data;
      return {
        kind: "ok",
        getClaimSettlementList: getClaimSettlementListData,
        Status: response.status,
      };
    } catch {
      return { kind: "bad-data" };
    }
  }

  async getClaimSettlementByClaim(
    authorization: string,
    ClaimSettlementrequest: any,
  ): Promise<Types.GetClaimSettlementListResult> {
    const uri = `https://mobileappservices20200924204033.azurewebsites.net/api/ClaimSettlement/getClaimSettlementByClaim${authorization}&claimcode=${ClaimSettlementrequest}`;
    //const response: ApiResponse<any> = await this.apisauce.get(uri,);
    const response: ApiResponse<any> = await this.apisauce.get(uri);

    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    try {
      const getClaimSettlementListData = response.data;
      return {
        kind: "ok",
        getClaimSettlementList: getClaimSettlementListData,
        Status: response.status,
      };
    } catch {
      return { kind: "bad-data" };
    }
  }

  async getClaimSettlementByPayment(
    authorization: string,
    ClaimSettlementrequest: any,
  ): Promise<Types.GetClaimSettlementListResult> {
    const uri = `https://mobileappservices20200924204033.azurewebsites.net/api/ClaimSettlement/getClaimSettlementByPayment${authorization}&paymentcode=${ClaimSettlementrequest}`;
    //const response: ApiResponse<any> = await this.apisauce.get(uri,);
    const response: ApiResponse<any> = await this.apisauce.get(uri);

    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    try {
      const getClaimSettlementListData = response.data;
      return {
        kind: "ok",
        getClaimSettlementList: getClaimSettlementListData,
        Status: response.status,
      };
    } catch {
      return { kind: "bad-data" };
    }
  }

  async getClaimSettlementByForm(
    authorization: string,
    ClaimSettlementrequest: any,
  ): Promise<Types.GetClaimSettlementListResult> {
    const uri = `https://mobileappservices20200924204033.azurewebsites.net/api/ClaimSettlement/getClaimSettlementByForm${authorization}&formcode=${ClaimSettlementrequest}`;
    //const response: ApiResponse<any> = await this.apisauce.get(uri,);
    const response: ApiResponse<any> = await this.apisauce.get(uri);

    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    try {
      const getClaimSettlementListData = response.data;
      return {
        kind: "ok",
        getClaimSettlementList: getClaimSettlementListData,
        Status: response.status,
      };
    } catch {
      return { kind: "bad-data" };
    }
  }

  async ClaimSettlementSearchByNumber(
    authorization: string,
    ClaimSettlementrequest: any,
  ): Promise<Types.ClaimSettlementResult> {
    const uri = `https://mobileappservices20200924204033.azurewebsites.net/api/ClaimSettlement/getClaimSettlement${authorization}&claimsettlementcode=${ClaimSettlementrequest}`;
    //const response: ApiResponse<any> = await this.apisauce.get(uri,);
    const response: ApiResponse<any> = await this.apisauce.get(uri);

    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    try {
      const ClaimSettlement = response.data;
      console.log(ClaimSettlement);

      return { kind: "ok", ClaimSettlement: ClaimSettlement };
    } catch {
      return { kind: "bad-data" };
    }
  }

  //-------Payment-------------------------------------

  async getPaymentList(
    authorization: string,
    getListRequest: any,
  ): Promise<Types.GetPaymentListResult> {
    const uri = `https://mobileappservices20200924204033.azurewebsites.net/api/Payment/GetAllPayment${authorization}&fromdate=${getListRequest.PaymentsByDate.FromDate}&todate=${getListRequest.PaymentsByDate.ToDate}`;
    //const response: ApiResponse<any> = await this.apisauce.get(uri,);
    const response: ApiResponse<any> = await this.apisauce.get(uri);
    console.log("Payment response", response);
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    try {
      const getPaymentListData = response.data;
      return { kind: "ok", getPaymentList: getPaymentListData, Status: response.status };
    } catch {
      return { kind: "bad-data" };
    }
  }

  async PaymentSearchByNumber(
    authorization: string,
    Paymentrequest: any,
  ): Promise<Types.PaymentResult> {
    const uri = `https://mobileappservices20200924204033.azurewebsites.net/api/Payment/getPayment${authorization}&paymentcode=${Paymentrequest}`;
    //const response: ApiResponse<any> = await this.apisauce.get(uri,);
    const response: ApiResponse<any> = await this.apisauce.get(uri);

    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    try {
      const Payment = response.data;
      console.log(Payment);

      return { kind: "ok", Payment: Payment };
    } catch {
      return { kind: "bad-data" };
    }
  }

  //-------Maturity-------------------------------------

  async getMaturityList(
    authorization: string,
    getListRequest: any,
  ): Promise<Types.GetMaturityListResult> {
    const uri = `https://mobileappservices20200924204033.azurewebsites.net/api/Maturity/getAllMaturity${authorization}&fromdate=${getListRequest.MaturitysByDate.FromDate}&todate=${getListRequest.MaturitysByDate.ToDate}`;
    //const response: ApiResponse<any> = await this.apisauce.get(uri,);
    const response: ApiResponse<any> = await this.apisauce.get(uri);

    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    try {
      const getMaturityListData = response.data;
      return { kind: "ok", getMaturityList: getMaturityListData, Status: response.status };
    } catch {
      return { kind: "bad-data" };
    }
  }

  async getMaturityByForm(
    authorization: string,
    Maturityrequest: any,
  ): Promise<Types.GetMaturityListResult> {
    const uri = `https://mobileappservices20200924204033.azurewebsites.net/api/Maturity/getMaturityByForm${authorization}&formcode=${Maturityrequest}`;
    //const response: ApiResponse<any> = await this.apisauce.get(uri,);
    const response: ApiResponse<any> = await this.apisauce.get(uri);

    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    try {
      const getMaturityListData = response.data;
      return { kind: "ok", getMaturityList: getMaturityListData, Status: response.status };
    } catch {
      return { kind: "bad-data" };
    }
  }

  async MaturitySearchByNumber(
    authorization: string,
    Maturityrequest: any,
  ): Promise<Types.MaturityResult> {
    const uri = `https://mobileappservices20200924204033.azurewebsites.net/api/Maturity/getMaturity${authorization}&maturitycode=${Maturityrequest}`;
    //const response: ApiResponse<any> = await this.apisauce.get(uri,);
    const response: ApiResponse<any> = await this.apisauce.get(uri);
    console.log("Maturity", response);
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    try {
      const Maturity = response.data;
      console.log(Maturity);

      return { kind: "ok", Maturity: Maturity };
    } catch {
      return { kind: "bad-data" };
    }
  }

  //-------MaturitySettlement-------------------------------------

  async getMaturitySettlementList(
    authorization: string,
    getListRequest: any,
  ): Promise<Types.GetMaturitySettlementListResult> {
    const uri = `https://mobileappservices20200924204033.azurewebsites.net/api/MaturitySettlement/getAllMaturitySettlement${authorization}&fromdate=${getListRequest.MaturitySettlementsByDate.FromDate}&todate=${getListRequest.MaturitySettlementsByDate.ToDate}`;
    //const response: ApiResponse<any> = await this.apisauce.get(uri,);
    const response: ApiResponse<any> = await this.apisauce.get(uri);

    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    try {
      const getMaturitySettlementListData = response.data;
      return {
        kind: "ok",
        getMaturitySettlementList: getMaturitySettlementListData,
        Status: response.status,
      };
    } catch {
      return { kind: "bad-data" };
    }
  }

  async getMaturitySettlementByMaturity(
    authorization: string,
    MaturitySettlementrequest: any,
  ): Promise<Types.GetMaturitySettlementListResult> {
    const uri = `https://mobileappservices20200924204033.azurewebsites.net/api/MaturitySettlement/getMaturitySettlementByMaturity${authorization}&maturitycode=${MaturitySettlementrequest}`;
    //const response: ApiResponse<any> = await this.apisauce.get(uri,);
    const response: ApiResponse<any> = await this.apisauce.get(uri);

    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    try {
      const getMaturitySettlementListData = response.data;
      return {
        kind: "ok",
        getMaturitySettlementList: getMaturitySettlementListData,
        Status: response.status,
      };
    } catch {
      return { kind: "bad-data" };
    }
  }

  async getMaturitySettlementByForm(
    authorization: string,
    MaturitySettlementrequest: any,
  ): Promise<Types.GetMaturitySettlementListResult> {
    const uri = `https://mobileappservices20200924204033.azurewebsites.net/api/MaturitySettlement/getMaturitySettlementByForm${authorization}&formcode=${MaturitySettlementrequest}`;
    //const response: ApiResponse<any> = await this.apisauce.get(uri,);
    const response: ApiResponse<any> = await this.apisauce.get(uri);

    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    try {
      const getMaturitySettlementListData = response.data;
      return {
        kind: "ok",
        getMaturitySettlementList: getMaturitySettlementListData,
        Status: response.status,
      };
    } catch {
      return { kind: "bad-data" };
    }
  }

  async MaturitySettlementSearchByNumber(
    authorization: string,
    MaturitySettlementrequest: any,
  ): Promise<Types.MaturitySettlementResult> {
    const uri = `https://mobileappservices20200924204033.azurewebsites.net/api/MaturitySettlement/getMaturitySettlement${authorization}&maturitysettlementcode=${MaturitySettlementrequest}`;
    //const response: ApiResponse<any> = await this.apisauce.get(uri,);
    const response: ApiResponse<any> = await this.apisauce.get(uri);

    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    try {
      const MaturitySettlement = response.data;
      console.log(MaturitySettlement);

      return { kind: "ok", MaturitySettlement: MaturitySettlement };
    } catch {
      return { kind: "bad-data" };
    }
  }

  //---------------Issue---------------------------------------

  async IssueSearchByNumber(
    IssueID: string,
    LoginName: string,
    password: string,
  ): Promise<Types.IssueResult> {
    const uri = `https://mobileappservices20200924204033.azurewebsites.net/api/getIssue/getIssues?issueno=${IssueID}&loginname=${LoginName}&password=${password}`;
    //const response: ApiResponse<any> = await this.apisauce.get(uri,);
    const response: ApiResponse<any> = await this.apisauce.get(uri);

    console.log("single issue", response);

    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    try {
      const issue = response.data;

      return { kind: "ok", Issue: issue };
    } catch {
      return { kind: "bad-data" };
    }
  }

  async saveIssue(IssueRequest: any): Promise<Types.IssueResult> {
    console.log("IssueRequest", IssueRequest.LoginName);
    const uri = `https://mobileappservices20200924204033.azurewebsites.net/api/Issue/New?LoginName=${IssueRequest.LoginName}&formno=${IssueRequest.FormNo}&Type=${IssueRequest.Type}&IssueObject=${IssueRequest.IssueObject}&IssueDesc=${IssueRequest.IssueDesc}`;
    const response: ApiResponse<any> = await this.apisauce.post(uri);

    console.log("issue save", response);
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    try {
      const IssueData = response.data;
      return { kind: "ok", Issue: IssueData };
    } catch {
      return { kind: "bad-data" };
    }
  }

  async DeleteIssue(Issuecode: any): Promise<Types.IssueResult> {
    const response: ApiResponse<any> = await this.apisauce.post(
      `https://mobileappservices20200924204033.azurewebsites.net/api/Issue/DeleteIssue?IssueCode=${Issuecode}`,
    );

    console.log("delete Issue", response);

    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    try {
      const Issue = response.data;
      return { kind: "ok", Issue: Issue };
    } catch {
      return { kind: "bad-data" };
    }
  }

  async getIssueList(LoginName: string, password: string): Promise<Types.GetIssueListResult> {
    const uri = `https://mobileappservices20200924204033.azurewebsites.net/api/getIssue/getIssues?loginname=${LoginName}&password=${password}`;
    //const response: ApiResponse<any> = await this.apisauce.get(uri,);
    const response: ApiResponse<any> = await this.apisauce.get(uri);
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    try {
      const getListData = response.data;
      return { kind: "ok", IssueList: getListData, Status: response.status };
    } catch {
      return { kind: "bad-data" };
    }
  }

  //------Help---------------------------------

  async getHelpList(isbank: string): Promise<Types.HelpResult> {
    const uri = `https://mobileappservices20200924204033.azurewebsites.net/api/getIssue/getHelp?isbank=${isbank}`;
    //const response: ApiResponse<any> = await this.apisauce.get(uri,);
    const response: ApiResponse<any> = await this.apisauce.get(uri);
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    try {
      const getHelpListData = response.data;
      return { kind: "ok", HelpList: getHelpListData, Status: response.status };
    } catch {
      return { kind: "bad-data" };
    }
  }

  //-------ImForm--------------------------------------

  async ImFormSearchByNumber(
    authorization: string,
    imformrequest: any,
  ): Promise<Types.ImFormResult> {
    const uri = `https://mobileappservices20200924204033.azurewebsites.net/api/ImForm/getImForm${authorization}&formno=${imformrequest}`;
    //const response: ApiResponse<any> = await this.apisauce.get(uri,);
    const response: ApiResponse<any> = await this.apisauce.get(uri);

    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    try {
      const imform = response.data;

      return { kind: "ok", ImForm: imform };
    } catch {
      return { kind: "bad-data" };
    }
  }

  async getImList(authorization: string, getListRequest: any): Promise<Types.GetImListResult> {
    const uri = `https://mobileappservices20200924204033.azurewebsites.net/api/ImForm/getAllImForm${authorization}&fromdate=${getListRequest.ImFormsByDate.FromDate}&todate=${getListRequest.ImFormsByDate.ToDate}`;
    //const response: ApiResponse<any> = await this.apisauce.get(uri,);
    const response: ApiResponse<any> = await this.apisauce.get(uri);

    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    try {
      const getImListData = response.data;
      return { kind: "ok", getImList: getImListData, Status: response.status };
    } catch {
      return { kind: "bad-data" };
    }
  }

  async getImFormByOperationList(
    authorization: string,
    operationcode: any,
  ): Promise<Types.GetImListResult> {
    const uri = `https://mobileappservices20200924204033.azurewebsites.net/api/ImForm/getOperationForms${authorization}&operationcode=${operationcode}`;
    //const response: ApiResponse<any> = await this.apisauce.get(uri,);
    const response: ApiResponse<any> = await this.apisauce.get(uri);

    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    try {
      const getImListData = response.data;
      return { kind: "ok", getImList: getImListData, Status: response.status };
    } catch {
      return { kind: "bad-data" };
    }
  }

  async getImFormCommodityList(
    authorization: string,
    imformrequest: any,
  ): Promise<Types.ImFormCommodityResult> {
    const uri = `https://mobileappservices20200924204033.azurewebsites.net/api/ImFormCommodity/getImFormCommodity${authorization}&formno=${imformrequest}`;
    //const response: ApiResponse<any> = await this.apisauce.get(uri,);
    const response: ApiResponse<any> = await this.apisauce.get(uri);
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    try {
      const getCommodityList = response.data;

      return { kind: "ok", ImFormCommodityList: getCommodityList };
    } catch {
      return { kind: "bad-data" };
    }
  }

  //------ExForm-----------------------------

  async ExFormSearchByNumber(
    authorization: string,
    ExFormrequest: any,
  ): Promise<Types.ExFormResult> {
    const uri = `https://mobileappservices20200924204033.azurewebsites.net/api/ExForm/getExform${authorization}&formno=${ExFormrequest}`;
    //const response: ApiResponse<any> = await this.apisauce.get(uri,);
    const response: ApiResponse<any> = await this.apisauce.get(uri);

    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    try {
      const ExForm = response.data;

      return { kind: "ok", ExForm: ExForm };
    } catch {
      return { kind: "bad-data" };
    }
  }

  async getExList(authorization: string, getListRequest: any): Promise<Types.GetExListResult> {
    const uri = `https://mobileappservices20200924204033.azurewebsites.net/api/ExForm/getAllExForm${authorization}&fromdate=${getListRequest.ExFormsByDate.FromDate}&todate=${getListRequest.ExFormsByDate.ToDate}`;

    //const response: ApiResponse<any> = await this.apisauce.get(uri,);
    const response: ApiResponse<any> = await this.apisauce.get(uri);
    console.log(response);
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    try {
      const getExListData = response.data;
      return { kind: "ok", getExList: getExListData, Status: response.status };
    } catch {
      return { kind: "bad-data" };
    }
  }

  async getExFormByContractList(
    authorization: string,
    contractcode: any,
  ): Promise<Types.GetExListResult> {
    const uri = `https://mobileappservices20200924204033.azurewebsites.net/api/ExForm/getContractForms${authorization}&contractcode=${contractcode}`;

    //const response: ApiResponse<any> = await this.apisauce.get(uri,);
    const response: ApiResponse<any> = await this.apisauce.get(uri);
    console.log(response);
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    try {
      const getExListData = response.data;
      return { kind: "ok", getExList: getExListData, Status: response.status };
    } catch {
      return { kind: "bad-data" };
    }
  }

  async getExFormCommodityList(
    authorization: string,
    ExFormrequest: any,
  ): Promise<Types.ExFormCommodityResult> {
    const uri = `https://mobileappservices20200924204033.azurewebsites.net/api/ExFormCommodity/getExFormCommodity${authorization}&formno=${ExFormrequest}`;
    //const response: ApiResponse<any> = await this.apisauce.get(uri,);
    const response: ApiResponse<any> = await this.apisauce.get(uri);
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    try {
      const getCommodityList = response.data;

      return { kind: "ok", ExFormCommodityList: getCommodityList };
    } catch {
      return { kind: "bad-data" };
    }
  }

  //------Contract Request--------------------------------

  async ContractRequestSearchByNumber(
    authorization: string,
    ContractRequest: any,
  ): Promise<Types.ContractRequestResult> {
    const uri = `https://mobileappservices20200924204033.azurewebsites.net/api/ContractRequest/getContractRequest${authorization}&contractrequestcode=${ContractRequest}`;
    //const response: ApiResponse<any> = await this.apisauce.get(uri,);
    const response: ApiResponse<any> = await this.apisauce.get(uri);
    console.log("response", response);
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    try {
      const ContractRequest = response.data;
      console.log(ContractRequest);

      return { kind: "ok", ContractRequest: ContractRequest };
    } catch {
      return { kind: "bad-data" };
    }
  }

  async getContractRequestList(
    authorization: string,
    getListRequest: any,
  ): Promise<Types.GetContractRequestListResult> {
    const uri = `https://mobileappservices20200924204033.azurewebsites.net/api/ContractRequest/getAllContractRequest${authorization}&fromdate=${getListRequest.ContractRequestsByDate.FromDate}&todate=${getListRequest.ContractRequestsByDate.ToDate}`;
    //const response: ApiResponse<any> = await this.apisauce.get(uri,);
    const response: ApiResponse<any> = await this.apisauce.get(uri);

    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    try {
      const getContractRequestListData = response.data;
      return {
        kind: "ok",
        getContractRequestList: getContractRequestListData,
        Status: response.status,
      };
    } catch {
      return { kind: "bad-data" };
    }
  }

  async getContractRequestCommodityList(
    authorization: string,
    ContractRequestrequest: any,
  ): Promise<Types.ContractRequestCommodityResult> {
    const uri = `https://mobileappservices20200924204033.azurewebsites.net/api/ContractRequestCommodity/getContractRequestCommodityByCode${authorization}&contractrequestcode=${ContractRequestrequest}`;
    //const response: ApiResponse<any> = await this.apisauce.get(uri,);
    const response: ApiResponse<any> = await this.apisauce.get(uri);
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    try {
      const getCommodityList = response.data;

      return { kind: "ok", ContractRequestCommodityResultList: getCommodityList };
    } catch {
      return { kind: "bad-data" };
    }
  }

  async getContractRequestPaymentMethodList(
    authorization: string,
    ContractRequestrequest: any,
  ): Promise<Types.ContractRequestPaymentMethodResult> {
    const uri = `https://mobileappservices20200924204033.azurewebsites.net/api/ContractRequestPaymentMethod/getContractRequestPaymentMethod${authorization}&contractrequestcode=${ContractRequestrequest}`;
    //const response: ApiResponse<any> = await this.apisauce.get(uri,);
    const response: ApiResponse<any> = await this.apisauce.get(uri);
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    try {
      const getPaymentMethodList = response.data;

      return { kind: "ok", ContractRequestPaymentMethodResultList: getPaymentMethodList };
    } catch {
      return { kind: "bad-data" };
    }
  }

  async NewContractRequest(
    contractobj: any,
    contractcommobj: any,
    contractPMobj: any,
  ): Promise<Types.ContractRequestResult> {
    const jsonrequest =
      "{contract:" +
      contractobj +
      ",contractCommodityDetails:" +
      contractcommobj +
      ",contractPaymentMethodDetails:" +
      contractPMobj +
      "}";
    console.log("jsonrequest", jsonrequest);
    const response: ApiResponse<any> = await this.apisauce.post(
      "https://mobileappservices20200924204033.azurewebsites.net/api/ContractRequest/NewContractRequest//",
      jsonrequest,
    );
    console.log("response", response);
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    try {
      const contractpost = response.data;
      return { kind: "ok", ContractRequest: contractpost };
    } catch {
      return { kind: "bad-data" };
    }
  }

  async DeleteContractRequest(contractrequestcode: any): Promise<Types.ContractRequestResult> {
    const response: ApiResponse<any> = await this.apisauce.post(
      `https://mobileappservices20200924204033.azurewebsites.net/api/ContractRequest/DeleteContract?contractrequestcode=${contractrequestcode}`,
    );
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    try {
      const contractpost = response.data;
      return { kind: "ok", ContractRequest: contractpost };
    } catch {
      return { kind: "bad-data" };
    }
  }

  async UpdateContractRequest(
    contractobj: any,
    contractcommobj: any,
    contractPMobj: any,
  ): Promise<Types.ContractRequestResult> {
    const jsonrequest =
      "{contract:" +
      contractobj +
      ",contractCommodityDetails:" +
      contractcommobj +
      ",contractPaymentMethodDetails:" +
      contractPMobj +
      "}";
    console.log("jsonrequest", jsonrequest);
    const response: ApiResponse<any> = await this.apisauce.post(
      "https://mobileappservices20200924204033.azurewebsites.net/api/ContractRequest/UpdateContract/",
      jsonrequest,
    );
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    try {
      const contractpost = response.data;
      return { kind: "ok", ContractRequest: contractpost };
    } catch {
      return { kind: "bad-data" };
    }
  }

  //------Contract --------------------------------

  async ContractSearchByNumber(
    authorization: string,
    Contract: any,
  ): Promise<Types.ContractResult> {
    const uri = `https://mobileappservices20200924204033.azurewebsites.net/api/Contract/getContract${authorization}&contractcode=${Contract}`;
    //const response: ApiResponse<any> = await this.apisauce.get(uri,);
    const response: ApiResponse<any> = await this.apisauce.get(uri);
    console.log("response", response);
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    try {
      const Contract = response.data;
      console.log(Contract);

      return { kind: "ok", Contract: Contract };
    } catch {
      return { kind: "bad-data" };
    }
  }

  async getContractList(authorization: string, getList: any): Promise<Types.GetContractListResult> {
    const uri = `https://mobileappservices20200924204033.azurewebsites.net/api/Contract/getAllContract${authorization}&fromdate=${getList.ContractsByDate.FromDate}&todate=${getList.ContractsByDate.ToDate}`;
    //const response: ApiResponse<any> = await this.apisauce.get(uri,);
    const response: ApiResponse<any> = await this.apisauce.get(uri);

    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    try {
      const getContractListData = response.data;
      return { kind: "ok", getContractList: getContractListData, Status: response.status };
    } catch {
      return { kind: "bad-data" };
    }
  }

  async getContractCommodityList(
    authorization: string,
    Contract: any,
  ): Promise<Types.ContractCommodityResult> {
    const uri = `https://mobileappservices20200924204033.azurewebsites.net/api/ContractCommodity/getContractCommodityByCode${authorization}&contractcode=${Contract}`;
    //const response: ApiResponse<any> = await this.apisauce.get(uri,);
    const response: ApiResponse<any> = await this.apisauce.get(uri);
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    try {
      const getCommodityList = response.data;

      return { kind: "ok", ContractCommodityResultList: getCommodityList };
    } catch {
      return { kind: "bad-data" };
    }
  }

  async getContractPaymentMethodList(
    authorization: string,
    Contract: any,
  ): Promise<Types.ContractPaymentMethodResult> {
    const uri = `https://mobileappservices20200924204033.azurewebsites.net/api/ContractPaymentMethod/getContractPaymentMethodByCode${authorization}&contractcode=${Contract}`;
    //const response: ApiResponse<any> = await this.apisauce.get(uri,);
    const response: ApiResponse<any> = await this.apisauce.get(uri);
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    try {
      const getPaymentMethodList = response.data;

      return { kind: "ok", ContractPaymentMethodResultList: getPaymentMethodList };
    } catch {
      return { kind: "bad-data" };
    }
  }

  //----------Upload Files-------------------------------------------------------------------------

  async UploadFile(
    code: any,
    relatedobject: any,
    documentdesc: any,
    loginname: any,
    file: any,
  ): Promise<Types.DocumentResult> {
    const headers = {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    };
    const response: ApiResponse<any> = await this.apisauce.post(
      `https://mobileappservices20200924204033.azurewebsites.net/api/Document/Upload?code=${code}&relatedobject=${relatedobject}&documentdesc=${documentdesc}&loginname=${loginname}`,
      file,
      { headers },
    );

    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    try {
      const documentposted = response.data;
      return { kind: "ok", Document: documentposted, Status: response.status };
    } catch {
      return { kind: "bad-data" };
    }
  }

  // ---------License Request-------------------

  async UpdateLicenseRequest(Licenseobj: any, Licensecommobj: any): Promise<Types.LicenseResult> {
    const jsonrequest =
      "{License:" + Licenseobj + ",LicenseCommodityDetails:" + Licensecommobj + "}";
    console.log("jsonrequest", jsonrequest);
    const response: ApiResponse<any> = await this.apisauce.post(
      "https://mobileappservices20200924204033.azurewebsites.net/api/LicenseRequest/UpdateLicense/",
      jsonrequest,
    );
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    try {
      const Licensepost = response.data;
      return { kind: "ok", License: Licensepost };
    } catch {
      return { kind: "bad-data" };
    }
  }

  async LicenseRequestSearchByNumber(
    authorization: string,
    LicenseRequest: any,
  ): Promise<Types.LicenseRequestResult> {
    const uri = `https://mobileappservices20200924204033.azurewebsites.net/api/LicenseRequest/getLicenseRequest${authorization}&Licenserequestcode=${LicenseRequest}`;
    //const response: ApiResponse<any> = await this.apisauce.get(uri,);
    const response: ApiResponse<any> = await this.apisauce.get(uri);

    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    try {
      const LicenseRequest = response.data;
      console.log(LicenseRequest);

      return { kind: "ok", LicenseRequest: LicenseRequest };
    } catch {
      return { kind: "bad-data" };
    }
  }

  async getLicenseRequestList(
    authorization: string,
    getListRequest: any,
  ): Promise<Types.GetLicenseRequestListResult> {
    const uri = `https://mobileappservices20200924204033.azurewebsites.net/api/LicenseRequest/getAllLicenseRequest${authorization}&fromdate=${getListRequest.LicenseRequestsByDate.FromDate}&todate=${getListRequest.LicenseRequestsByDate.ToDate}`;
    //const response: ApiResponse<any> = await this.apisauce.get(uri,);
    const response: ApiResponse<any> = await this.apisauce.get(uri);
    console.log("getLicenseRequestList", response);
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    try {
      const getLicenseRequestListData = response.data;
      return {
        kind: "ok",
        getLicenseRequestList: getLicenseRequestListData,
        Status: response.status,
      };
    } catch {
      return { kind: "bad-data" };
    }
  }

  async getLicenseRequestCommodityList(
    authorization: string,
    LicenseRequestrequest: any,
  ): Promise<Types.LicenseRequestCommodityResult> {
    const uri = `https://mobileappservices20200924204033.azurewebsites.net/api/LicenseRequestCommodity/getLicenseRequestCommodityByCode${authorization}&licenserequestcode=${LicenseRequestrequest}`;
    //const response: ApiResponse<any> = await this.apisauce.get(uri,);
    const response: ApiResponse<any> = await this.apisauce.get(uri);
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    try {
      const getCommodityList = response.data;

      return { kind: "ok", LicenseRequestCommodityResultList: getCommodityList };
    } catch {
      return { kind: "bad-data" };
    }
  }

  async NewLicenseRequest(
    Licenseobj: any,
    Licensecommobj: any,
  ): Promise<Types.LicenseRequestResult> {
    const jsonrequest =
      "{License:" + Licenseobj + ",LicenseCommodityDetails:" + Licensecommobj + "}";
    console.log("jsonrequest", jsonrequest);
    const response: ApiResponse<any> = await this.apisauce.post(
      "https://mobileappservices20200924204033.azurewebsites.net/api/LicenseRequest/NewLicense/",
      jsonrequest,
    );
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    try {
      const Licensepost = response.data;
      return { kind: "ok", LicenseRequest: Licensepost };
    } catch {
      return { kind: "bad-data" };
    }
  }

  async DeleteLicenseRequest(Licenserequestcode: any): Promise<Types.LicenseRequestResult> {
    const response: ApiResponse<any> = await this.apisauce.post(
      `https://mobileappservices20200924204033.azurewebsites.net/api/LicenseRequest/DeleteLicense?Licenserequestcode=${Licenserequestcode}`,
    );
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    try {
      const Licensepost = response.data;
      return { kind: "ok", LicenseRequest: Licensepost };
    } catch {
      return { kind: "bad-data" };
    }
  }

  // ---------License -------------------

  async LicenseSearchByNumber(authorization: string, License: any): Promise<Types.LicenseResult> {
    const uri = `https://mobileappservices20200924204033.azurewebsites.net/api/License/getLicense${authorization}&licensecode=${License}`;
    //const response: ApiResponse<any> = await this.apisauce.get(uri,);
    const response: ApiResponse<any> = await this.apisauce.get(uri);

    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    try {
      const License = response.data;
      console.log(License);

      return { kind: "ok", License: License };
    } catch {
      return { kind: "bad-data" };
    }
  }

  async getLicenseList(authorization: string, getList: any): Promise<Types.GetLicenseListResult> {
    const uri = `https://mobileappservices20200924204033.azurewebsites.net/api/License/getAllLicense${authorization}&fromdate=${getList.LicensesByDate.FromDate}&todate=${getList.LicensesByDate.ToDate}`;
    //const response: ApiResponse<any> = await this.apisauce.get(uri,);
    const response: ApiResponse<any> = await this.apisauce.get(uri);
    console.log("getLicenseList", response);
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    try {
      const getLicenseListData = response.data;
      return { kind: "ok", getLicenseList: getLicenseListData, Status: response.status };
    } catch {
      return { kind: "bad-data" };
    }
  }

  async getLicenseCommodityList(
    authorization: string,
    License: any,
  ): Promise<Types.LicenseCommodityResult> {
    const uri = `https://mobileappservices20200924204033.azurewebsites.net/api/LicenseCommodity/getLicenseCommodityByCode${authorization}&licensecode=${License}`;
    //const response: ApiResponse<any> = await this.apisauce.get(uri,);
    const response: ApiResponse<any> = await this.apisauce.get(uri);
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    try {
      const getCommodityList = response.data;

      return { kind: "ok", LicenseCommodityResultList: getCommodityList };
    } catch {
      return { kind: "bad-data" };
    }
  }

  //-----Operation Request----

  async OperationRequestSearchByNumber(
    authorization: string,
    OperationRequest: any,
  ): Promise<Types.OperationRequestResult> {
    const uri = `https://mobileappservices20200924204033.azurewebsites.net/api/OperationRequest/getOperationRequest${authorization}&operationrequestcode=${OperationRequest}`;
    //const response: ApiResponse<any> = await this.apisauce.get(uri,);
    const response: ApiResponse<any> = await this.apisauce.get(uri);

    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    try {
      const OperationRequest = response.data;

      return { kind: "ok", OperationRequest: OperationRequest };
    } catch {
      return { kind: "bad-data" };
    }
  }

  async getOperationRequestList(
    authorization: string,
    getListRequest: any,
  ): Promise<Types.GetOperationRequestListResult> {
    const uri = `https://mobileappservices20200924204033.azurewebsites.net/api/OperationRequest/getAllOperationRequest${authorization}&fromdate=${getListRequest.OperationRequestsByDate.FromDate}&todate=${getListRequest.OperationRequestsByDate.ToDate}`;
    //const response: ApiResponse<any> = await this.apisauce.get(uri,);
    const response: ApiResponse<any> = await this.apisauce.get(uri);

    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    try {
      const getOperationRequestListData = response.data;
      return {
        kind: "ok",
        getOperationRequestList: getOperationRequestListData,
        Status: response.status,
      };
    } catch {
      return { kind: "bad-data" };
    }
  }

  async getOperationRequestCommodityList(
    authorization: string,
    OperationRequestrequest: any,
  ): Promise<Types.OperationRequestCommodityResult> {
    const uri = `https://mobileappservices20200924204033.azurewebsites.net/api/OperationRequestCommodity/getOperationRequestCommodity${authorization}&operationrequestcode=${OperationRequestrequest}`;
    //const response: ApiResponse<any> = await this.apisauce.get(uri,);
    const response: ApiResponse<any> = await this.apisauce.get(uri);
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    try {
      const getCommodityList = response.data;

      return { kind: "ok", OperationRequestCommodityResultList: getCommodityList };
    } catch {
      return { kind: "bad-data" };
    }
  }

  async getOperationRequestPaymentMethodList(
    authorization: string,
    OperationRequestrequest: any,
  ): Promise<Types.OperationRequestPaymentMethodResult> {
    const uri = `https://mobileappservices20200924204033.azurewebsites.net/api/OperationRequestPaymentMethod/getOperationRequestPaymentMethod${authorization}&operationrequestcode=${OperationRequestrequest}`;

    //const response: ApiResponse<any> = await this.apisauce.get(uri,);
    const response: ApiResponse<any> = await this.apisauce.get(uri);

    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    try {
      const getPaymentMethodList = response.data;

      return { kind: "ok", OperationRequestPaymentMethodResultList: getPaymentMethodList };
    } catch {
      return { kind: "bad-data" };
    }
  }

  async NewOperationRequest(
    operationobj: any,
    operationcommobj: any,
    operationPMobj: any,
  ): Promise<Types.OperationResult> {
    const jsonrequest =
      "{operation:" +
      operationobj +
      ",operationCommodityDetails:" +
      operationcommobj +
      ",operationPaymentMethodDetails:" +
      operationPMobj +
      "}";
    console.log("operation jsonrequest", jsonrequest);
    const response: ApiResponse<any> = await this.apisauce.post(
      "https://mobileappservices20200924204033.azurewebsites.net/api/OperationRequest/NewOperation/",
      jsonrequest,
    );

    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    try {
      const operationpost = response.data;
      return { kind: "ok", Operation: operationpost };
    } catch {
      return { kind: "bad-data" };
    }
  }

  async UpdateOperationRequest(
    operationobj: any,
    operationcommobj: any,
    operationPMobj: any,
  ): Promise<Types.OperationResult> {
    const jsonrequest =
      "{operation:" +
      operationobj +
      ",operationCommodityDetails:" +
      operationcommobj +
      ",operationPaymentMethodDetails:" +
      operationPMobj +
      "}";
    console.log("operation jsonrequest", jsonrequest);

    const response: ApiResponse<any> = await this.apisauce.post(
      "https://mobileappservices20200924204033.azurewebsites.net/api/OperationRequest/UpdateOperation/",
      jsonrequest,
    );

    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    try {
      const operationpost = response.data;
      return { kind: "ok", Operation: operationpost };
    } catch {
      return { kind: "bad-data" };
    }
  }

  async DeleteOperationRequest(Operationrequestcode: any): Promise<Types.OperationResult> {
    const response: ApiResponse<any> = await this.apisauce.post(
      `https://mobileappservices20200924204033.azurewebsites.net/api/OperationRequest/DeleteOperation?operationrequestcode=${Operationrequestcode}`,
    );
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    try {
      const Operationpost = response.data;
      return { kind: "ok", Operation: Operationpost };
    } catch {
      return { kind: "bad-data" };
    }
  }

  //-----Operation ----

  async OperationSearchByNumber(
    authorization: string,
    Operation: any,
  ): Promise<Types.OperationResult> {
    const uri = `https://mobileappservices20200924204033.azurewebsites.net/api/Operation/getOperation${authorization}&operationcode=${Operation}`;
    //const response: ApiResponse<any> = await this.apisauce.get(uri,);
    const response: ApiResponse<any> = await this.apisauce.get(uri);

    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    try {
      const Operation = response.data;

      return { kind: "ok", Operation: Operation };
    } catch {
      return { kind: "bad-data" };
    }
  }

  async getOperationList(
    authorization: string,
    getList: any,
  ): Promise<Types.GetOperationListResult> {
    const uri = `https://mobileappservices20200924204033.azurewebsites.net/api/Operation/getAllOperation${authorization}&fromdate=${getList.OperationsByDate.FromDate}&todate=${getList.OperationsByDate.ToDate}`;
    //const response: ApiResponse<any> = await this.apisauce.get(uri,);
    const response: ApiResponse<any> = await this.apisauce.get(uri);

    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    try {
      const getOperationListData = response.data;
      return { kind: "ok", getOperationList: getOperationListData, Status: response.status };
    } catch {
      return { kind: "bad-data" };
    }
  }

  async getOperationCommodityList(
    authorization: string,
    Operation: any,
  ): Promise<Types.OperationCommodityResult> {
    const uri = `https://mobileappservices20200924204033.azurewebsites.net/api/OperationCommodity/getOperationCommodity${authorization}&operationcode=${Operation}`;
    //const response: ApiResponse<any> = await this.apisauce.get(uri,);
    const response: ApiResponse<any> = await this.apisauce.get(uri);
    console.log(response);
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    try {
      const getCommodityList = response.data;

      return { kind: "ok", OperationCommodityResultList: getCommodityList };
    } catch {
      return { kind: "bad-data" };
    }
  }

  async getOperationPaymentMethodList(
    authorization: string,
    Operation: any,
  ): Promise<Types.OperationPaymentMethodResult> {
    const uri = `https://mobileappservices20200924204033.azurewebsites.net/api/OperationPaymentMethod/getOperationPaymentMethodByCode${authorization}&operationcode=${Operation}`;

    //const response: ApiResponse<any> = await this.apisauce.get(uri,);
    const response: ApiResponse<any> = await this.apisauce.get(uri);

    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    try {
      const getPaymentMethodList = response.data;

      return { kind: "ok", OperationPaymentMethodResultList: getPaymentMethodList };
    } catch {
      return { kind: "bad-data" };
    }
  }

  //-----OperationTransfer ----

  async OperationTransferSearchByNumber(
    authorization: string,
    OperationTransfer: any,
  ): Promise<Types.OperationTransferResult> {
    const uri = `https://mobileappservices20200924204033.azurewebsites.net/api/OperationTransfer/getOperationTransfer${authorization}&transfercode=${OperationTransfer}`;
    //const response: ApiResponse<any> = await this.apisauce.get(uri,);
    const response: ApiResponse<any> = await this.apisauce.get(uri);

    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    try {
      const OperationTransfer = response.data;

      return { kind: "ok", OperationTransfer: OperationTransfer };
    } catch {
      return { kind: "bad-data" };
    }
  }

  async getOperationTransferList(
    authorization: string,
    getList: any,
  ): Promise<Types.GetOperationTransferListResult> {
    const uri = `https://mobileappservices20200924204033.azurewebsites.net/api/OperationTransfer/getAllOperationTransfer${authorization}&fromdate=${getList.OperationTransfersByDate.FromDate}&todate=${getList.OperationTransfersByDate.ToDate}`;
    //const response: ApiResponse<any> = await this.apisauce.get(uri,);
    const response: ApiResponse<any> = await this.apisauce.get(uri);

    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    try {
      const getOperationTransferListData = response.data;
      return {
        kind: "ok",
        getOperationTransferList: getOperationTransferListData,
        Status: response.status,
      };
    } catch {
      return { kind: "bad-data" };
    }
  }

  async getOperationTransferByOperation(
    authorization: string,
    OperationTransfer: any,
  ): Promise<Types.GetOperationTransferListResult> {
    const uri = `https://mobileappservices20200924204033.azurewebsites.net/api/OperationTransfer/getOperationTransferByOperation${authorization}&operationcode=${OperationTransfer}`;
    //const response: ApiResponse<any> = await this.apisauce.get(uri,);
    const response: ApiResponse<any> = await this.apisauce.get(uri);

    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }
    try {
      const getOperationTransferListData = response.data;
      return {
        kind: "ok",
        getOperationTransferList: getOperationTransferListData,
        Status: response.status,
      };
    } catch {
      return { kind: "bad-data" };
    }
  }
}
