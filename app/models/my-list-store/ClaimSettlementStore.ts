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
export const ClaimSettlementModel = types
  .model("ClaimSettlementStore")
  .props({
    signedSaved: false,
    isButtonLoading: false,
    isLoading:false,
    hasError: false,
    isEmptyList: true,
    FormNo: "",
    ClaimSettlementCode:types.optional(types.frozen(), 0),
    isClaimSettlementSaved: false,
    ClaimSettlementList: types.optional(types.frozen(), []),
    ClaimSettlementDetail: types.optional(types.frozen(), {}),
    ClaimSettlementCommodityDetail: types.optional(types.frozen(), {}),
    city: "",
    district: "",
    sync: false,
    locationEnableCanceled: false,
    fromHome: false,
    responseSuccess: types.optional(types.boolean, false),
    getClaimSettlementListData: types.optional(types.frozen(), []),
    getCommodityListData: types.optional(types.frozen(), []),
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
  
    ClaimSettlementSearch: flow(function* ClaimSettlementSearch(
      authorization: string,
      ClaimSettlementRequest: any,
    ) {
      self.isButtonLoading = true;
      self.isEmptyList = false;
      try {
        const data = yield api.ClaimSettlementSearchByNumber(authorization, ClaimSettlementRequest);
        
        if (data.kind === "ok") {

          parseString(data.ClaimSettlement , { trim: true }, function(_error, result) {
          
            let returnData= result.ArrayOfClaimSettlementDTO.ClaimSettlementDTO;
            if (returnData === "") {
              self.isEmptyList = true;
              self.ClaimSettlementList = [];
            } else {
              self.isEmptyList = false;
              self.ClaimSettlementList = returnData;
            }
            
          });
        } else {
          self.ClaimSettlementList = [];
          self.isEmptyList = true;
          showAlert("ClaimSettlementList.noData");
        }
        self.isButtonLoading = false;
      } catch (erro) { showAlert("common.generalerror")}
    }),
    getClaimSettlementList: flow(function* getClaimSettlementList(authorization: string, getListRequest: any) {
      self.isLoading = true;
      self.responseSuccess = true;
      try {
        const data = yield api.getClaimSettlementList(authorization, getListRequest);
        
        if (data.kind === "ok" && data.Status == 200) {
          parseString(data.getClaimSettlementList, { trim: true }, function(_error, result) {
            let response =
            result.ArrayOfClaimSettlementDTO.ClaimSettlementDTO;
            if (response === "") {
              self.getClaimSettlementListData = [];
              self.responseSuccess = false;
            } else {
              self.getClaimSettlementListData = response;
              self.responseSuccess = true;
            }
          });
        } else {
          showAlert("common.noData");
        }
      } catch (erro) { showAlert("common.generalerror")}
      self.isLoading = false;
    }),
    getClaimSettlementByForm: flow(function* getClaimSettlementByForm(authorization: string, getListRequest: any) {
      self.isLoading = true;
      self.responseSuccess = true;
      try {
        const data = yield api.getClaimSettlementByForm(authorization, getListRequest);
        
        if (data.kind === "ok") {
          parseString(data.getClaimSettlementList, { trim: true }, function(_error, result) {
            let response =
            result.ArrayOfClaimSettlementDTO.ClaimSettlementDTO;
           
            if (response === "") {
              self.ClaimSettlementList = [];
              self.responseSuccess = false;
            } else {
              self.ClaimSettlementList = response;
              self.responseSuccess = true;
            }
          });
        } else {
          showAlert("common.noData");
        }
      } catch (erro) { showAlert("common.generalerror")}
      self.isLoading = false;
    }),
    getClaimSettlementByClaim: flow(function* getClaimSettlementByClaim(authorization: string, getListRequest: any) {
      self.isLoading = true;
      self.responseSuccess = true;
      try {
        const data = yield api.getClaimSettlementByClaim(authorization, getListRequest);
        
        if (data.kind === "ok" && data.Status == 200) {
          parseString(data.getClaimSettlementList, { trim: true }, function(_error, result) {
            let response =
            result.ArrayOfClaimSettlementDTO.ClaimSettlementDTO;
            if (response === "") {
              self.ClaimSettlementList = [];
              self.responseSuccess = false;
            } else {
              self.ClaimSettlementList = response;
              self.responseSuccess = true;
            }
          });
        } else {
          showAlert("common.noData");
        }
      } catch (erro) { showAlert("common.generalerror")}
      self.isLoading = false;
    }),
    getClaimSettlementByPayment: flow(function* getClaimSettlementByPayment(authorization: string, getListRequest: any) {
      self.isLoading = true;
      self.responseSuccess = true;
      try {
        const data = yield api.getClaimSettlementByPayment(authorization, getListRequest);
        
        if (data.kind === "ok" && data.Status == 200) {
          parseString(data.getClaimSettlementList, { trim: true }, function(_error, result) {
            let response =
            result.ArrayOfClaimSettlementDTO.ClaimSettlementDTO;
            if (response === "") {
              self.ClaimSettlementList = [];
              self.responseSuccess = false;
            } else {
              self.ClaimSettlementList = response;
              self.responseSuccess = true;
            }
          });
        } else {
          showAlert("common.noData");
        }
      } catch (erro) { showAlert("common.generalerror")}
      self.isLoading = false;
    }),
    refreshList() {
      self.getClaimSettlementListData = [];
    },
    refreshClaimSettlementList() {
      self.ClaimSettlementList = [];
    },

   
   
    setClaimSettlementDetail(detail) {
      self.ClaimSettlementDetail = detail;
    },
    setClaimSettlementCommodityDetail(Commoditydetail) {
      self.ClaimSettlementCommodityDetail = Commoditydetail;
    },
    setClaimSettlementFalse() {
      self.isClaimSettlementSaved = false;
    },
    setClaimSettlementCode(code) {
      self.ClaimSettlementCode = code;
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
      "ClaimSettlementList",
      "ClaimSettlementDetail",
      "isClaimSettlementSaved",
      "fromHome",
    ]),
  );

type ClaimSettlementStoreType = Instance<typeof ClaimSettlementModel>;
export interface ClaimSettlementStore extends ClaimSettlementStoreType {}
type ClaimSettlementStoreSnapshotType = SnapshotOut<typeof ClaimSettlementModel>;
export interface ClaimSettlementStoreSnapshot extends ClaimSettlementStoreSnapshotType {}
