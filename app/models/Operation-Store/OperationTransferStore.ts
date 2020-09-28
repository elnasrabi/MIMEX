import { flow, Instance, SnapshotOut, types } from "mobx-state-tree";
import { omit } from "ramda";
import { Api } from "../../services/api";
import { showAlert } from "../../utils/utils";
//import OperationTransferdbModel from "../local-database/OperationTransfer-model";
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
export const OperationTransferModel = types
  .model("OperationTransferStore")
  .props({
    isButtonLoading: false,
    isLoading: false,
    hasError: false,
    isEmptyList: true,
    isOperationTransferSaved: true,
    isOperationTransferDeleted: true,
    isOperationTransferEditable: types.optional(types.frozen(), 1),
    OperationTransferListData: types.optional(types.frozen(), []),
    OperationTransferList: types.optional(types.frozen(), []),
    getCommodityListData: types.optional(types.frozen(), []),
    getPaymentMethodListData: types.optional(types.frozen(), []),
    OperationTransferDetail: types.optional(types.frozen(), {}),
    OperationTransferCommodityDetail: types.optional(types.frozen(), {}),
    OperationTransferPaymentMethodDetail: types.optional(types.frozen(), {}),

    OperationTransferObj: types.optional(types.frozen(), {}),
    OperationTransferCommodityObj: types.optional(types.frozen(), []),
    UpdateOperationTransferObj: types.optional(types.frozen(), {}),
    UpdateOperationTransferCommodityObj: types.optional(types.frozen(), []),
    fromHome: false,
    sync: false,
    responseSuccess: types.optional(types.boolean, false),
    responseHelpSuccess: types.optional(types.boolean, false),
    getListData: types.optional(types.frozen(), []),
    getHelpListData: types.optional(types.frozen(), []),
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    OperationTransferSearch: flow(function* OperationTransferSearch(
      authorization: string,
      OperationTransfercode: any,
    ) {
      self.isButtonLoading = true;
      self.responseSuccess = true;
      try {
        const data = yield api.OperationTransferSearchByNumber(
          authorization,
          OperationTransfercode,
        );

        if (data.kind === "ok") {
          parseString(data.OperationTransfer, { trim: true }, function(_error, result) {
            let response = result.ArrayOfOperationTransferDTO.OperationTransferDTO;

            if (response === "") {
              self.OperationTransferList = [];
              self.responseSuccess = false;
            } else {
              self.OperationTransferList = response;
              self.responseSuccess = true;
              self.isOperationTransferEditable = response.IsTraderEditable[0];
            }
          });
        } else {
          self.responseSuccess = false;
          self.OperationTransferList = [];
          showAlert("common.noData");
        }
        self.isButtonLoading = false;
      } catch (erro) {
        //showAlert("common.generalerror");
      }
    }),
    getOperationTransferList: flow(function* getOperationTransferList(
      authorization: any,
      getlist: any,
    ) {
      self.isLoading = true;
      self.responseSuccess = true;
      try {
        const data = yield api.getOperationTransferList(authorization, getlist);

        if (data.kind === "ok" && data.Status == 200) {
          parseString(data.getOperationTransferList, { trim: true }, function(_error, result) {
            let response = result.ArrayOfOperationTransferDTO.OperationTransferDTO;
            if (response === "") {
              self.getListData = [];
              self.responseSuccess = false;
            } else {
              self.OperationTransferListData = response;
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
    getOperationTransferByOperation: flow(function* getOperationTransferByOperation(
      authorization: any,
      getlist: any,
    ) {
      self.isLoading = true;
      self.responseSuccess = true;
      try {
        const data = yield api.getOperationTransferByOperation(authorization, getlist);

        if (data.kind === "ok") {
          parseString(data.getOperationTransferList, { trim: true }, function(_error, result) {
            let response = result.ArrayOfOperationTransferDTO.OperationTransferDTO;

            if (response === "") {
              self.OperationTransferList = [];
              self.responseSuccess = false;
            } else {
              self.OperationTransferList = response;
              self.responseSuccess = true;
            }
          });
        } else {
          showAlert("OperationTransferDetail.noData");
        }
      } catch (erro) {
        //showAlert("common.generalerror");
      }
      self.isLoading = false;
    }),

    refreshOperationTransferList() {
      self.OperationTransferListData = [];
    },
    refreshCommodityList() {
      self.getCommodityListData = [];
    },
    refreshPaymentMethodList() {
      self.getPaymentMethodListData = [];
    },
    refreshOperationTransfer() {
      self.OperationTransferList = [];
    },

    setOperationTransferDetail(detail) {
      self.OperationTransferDetail = detail;
    },

    setOperationTransferCommodityDetail(detail) {
      self.OperationTransferCommodityDetail = detail;
    },
    setOperationTransferPaymentMethodDetail(detail) {
      self.OperationTransferCommodityDetail = detail;
    },
    setOperationTransferObject(detail) {
      self.OperationTransferObj = detail;
    },
    setOperationTransferCommodityObj(detail) {
      self.OperationTransferCommodityObj = detail;
    },
    setUpdateOperationTransferObject(detail) {
      self.UpdateOperationTransferObj = detail;
    },
    setUpdateOperationTransferCommodityObj(detail) {
      self.UpdateOperationTransferCommodityObj = detail;
    },
    setOperationTransferFalse() {
      self.isOperationTransferSaved = false;
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
      "OperationTransferList",
      "OperationTransferDetail",
      "isOperationTransferSaved",
      "fromHome",
    ]),
  );

type OperationTransferStoreType = Instance<typeof OperationTransferModel>;
export interface OperationTransferStore extends OperationTransferStoreType {}
type OperationTransferStoreSnapshotType = SnapshotOut<typeof OperationTransferModel>;
export interface OperationTransferStoreSnapshot extends OperationTransferStoreSnapshotType {}
