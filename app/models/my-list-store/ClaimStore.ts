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
export const ClaimModel = types
  .model("ClaimStore")
  .props({
    signedSaved: false,
    isButtonLoading: false,
    isLoading: false,
    hasError: false,
    isEmptyList: true,
    FormNo: "",
    ClaimCode: types.optional(types.frozen(), 0),
    isClaimSaved: false,
    ClaimList: types.optional(types.frozen(), []),
    ClaimDetail: types.optional(types.frozen(), {}),
    ClaimCommodityDetail: types.optional(types.frozen(), {}),
    city: "",
    district: "",
    sync: false,
    locationEnableCanceled: false,
    fromHome: false,
    responseSuccess: types.optional(types.boolean, false),
    getClaimListData: types.optional(types.frozen(), []),
    getCommodityListData: types.optional(types.frozen(), []),
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    ClaimSearch: flow(function* ClaimSearch(authorization: string, ClaimRequest: any) {
      self.isButtonLoading = true;
      self.isEmptyList = false;
      try {
        const data = yield api.ClaimSearchByNumber(authorization, ClaimRequest);

        if (data.kind === "ok" && data.Status == 200) {
          parseString(data.Claim, { trim: true }, function(_error, result) {
            let returnData = result.ArrayOfClaimDTO.ClaimDTO;
            if (returnData === "") {
              self.isEmptyList = true;
              self.ClaimList = [];
            } else {
              self.isEmptyList = false;
              self.ClaimList = returnData;
            }
          });
        } else {
          self.ClaimList = [];
          self.isEmptyList = true;
          showAlert("ClaimList.noData");
        }
        self.isButtonLoading = false;
      } catch (erro) {
        //showAlert("common.generalerror");
      }
    }),
    getClaimByClaimCode: flow(function* getClaimByClaimCode(
      authorization: string,
      ClaimRequest: any,
    ) {
      self.isButtonLoading = true;
      self.isEmptyList = false;
      try {
        const data = yield api.ClaimSearchByClaimCode(authorization, ClaimRequest);

        if (data.kind === "ok") {
          parseString(data.Claim, { trim: true }, function(_error, result) {
            let returnData = result.ArrayOfClaimDTO.ClaimDTO;

            if (returnData === "") {
              self.isEmptyList = true;
              self.ClaimList = returnData;
            } else {
              self.isEmptyList = false;
              self.ClaimList = returnData;
            }
          });
        } else {
          self.ClaimList = [];
          self.isEmptyList = true;
          showAlert("ClaimList.noData");
        }
        self.isButtonLoading = false;
      } catch (erro) {
        //showAlert("common.generalerror");
      }
    }),
    getClaimList: flow(function* getClaimList(authorization: string, getListRequest: any) {
      self.isLoading = true;
      self.responseSuccess = true;
      try {
        const data = yield api.getClaimList(authorization, getListRequest);

        if (data.kind === "ok" && data.Status == 200) {
          parseString(data.getClaimList, { trim: true }, function(_error, result) {
            let response = result.ArrayOfClaimDTO.ClaimDTO;
            if (response === "") {
              self.getClaimListData = [];
              self.responseSuccess = false;
            } else {
              self.getClaimListData = response;
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
      self.getClaimListData = [];
    },

    setClaimDetail(detail) {
      self.ClaimDetail = detail;
    },
    setClaimCommodityDetail(Commoditydetail) {
      self.ClaimCommodityDetail = Commoditydetail;
    },
    setClaimFalse() {
      self.isClaimSaved = false;
    },
    setClaimCode(code) {
      self.ClaimCode = code;
    },
    startSyncing() {
      self.sync = true;
    },
    stopSyncing() {
      self.sync = false;
    },
    onLocationEnableCanceled(enable) {
      self.locationEnableCanceled = enable;
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
      "ClaimList",
      "ClaimDetail",
      "isClaimSaved",
      "fromHome",
    ]),
  );

type ClaimStoreType = Instance<typeof ClaimModel>;
export interface ClaimStore extends ClaimStoreType {}
type ClaimStoreSnapshotType = SnapshotOut<typeof ClaimModel>;
export interface ClaimStoreSnapshot extends ClaimStoreSnapshotType {}
