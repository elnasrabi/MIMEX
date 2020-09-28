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
export const MaturityModel = types
  .model("MaturityStore")
  .props({
    signedSaved: false,
    isButtonLoading: false,
    isLoading: false,
    hasError: false,
    isEmptyList: true,
    FormNo: "",
    MaturityCode: types.optional(types.frozen(), 0),
    isMaturitySaved: false,
    MaturityList: types.optional(types.frozen(), []),
    MaturityDetail: types.optional(types.frozen(), {}),
    city: "",
    district: "",
    sync: false,
    locationEnableCanceled: false,
    fromHome: false,
    responseSuccess: types.optional(types.boolean, false),
    getMaturityListData: types.optional(types.frozen(), []),
    getCommodityListData: types.optional(types.frozen(), []),
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    MaturitySearch: flow(function* MaturitySearch(authorization: string, MaturityRequest: any) {
      self.isButtonLoading = true;
      self.isEmptyList = false;
      try {
        const data = yield api.MaturitySearchByNumber(authorization, MaturityRequest);

        if (data.kind === "ok") {
          parseString(data.Maturity, { trim: true }, function(_error, result) {
            let returnData = result.ArrayOfMaturityDTO.MaturityDTO;
            if (returnData === "") {
              self.isEmptyList = true;
              self.MaturityList = [];
            } else {
              self.isEmptyList = false;
              self.MaturityList = returnData;
            }
          });
        } else {
          self.MaturityList = [];
          self.isEmptyList = true;
          showAlert("MaturityList.noData");
        }
        self.isButtonLoading = false;
      } catch (erro) {
        //showAlert("common.generalerror");
      }
    }),
    getMaturityList: flow(function* getMaturityList(authorization: string, getListRequest: any) {
      self.isLoading = true;
      self.responseSuccess = true;
      try {
        const data = yield api.getMaturityList(authorization, getListRequest);

        if (data.kind === "ok" && data.Status == 200) {
          parseString(data.getMaturityList, { trim: true }, function(_error, result) {
            let response = result.ArrayOfMaturityDTO.MaturityDTO;
            if (response === "") {
              self.getMaturityListData = [];
              self.responseSuccess = false;
            } else {
              self.getMaturityListData = response;
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
    getMaturityByForm: flow(function* getMagetMaturityByFormurityList(
      authorization: string,
      getListRequest: any,
    ) {
      self.isLoading = true;
      self.responseSuccess = true;
      try {
        const data = yield api.getMaturityByForm(authorization, getListRequest);

        if (data.kind === "ok" && data.Status == 200) {
          parseString(data.getMaturityList, { trim: true }, function(_error, result) {
            let response = result.ArrayOfMaturityDTO.MaturityDTO;
            if (response === "") {
              self.MaturityList = [];
              self.responseSuccess = false;
            } else {
              self.MaturityList = response;
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
      self.getMaturityListData = [];
    },

    setMaturityDetail(detail) {
      self.MaturityDetail = detail;
    },
    RefreshMaturityList() {
      self.getMaturityListData = [];
    },
    setMaturityFalse() {
      self.isMaturitySaved = false;
    },
    setMaturityCode(code) {
      self.MaturityCode = code;
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
      "MaturityList",
      "MaturityDetail",
      "isMaturitySaved",
      "fromHome",
    ]),
  );

type MaturityStoreType = Instance<typeof MaturityModel>;
export interface MaturityStore extends MaturityStoreType {}
type MaturityStoreSnapshotType = SnapshotOut<typeof MaturityModel>;
export interface MaturityStoreSnapshot extends MaturityStoreSnapshotType {}
