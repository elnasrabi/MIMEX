import { flow, Instance, SnapshotOut, types } from "mobx-state-tree";
import { omit } from "ramda";
import { Api } from "../../services/api";
import { UploadAPI } from "../../services/api/Upload-api";
import { showAlert } from "../../utils/utils";
// const parseString = require('react-native-xml2js').parseString
const parseString = require("react-native-xml2js").parseString;

/**
 * Model description here for TypeScript hints.
 */
const api = new Api();
api.setup();

const uploadapi = new UploadAPI();
uploadapi.setup();
/**
 * Model description here for TypeScript hints.
 */
export const ContractRequestModel = types
  .model("ContractRequestStore")
  .props({
    isButtonLoading: false,
    isLoading: false,
    hasError: false,
    isEmptyList: true,
    isContractSaved: true,
    isDocumentUploaded: true,
    isUploadedCodeMatched: true,
    isContractDeleted: true,
    isContractEditable: types.optional(types.frozen(), 1),
    DocumentCode: types.optional(types.frozen(), 0),
    DocumentType: types.optional(types.frozen(), 1),
    ContractRequestListData: types.optional(types.frozen(), []),
    ContractRequestList: types.optional(types.frozen(), []),
    getCommodityListData: types.optional(types.frozen(), []),
    getPaymentMethodListData: types.optional(types.frozen(), []),
    ContractRequestDetail: types.optional(types.frozen(), {}),
    ContractRequestCommodityDetail: types.optional(types.frozen(), {}),
    ContractRequestPaymentMethodDetail: types.optional(types.frozen(), {}),
    ContractObj: types.optional(types.frozen(), {}),
    ContractCommodityObj: types.optional(types.frozen(), []),
    UpdateContractObj: types.optional(types.frozen(), {}),
    UpdateContractCommodityObj: types.optional(types.frozen(), []),
    fromHome: false,
    sync: false,
    responseSuccess: types.optional(types.boolean, false),
    responseHelpSuccess: types.optional(types.boolean, false),
    getListData: types.optional(types.frozen(), []),
    getHelpListData: types.optional(types.frozen(), []),
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    ContractSearch: flow(function* ContractSearch(authorization: string, Contractrequestcode: any) {
      self.isButtonLoading = true;
      self.responseSuccess = false;

      try {
        const data = yield api.ContractRequestSearchByNumber(authorization, Contractrequestcode);

        if (data.kind === "ok") {
          parseString(data.ContractRequest, { trim: true }, function(_error, result) {
            let response = result.ArrayOfContractRequestDTO.ContractRequestDTO;

            if (response === "") {
              self.ContractRequestList = [];
              self.responseSuccess = false;
              showAlert("common.noData");
            } else {
              self.ContractRequestList = response;
              self.responseSuccess = true;
              self.isContractEditable = response.IsTraderEditable[0];
            }
          });
        } else {
          self.responseSuccess = false;
          self.ContractRequestList = [];
          showAlert("common.noData");
        }
        self.isButtonLoading = false;
      } catch (erro) {
        //showAlert("common.generalerror");
      }
    }),
    getContractRequestList: flow(function* getContractRequestList(
      authorization: any,
      getlistRequest: any,
    ) {
      self.isLoading = true;
      self.responseSuccess = true;
      try {
        const data = yield api.getContractRequestList(authorization, getlistRequest);
        if (data.kind === "ok") {
          parseString(data.getContractRequestList, { trim: true }, function(_error, result) {
            let response = result.ArrayOfContractRequestDTO.ContractRequestDTO;
            if (response === "") {
              self.getListData = [];
              self.responseSuccess = false;
            } else {
              self.ContractRequestListData = response;
              self.responseSuccess = true;
            }
          });
        } else {
          showAlert("common.noData");
        }
      } catch (erro) {
        //showAlert("common.generalerror");
      }
      self.isLoading = false;
    }),
    getContractRequestCommodityList: flow(function* getContractRequestCommodityList(
      authorization: string,
      getComListRequest: any,
    ) {
      self.isLoading = true;
      try {
        const data = yield api.getContractRequestCommodityList(authorization, getComListRequest);

        if (data.kind === "ok") {
          parseString(data.ContractRequestCommodityResultList, { trim: true }, function(
            _error,
            result,
          ) {
            let response = result.ArrayOfContractRequestCommodityDTO.ContractRequestCommodityDTO;

            if (response === "") {
              self.getCommodityListData = [];
              self.responseSuccess = false;
            } else {
              self.getCommodityListData = response;
              self.responseSuccess = true;
            }
          });
        } else {
          showAlert("ContractRequestDetail.nocommdata");
        }
      } catch (erro) {
        //showAlert("common.generalerror");
      }
      self.isLoading = false;
    }),
    getContractRequestPaymentMethodList: flow(function* getContractRequestPaymentMethodList(
      authorization: string,
      getComListRequest: any,
    ) {
      self.isLoading = true;
      self.responseSuccess = true;
      try {
        const data = yield api.getContractRequestPaymentMethodList(
          authorization,
          getComListRequest,
        );

        if (data.kind === "ok") {
          parseString(data.ContractRequestPaymentMethodResultList, { trim: true }, function(
            _error,
            result,
          ) {
            let response =
              result.ArrayOfContractRequestPaymentMethodDTO.ContractRequestPaymentMethodDTO;

            if (response === "") {
              self.getPaymentMethodListData = [];
              self.responseSuccess = false;
            } else {
              self.getPaymentMethodListData = response;
              self.responseSuccess = true;
            }
          });
        } else {
          showAlert("ContractRequestDetail.nocommdata");
        }
      } catch (erro) {
        //showAlert("common.generalerror");
      }
      self.isLoading = false;
    }),
    refreshContractRequestList() {
      self.ContractRequestListData = [];
    },
    refreshCommodityList() {
      self.getCommodityListData = [];
    },
    refreshPaymentMethodList() {
      self.getPaymentMethodListData = [];
    },
    refreshContractRequest() {
      self.ContractRequestList = [];
    },

    NewContractRequest: flow(function* NewContractRequest(
      contractobj: any,
      contractcommobj: any,
      contractPMobj: any,
    ) {
      self.isButtonLoading = true;
      self.isContractSaved = true;

      try {
        const data = yield api.NewContractRequest(contractobj, contractcommobj, contractPMobj);

        if (data.kind === "ok") {
          self.isContractSaved = true;
        } else {
          showAlert("common.somethingWrong");
          self.isContractSaved = false;
        }
        self.isButtonLoading = false;
      } catch (erro) {
        // console.tron.log('erro', erro)
        self.isButtonLoading = false;
      }
    }),

    UploadDocument: flow(function* UploadDocument(
      code: any,
      relatedobject: any,
      documentdesc: any,
      loginname: any,
      fileobj: any,
    ) {
      self.isButtonLoading = true;
      self.isDocumentUploaded = true;
      self.isDocumentUploaded = true;

      try {
        const data = yield uploadapi.UploadFile(
          code,
          relatedobject,
          documentdesc,
          loginname,
          fileobj,
        );

        if (data.Status === 200) {
          self.isDocumentUploaded = true;
          self.isUploadedCodeMatched = true;
        } else if (data.kind === "forbidden") {
          showAlert("Document.notmatched");
          self.isDocumentUploaded = false;
        } else {
          showAlert("common.somethingWrong");
          self.isDocumentUploaded = false;
        }
        self.isButtonLoading = false;
      } catch (erro) {
        // console.tron.log('erro', erro)
        self.isButtonLoading = false;
      }
    }),

    DeleteContractRequest: flow(function* DeleteContractRequest(contractrequestcode: any) {
      self.isButtonLoading = true;
      self.isContractDeleted = true;

      try {
        const data = yield api.DeleteContractRequest(contractrequestcode);

        if (data.kind === "ok") {
          self.isContractDeleted = true;
        } else {
          showAlert("common.somethingWrong");
          self.isContractDeleted = false;
        }
        self.isButtonLoading = false;
      } catch (erro) {
        // console.tron.log('erro', erro)
        self.isButtonLoading = false;
      }
    }),

    UpdateContractRequest: flow(function* UpdateContractRequest(
      contractobj: any,
      contractcommobj: any,
      contractPMobj: any,
    ) {
      self.isButtonLoading = true;
      self.isContractSaved = true;

      try {
        const data = yield api.UpdateContractRequest(contractobj, contractcommobj, contractPMobj);

        if (data.kind === "ok") {
          self.isContractSaved = true;
        } else {
          showAlert("common.somethingWrong");
          self.isContractSaved = false;
        }
        self.isButtonLoading = false;
      } catch (erro) {
        // console.tron.log('erro', erro)
        self.isButtonLoading = false;
      }
    }),

    setContractDetail(detail) {
      self.ContractRequestDetail = detail;
    },
    setContractRequestCommodityDetail(detail) {
      self.ContractRequestCommodityDetail = detail;
    },
    setContractRequestPaymentMethodDetail(detail) {
      self.ContractRequestCommodityDetail = detail;
    },
    setContractObject(detail) {
      self.ContractObj = detail;
    },
    setContractCommodityObj(detail) {
      self.ContractCommodityObj = detail;
    },
    setUpdateContractObject(detail) {
      self.UpdateContractObj = detail;
    },
    setUpdateContractCommodityObj(detail) {
      self.UpdateContractCommodityObj = detail;
    },
    setContractFalse() {
      self.isContractSaved = false;
    },
    startSyncing() {
      self.sync = true;
    },
    stopSyncing() {
      self.sync = false;
    },
    SetDocumentCode(code) {
      self.DocumentCode = code;
    },
    SetDocumentType(type) {
      self.DocumentType = type;
    },

    goingFromHome(value) {
      self.fromHome = value;
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

  /**
   * Un-comment the following to omit model attributes from your snapshots (and from async storage).
   * Useful for sensitive data like passwords, or transitive state like whether a modal is open.
   * Note that you'll need to import `omit` from ramda, which is already included in the project!
   */
  .postProcessSnapshot(
    omit([
      "signedSaved",
      "isButtonLoading",
      "hasError",
      "isEmptyList",
      "ContractList",
      "ContractDetail",
      "isContractSaved",
      "fromHome",
    ]),
  );

type ContractRequestStoreType = Instance<typeof ContractRequestModel>;
export interface ContractRequestStore extends ContractRequestStoreType {}
type ContractRequestStoreSnapshotType = SnapshotOut<typeof ContractRequestModel>;
export interface ContractRequestStoreSnapshot extends ContractRequestStoreSnapshotType {}
