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
export const OperationModel = types
  .model("OperationStore")
  .props({
    isButtonLoading: false,
    isLoading: false,
    hasError: false,
    isEmptyList: true,
    isOperationSaved: true,
    isOperationDeleted: true,
    isOperationEditable: types.optional(types.frozen(), 1),
    OperationListData: types.optional(types.frozen(), []),
    OperationList: types.optional(types.frozen(), []),
    getCommodityListData: types.optional(types.frozen(), []),
    getPaymentMethodListData: types.optional(types.frozen(), []),
    OperationDetail: types.optional(types.frozen(), {}),
    OperationCommodityDetail: types.optional(types.frozen(), {}),
    OperationPaymentMethodDetail: types.optional(types.frozen(), {}),
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
    OperationSearch: flow(function* OperationSearch(authorization: string, Operationcode: any) {
      self.isButtonLoading = true;
      self.responseSuccess = true;
      try {
        const data = yield api.OperationSearchByNumber(authorization, Operationcode);

        if (data.kind === "ok") {
          parseString(data.Operation, { trim: true }, function(_error, result) {
            let response = result.ArrayOfOperationDTO.OperationDTO;

            if (response === "") {
              self.OperationList = [];
              self.responseSuccess = false;
            } else {
              self.OperationList = response;
              self.responseSuccess = true;
              self.isOperationEditable = response.IsTraderEditable[0];
            }
          });
        } else {
          self.responseSuccess = false;
          self.OperationList = [];
          showAlert("common.noData");
        }
        self.isButtonLoading = false;
      } catch (erro) {
        //showAlert("common.generalerror");
      }
    }),
    getOperationList: flow(function* getOperationList(authorization: any, getlist: any) {
      self.isLoading = true;
      self.responseSuccess = true;
      try {
        const data = yield api.getOperationList(authorization, getlist);

        if (data.kind === "ok" && data.Status == 200) {
          parseString(data.getOperationList, { trim: true }, function(_error, result) {
            let response = result.ArrayOfOperationDTO.OperationDTO;
            if (response === "") {
              self.getListData = [];
              self.responseSuccess = false;
            } else {
              self.OperationListData = response;
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
    getOperationCommodityList: flow(function* getOperationCommodityList(
      authorization: string,
      getComList: any,
    ) {
      self.isLoading = true;
      self.responseSuccess = true;
      try {
        const data = yield api.getOperationCommodityList(authorization, getComList);

        if (data.kind === "ok") {
          parseString(data.OperationCommodityResultList, { trim: true }, function(_error, result) {
            let response = result.ArrayOfOperationCommodityDTO.OperationCommodityDTO;

            if (response === "") {
              self.getCommodityListData = [];
              self.responseSuccess = false;
            } else {
              self.getCommodityListData = response;
              self.responseSuccess = true;
            }
          });
        } else {
          showAlert("OperationDetail.nocommdata");
        }
      } catch (erro) {
        //showAlert("common.generalerror");
      }
      self.isLoading = false;
    }),
    getOperationPaymentMethodList: flow(function* getOperationPaymentMethodList(
      authorization: string,
      getComList: any,
    ) {
      self.isLoading = true;
      self.responseSuccess = true;
      try {
        const data = yield api.getOperationPaymentMethodList(authorization, getComList);

        if (data.kind === "ok") {
          parseString(data.OperationPaymentMethodResultList, { trim: true }, function(
            _error,
            result,
          ) {
            let response = result.ArrayOfOperationPaymentMethodDTO.OperationPaymentMethodDTO;

            if (response === "") {
              self.getPaymentMethodListData = [];
              self.responseSuccess = false;
            } else {
              self.getPaymentMethodListData = response;
              self.responseSuccess = true;
            }
          });
        } else {
          showAlert("OperationDetail.nocommdata");
        }
      } catch (erro) {
        //showAlert("common.generalerror");
      }
      self.isLoading = false;
    }),
    refreshOperationList() {
      self.OperationListData = [];
    },
    refreshCommodityList() {
      self.getCommodityListData = [];
    },
    refreshPaymentMethodList() {
      self.getPaymentMethodListData = [];
    },
    refreshOperation() {
      self.OperationList = [];
    },

    setOperationDetail(detail) {
      self.OperationDetail = detail;
    },

    setOperationCommodityDetail(detail) {
      self.OperationCommodityDetail = detail;
    },
    setOperationPaymentMethodDetail(detail) {
      self.OperationCommodityDetail = detail;
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

type OperationStoreType = Instance<typeof OperationModel>;
export interface OperationStore extends OperationStoreType {}
type OperationStoreSnapshotType = SnapshotOut<typeof OperationModel>;
export interface OperationStoreSnapshot extends OperationStoreSnapshotType {}
