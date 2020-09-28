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
export const ContractModel = types
  .model("ContractStore")
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
    ContractListData: types.optional(types.frozen(), []),
    ContractList: types.optional(types.frozen(), []),
    getCommodityListData: types.optional(types.frozen(), []),
    getPaymentMethodListData: types.optional(types.frozen(), []),
    ContractDetail: types.optional(types.frozen(), {}),
    ContractCommodityDetail: types.optional(types.frozen(), {}),
    ContractPaymentMethodDetail: types.optional(types.frozen(), {}),
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
    ContractSearch: flow(function* ContractSearch(authorization: string, Contractcode: any) {
      self.isButtonLoading = true;
      self.responseSuccess = false;

      try {
        const data = yield api.ContractSearchByNumber(authorization, Contractcode);

        if (data.kind === "ok") {
          parseString(data.Contract, { trim: true }, function(_error, result) {
            let response = result.ArrayOfContractDTO.ContractDTO;

            if (response === "") {
              self.ContractList = [];
              self.responseSuccess = false;
              showAlert("common.noData");
            } else {
              self.ContractList = response;
              self.responseSuccess = true;
              self.isContractEditable = response.IsTraderEditable[0];
            }
          });
        } else {
          self.responseSuccess = false;
          self.ContractList = [];
          showAlert("common.noData");
        }
        self.isButtonLoading = false;
      } catch (erro) {
        //showAlert("common.generalerror");
      }
    }),
    getContractList: flow(function* getContractList(authorization: any, getlist: any) {
      self.isLoading = true;
      self.responseSuccess = true;
      try {
        const data = yield api.getContractList(authorization, getlist);

        if (data.kind === "ok") {
          parseString(data.getContractList, { trim: true }, function(_error, result) {
            let response = result.ArrayOfContractDTO.ContractDTO;
            if (response === "") {
              self.getListData = [];
              self.responseSuccess = false;
            } else {
              self.ContractListData = response;
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
    getContractCommodityList: flow(function* getContractCommodityList(
      authorization: string,
      getComList: any,
    ) {
      self.isLoading = true;
      try {
        const data = yield api.getContractCommodityList(authorization, getComList);

        if (data.kind === "ok") {
          parseString(data.ContractCommodityResultList, { trim: true }, function(_error, result) {
            let response = result.ArrayOfContractCommodityDTO.ContractCommodityDTO;

            if (response === "") {
              self.getCommodityListData = [];
              self.responseSuccess = false;
            } else {
              self.getCommodityListData = response;
              self.responseSuccess = true;
            }
          });
        } else {
          showAlert("ContractDetail.nocommdata");
        }
      } catch (erro) {
        //showAlert("common.generalerror");
      }
      self.isLoading = false;
    }),
    getContractPaymentMethodList: flow(function* getContractPaymentMethodList(
      authorization: string,
      getComList: any,
    ) {
      self.isLoading = true;
      self.responseSuccess = true;
      try {
        const data = yield api.getContractPaymentMethodList(authorization, getComList);

        if (data.kind === "ok") {
          parseString(data.ContractPaymentMethodResultList, { trim: true }, function(
            _error,
            result,
          ) {
            let response = result.ArrayOfContractPaymentMethodDTO.ContractPaymentMethodDTO;

            if (response === "") {
              self.getPaymentMethodListData = [];
              self.responseSuccess = false;
            } else {
              self.getPaymentMethodListData = response;
              self.responseSuccess = true;
            }
          });
        } else {
          showAlert("ContractDetail.nocommdata");
        }
      } catch (erro) {
        //showAlert("common.generalerror");
      }
      self.isLoading = false;
    }),
    refreshContractList() {
      self.ContractListData = [];
    },
    refreshCommodityList() {
      self.getCommodityListData = [];
    },
    refreshPaymentMethodList() {
      self.getPaymentMethodListData = [];
    },
    refreshContract() {
      self.ContractList = [];
    },

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

    setContractDetail(detail) {
      self.ContractDetail = detail;
    },
    setContractCommodityDetail(detail) {
      self.ContractCommodityDetail = detail;
    },
    setContractPaymentMethodDetail(detail) {
      self.ContractCommodityDetail = detail;
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

type ContractStoreType = Instance<typeof ContractModel>;
export interface ContractStore extends ContractStoreType {}
type ContractStoreSnapshotType = SnapshotOut<typeof ContractModel>;
export interface ContractStoreSnapshot extends ContractStoreSnapshotType {}
