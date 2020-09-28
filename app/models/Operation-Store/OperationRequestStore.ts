import { flow, Instance, SnapshotOut, types } from "mobx-state-tree";
import { omit } from "ramda";
import { Api } from "../../services/api";
import { showAlert } from "../../utils/utils";
// const parseString = require('react-native-xml2js').parseString
const parseString = require("react-native-xml2js").parseString;

/**
 * Model description here for TypeScript hints.
 */
const api = new Api();
api.setup();
/**
 * Model description here for TypeScript hints.
 */
export const OperationRequestModel = types
  .model("OperationRequestStore")
  .props({
    isButtonLoading: false,
    isLoading: false,
    hasError: false,
    isEmptyList: true,
    isOperationSaved: true,
    isOperationDeleted: true,
    isOperationEditable: types.optional(types.frozen(), 1),
    OperationRequestListData: types.optional(types.frozen(), []),
    OperationRequestList: types.optional(types.frozen(), []),
    getCommodityListData: types.optional(types.frozen(), []),
    getPaymentMethodListData: types.optional(types.frozen(), []),
    OperationRequestDetail: types.optional(types.frozen(), {}),
    OperationRequestCommodityDetail: types.optional(types.frozen(), {}),
    OperationRequestPaymentMethodDetail: types.optional(types.frozen(), {}),
    OperationList: types.optional(types.frozen(), []),
    OperationListData: types.optional(types.frozen(), []),
    OperationDetail: types.optional(types.frozen(), {}),
    OperationObj: types.optional(types.frozen(), {}),
    OperationCommodityObj: types.optional(types.frozen(), []),
    UpdateOperationObj: types.optional(types.frozen(), {}),
    UpdateOperationCommodityObj: types.optional(types.frozen(), []),
    fromHome: false,
    sync: false,
    responseSuccess: types.optional(types.boolean, false),
    responseHelpSuccess: types.optional(types.boolean, false),
    getListData: types.optional(types.frozen(), []),
    getHelpListData: types.optional(types.frozen(), []),
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    OperationSearch: flow(function* OperationSearch(
      authorization: string,
      Operationrequestcode: any,
    ) {
      self.isButtonLoading = true;
      self.responseSuccess = true;
      try {
        const data = yield api.OperationRequestSearchByNumber(authorization, Operationrequestcode);

        if (data.kind === "ok") {
          parseString(data.OperationRequest, { trim: true }, function(_error, result) {
            let response = result.ArrayOfOperationRequestDTO.OperationRequestDTO;

            if (response === "") {
              self.OperationRequestList = [];
              self.responseSuccess = false;
            } else {
              self.OperationRequestList = response;
              self.responseSuccess = true;
              self.isOperationEditable = response.IsTraderEditable[0];
            }
          });
        } else {
          self.responseSuccess = false;
          self.OperationRequestList = [];
          showAlert("common.noData");
        }
        self.isButtonLoading = false;
      } catch (erro) {
        //showAlert("common.generalerror");
      }
    }),
    getOperationRequestList: flow(function* getOperationRequestList(
      authorization: any,
      getlistrequest: any,
    ) {
      self.isLoading = true;
      self.responseSuccess = true;
      try {
        const data = yield api.getOperationRequestList(authorization, getlistrequest);

        if (data.kind === "ok" && data.Status == 200) {
          parseString(data.getOperationRequestList, { trim: true }, function(_error, result) {
            let response = result.ArrayOfOperationRequestDTO.OperationRequestDTO;
            if (response === "") {
              self.getListData = [];
              self.responseSuccess = false;
            } else {
              self.OperationRequestListData = response;
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
    getOperationRequestCommodityList: flow(function* getOperationRequestCommodityList(
      authorization: string,
      getComListRequest: any,
    ) {
      self.isLoading = true;
      self.responseSuccess = true;
      try {
        const data = yield api.getOperationRequestCommodityList(authorization, getComListRequest);

        if (data.kind === "ok") {
          parseString(data.OperationRequestCommodityResultList, { trim: true }, function(
            _error,
            result,
          ) {
            let response = result.ArrayOfOperationRequestCommodityDTO.OperationRequestCommodityDTO;

            if (response === "") {
              self.getCommodityListData = [];
              self.responseSuccess = false;
            } else {
              self.getCommodityListData = response;
              self.responseSuccess = true;
            }
          });
        } else {
          showAlert("OperationRequestDetail.nocommdata");
        }
      } catch (erro) {
        //showAlert("common.generalerror");
      }
      self.isLoading = false;
    }),
    getOperationRequestPaymentMethodList: flow(function* getOperationRequestPaymentMethodList(
      authorization: string,
      getComListRequest: any,
    ) {
      self.isLoading = true;
      self.responseSuccess = true;
      try {
        const data = yield api.getOperationRequestPaymentMethodList(
          authorization,
          getComListRequest,
        );

        if (data.kind === "ok") {
          parseString(data.OperationRequestPaymentMethodResultList, { trim: true }, function(
            _error,
            result,
          ) {
            let response =
              result.ArrayOfOperationRequestPaymentMethodDTO.OperationRequestPaymentMethodDTO;

            if (response === "") {
              self.getPaymentMethodListData = [];
              self.responseSuccess = false;
            } else {
              self.getPaymentMethodListData = response;
              self.responseSuccess = true;
            }
          });
        } else {
          showAlert("OperationRequestDetail.nocommdata");
        }
      } catch (erro) {
        //showAlert("common.generalerror");
      }
      self.isLoading = false;
    }),
    refreshOperationRequestList() {
      self.OperationRequestListData = [];
    },
    refreshCommodityList() {
      self.getCommodityListData = [];
    },
    refreshPaymentMethodList() {
      self.getPaymentMethodListData = [];
    },
    refreshOperationRequest() {
      self.OperationRequestList = [];
    },

    NewOperationRequest: flow(function* NewOperationRequest(
      Operationobj: any,
      Operationcommobj: any,
      OperationPMobj: any,
    ) {
      self.isButtonLoading = true;
      self.isOperationSaved = true;
      try {
        const data = yield api.NewOperationRequest(Operationobj, Operationcommobj, OperationPMobj);

        if (data.kind === "ok") {
          self.isOperationSaved = true;
        } else {
          showAlert("common.somethingWrong");
          self.isOperationSaved = false;
        }
        self.isButtonLoading = false;
      } catch (erro) {
        showAlert("common.generalerror");
        self.isButtonLoading = false;
      }
    }),

    UpdateOperationRequest: flow(function* NewOperatioUpdateOperationRequestnRequest(
      Operationobj: any,
      Operationcommobj: any,
      OperationPMobj: any,
    ) {
      self.isButtonLoading = true;
      self.isOperationSaved = true;
      try {
        const data = yield api.UpdateOperationRequest(
          Operationobj,
          Operationcommobj,
          OperationPMobj,
        );

        if (data.kind === "ok") {
          self.isOperationSaved = true;
        } else {
          showAlert("common.somethingWrong");
          self.isOperationSaved = false;
        }
        self.isButtonLoading = false;
      } catch (erro) {
        showAlert("common.generalerror");
        self.isButtonLoading = false;
      }
    }),

    DeleteOperationRequest: flow(function* DeleteOperationRequest(Operationrequestcode: any) {
      self.isButtonLoading = true;
      self.isOperationDeleted = true;
      try {
        const data = yield api.DeleteOperationRequest(Operationrequestcode);

        if (data.kind === "ok") {
          self.isOperationDeleted = true;
        } else {
          showAlert("common.somethingWrong");
          self.isOperationDeleted = false;
        }
        self.isButtonLoading = false;
      } catch (erro) {
        showAlert("common.generalerror");
        self.isButtonLoading = false;
      }
    }),

    setOperationDetail(detail) {
      self.OperationDetail = detail;
    },

    setOperationRequestCommodityDetail(detail) {
      self.OperationRequestCommodityDetail = detail;
    },
    setOperationRequestPaymentMethodDetail(detail) {
      self.OperationRequestCommodityDetail = detail;
    },
    setOperationObject(detail) {
      self.OperationObj = detail;
    },
    setOperationCommodityObj(detail) {
      self.OperationCommodityObj = detail;
    },
    setUpdateOperationObject(detail) {
      self.UpdateOperationObj = detail;
    },
    setUpdateOperationCommodityObj(detail) {
      self.UpdateOperationCommodityObj = detail;
    },
    setOperationFalse() {
      self.isOperationSaved = false;
    },
    startSyncing() {
      self.sync = true;
    },
    stopSyncing() {
      self.sync = false;
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
      "OperationList",
      "OperationDetail",
      "isOperationSaved",
      "fromHome",
    ]),
  );

type OperationRequestStoreType = Instance<typeof OperationRequestModel>;
export interface OperationRequestStore extends OperationRequestStoreType {}
type OperationRequestStoreSnapshotType = SnapshotOut<typeof OperationRequestModel>;
export interface OperationRequestStoreSnapshot extends OperationRequestStoreSnapshotType {}
