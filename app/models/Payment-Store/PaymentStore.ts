import { flow, Instance, SnapshotOut, types } from "mobx-state-tree";
import { omit } from "ramda";
import { Api } from "../../services/api";
import { showAlert } from "../../utils/utils";
//import PaymentdbModel from "../local-database/Payment-model";
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
export const PaymentModel = types
  .model("PaymentStore")
  .props({
    isButtonLoading: false,
    isLoading: false,
    hasError: false,
    isEmptyList: true,
    isPaymentSaved: true,
    isPaymentDeleted: true,
    isPaymentEditable: types.optional(types.frozen(), 1),
    PaymentListData: types.optional(types.frozen(), []),
    PaymentList: types.optional(types.frozen(), []),
    getPaymentListData: types.optional(types.frozen(), []),
    getPaymentMethodListData: types.optional(types.frozen(), []),
    PaymentDetail: types.optional(types.frozen(), {}),
    PaymentCode: types.optional(types.frozen(), 1),
    PaymentObj: types.optional(types.frozen(), {}),
    PaymentCommodityObj: types.optional(types.frozen(), []),
    UpdatePaymentObj: types.optional(types.frozen(), {}),
    UpdatePaymentCommodityObj: types.optional(types.frozen(), []),
    fromHome: false,
    sync: false,
    responseSuccess: types.optional(types.boolean, false),
    responseHelpSuccess: types.optional(types.boolean, false),
    getListData: types.optional(types.frozen(), []),
    getHelpListData: types.optional(types.frozen(), []),
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    PaymentSearch: flow(function* PaymentSearch(authorization: string, Paymentcode: any) {
      self.isButtonLoading = true;
      self.responseSuccess = true;
      try {
        const data = yield api.PaymentSearchByNumber(authorization, Paymentcode);

        if (data.kind === "ok") {
          parseString(data.Payment, { trim: true }, function(_error, result) {
            let response = result.ArrayOfPaymentDTO.PaymentDTO;

            if (response === "") {
              self.PaymentList = [];
              self.responseSuccess = false;
            } else {
              self.PaymentList = response;
              self.responseSuccess = true;
              self.isPaymentEditable = response.IsTraderEditable[0];
            }
          });
        } else {
          self.responseSuccess = false;
          self.PaymentList = [];
          showAlert("common.noData");
        }
        self.isButtonLoading = false;
      } catch (erro) {
        //showAlert("common.generalerror");
      }
    }),
    getPaymentList: flow(function* getPaymentList(authorization: any, getlist: any) {
      self.isLoading = true;
      self.responseSuccess = true;
      try {
        const data = yield api.getPaymentList(authorization, getlist);

        if (data.kind === "ok" && data.Status == 200) {
          parseString(data.getPaymentList, { trim: true }, function(_error, result) {
            let response = result.ArrayOfPaymentDTO.PaymentDTO;
            if (response === "") {
              self.getListData = [];
              self.responseSuccess = false;
            } else {
              self.PaymentListData = response;
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

    refreshList() {
      self.getPaymentListData = [];
    },
    refreshPaymentList() {
      self.PaymentListData = [];
    },

    refreshPaymentMethodList() {
      self.getPaymentMethodListData = [];
    },
    refreshPayment() {
      self.PaymentList = [];
    },

    setPaymentDetail(detail) {
      self.PaymentDetail = detail;
    },

    setPaymentObject(detail) {
      self.PaymentObj = detail;
    },
    setPaymentCommodityObj(detail) {
      self.PaymentCommodityObj = detail;
    },
    setUpdatePaymentObject(detail) {
      self.UpdatePaymentObj = detail;
    },
    setUpdatePaymentCommodityObj(detail) {
      self.UpdatePaymentCommodityObj = detail;
    },
    setPaymentFalse() {
      self.isPaymentSaved = false;
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
      "PaymentList",
      "PaymentDetail",
      "isPaymentSaved",
      "fromHome",
    ]),
  );

type PaymentStoreType = Instance<typeof PaymentModel>;
export interface PaymentStore extends PaymentStoreType {}
type PaymentStoreSnapshotType = SnapshotOut<typeof PaymentModel>;
export interface PaymentStoreSnapshot extends PaymentStoreSnapshotType {}
