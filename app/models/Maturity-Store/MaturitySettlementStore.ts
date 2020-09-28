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
export const MaturitySettlementModel = types
  .model("MaturitySettlementStore")
  .props({
    signedSaved: false,
    isButtonLoading: false,
    isLoading: false,
    hasError: false,
    isEmptyList: true,
    FormNo: "",
    MaturitySettlementCode: types.optional(types.frozen(), 0),
    isMaturitySettlementSaved: false,
    MaturitySettlementList: types.optional(types.frozen(), []),
    MaturitySettlementDetail: types.optional(types.frozen(), {}),
    MaturitySettlementCommodityDetail: types.optional(types.frozen(), {}),
    city: "",
    district: "",
    sync: false,
    locationEnableCanceled: false,
    fromHome: false,
    responseSuccess: types.optional(types.boolean, false),
    getMaturitySettlementListData: types.optional(types.frozen(), []),
    getCommodityListData: types.optional(types.frozen(), []),
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    MaturitySettlementSearch: flow(function* MaturitySettlementSearch(
      authorization: string,
      MaturitySettlementRequest: any,
    ) {
      self.isButtonLoading = true;
      self.isEmptyList = false;
      try {
        const data = yield api.MaturitySettlementSearchByNumber(
          authorization,
          MaturitySettlementRequest,
        );

        if (data.kind === "ok") {
          parseString(data.MaturitySettlement, { trim: true }, function(_error, result) {
            let returnData = result.ArrayOfMaturitySettlementDTO.MaturitySettlementDTO;
            if (returnData === "") {
              self.isEmptyList = true;
              self.MaturitySettlementList = [];
            } else {
              self.isEmptyList = false;
              self.MaturitySettlementList = returnData;
            }
          });
        } else {
          self.MaturitySettlementList = [];
          self.isEmptyList = true;
          showAlert("MaturitySettlementList.noData");
        }
        self.isButtonLoading = false;
      } catch (erro) {
        //showAlert("common.generalerror");
      }
    }),
    getMaturitySettlementList: flow(function* getMaturitySettlementList(
      authorization: string,
      getListRequest: any,
    ) {
      self.isLoading = true;
      self.responseSuccess = true;
      try {
        const data = yield api.getMaturitySettlementList(authorization, getListRequest);
        // console.log('getMaturitySettlementList',data);
        if (data.kind === "ok" && data.Status == 200) {
          parseString(data.getMaturitySettlementList, { trim: true }, function(_error, result) {
            let response = result.ArrayOfMaturitySettlementDTO.MaturitySettlementDTO;
            if (response === "") {
              self.MaturitySettlementList = [];
              self.responseSuccess = false;
            } else {
              self.MaturitySettlementList = response;
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
    getMaturitySettlementByForm: flow(function* getMagetMaturitySettlementByFormurityList(
      authorization: string,
      getListRequest: any,
    ) {
      self.isLoading = true;
      self.responseSuccess = true;
      try {
        const data = yield api.getMaturitySettlementByForm(authorization, getListRequest);

        if (data.kind === "ok" && data.Status == 200) {
          parseString(data.getMaturitySettlementList, { trim: true }, function(_error, result) {
            let response = result.ArrayOfMaturitySettlementDTO.MaturitySettlementDTO;
            if (response === "") {
              self.MaturitySettlementList = [];
              self.responseSuccess = false;
            } else {
              self.MaturitySettlementList = response;
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
    getMaturitySettlementByMaturity: flow(function* getMaturitySettlementByMaturity(
      authorization: string,
      getListRequest: any,
    ) {
      self.isLoading = true;
      self.responseSuccess = true;
      try {
        const data = yield api.getMaturitySettlementByMaturity(authorization, getListRequest);

        if (data.kind === "ok" && data.Status == 200) {
          parseString(data.getMaturitySettlementList, { trim: true }, function(_error, result) {
            let response = result.ArrayOfMaturitySettlementDTO.MaturitySettlementDTO;
            if (response === "") {
              self.MaturitySettlementList = [];
              self.responseSuccess = false;
            } else {
              self.MaturitySettlementList = response;
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
      self.MaturitySettlementList = [];
    },

    setMaturitySettlementDetail(detail) {
      self.MaturitySettlementDetail = detail;
    },
    setMaturitySettlementCommodityDetail(Commoditydetail) {
      self.MaturitySettlementCommodityDetail = Commoditydetail;
    },
    setMaturitySettlementFalse() {
      self.isMaturitySettlementSaved = false;
    },
    setMaturitySettlementCode(code) {
      self.MaturitySettlementCode = code;
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
      "MaturitySettlementList",
      "MaturitySettlementDetail",
      "isMaturitySettlementSaved",
      "fromHome",
    ]),
  );

type MaturitySettlementStoreType = Instance<typeof MaturitySettlementModel>;
export interface MaturitySettlementStore extends MaturitySettlementStoreType {}
type MaturitySettlementStoreSnapshotType = SnapshotOut<typeof MaturitySettlementModel>;
export interface MaturitySettlementStoreSnapshot extends MaturitySettlementStoreSnapshotType {}
