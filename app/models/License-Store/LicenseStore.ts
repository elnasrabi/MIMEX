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
export const LicenseModel = types
  .model("LicenseStore")
  .props({
    isButtonLoading: false,
    isLoading: false,
    hasError: false,
    isEmptyList: true,
    isLicenseSaved: true,
    isLicenseDeleted: true,
    isLicenseEditable: types.optional(types.frozen(), 1),
    LicenseListData: types.optional(types.frozen(), []),
    LicenseList: types.optional(types.frozen(), []),
    getCommodityListData: types.optional(types.frozen(), []),
    LicenseDetail: types.optional(types.frozen(), {}),
    LicenseCommodityDetail: types.optional(types.frozen(), {}),
    LicenseObj: types.optional(types.frozen(), {}),
    LicenseCommodityObj: types.optional(types.frozen(), []),
    UpdateLicenseObj: types.optional(types.frozen(), {}),
    UpdateLicenseCommodityObj: types.optional(types.frozen(), []),
    fromHome: false,
    sync: false,
    responseSuccess: types.optional(types.boolean, false),
    responseHelpSuccess: types.optional(types.boolean, false),
    getListData: types.optional(types.frozen(), []),
    getHelpListData: types.optional(types.frozen(), []),
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    LicenseSearch: flow(function* LicenseSearch(authorization: string, Licensecode: any) {
      self.isButtonLoading = true;
      try {
        const data = yield api.LicenseSearchByNumber(authorization, Licensecode);

        if (data.kind === "ok") {
          parseString(data.License, { trim: true }, function(_error, result) {
            let response = result.ArrayOfLicenseDTO.LicenseDTO;

            if (response === "") {
              self.LicenseList = [];
              self.responseSuccess = false;
            } else {
              self.LicenseList = response;
              self.responseSuccess = true;
              self.isLicenseEditable = response.IsTraderEditable[0];
            }
          });
        } else {
          self.LicenseList = [];
          showAlert("common.noData");
          self.responseSuccess = false;
        }
        self.isButtonLoading = false;
      } catch (erro) {
        //showAlert("common.generalerror");
      }
    }),
    getLicenseList: flow(function* getLicenseList(authorization: any, getlist: any) {
      self.isLoading = true;
      try {
        const data = yield api.getLicenseList(authorization, getlist);

        if (data.kind === "ok" && data.Status == 200) {
          parseString(data.getLicenseList, { trim: true }, function(_error, result) {
            let response = result.ArrayOfLicenseDTO.LicenseDTO;
            if (response === "") {
              self.getListData = [];
              self.responseSuccess = false;
            } else {
              self.LicenseListData = response;
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
    getLicenseCommodityList: flow(function* getLicenseCommodityList(
      authorization: string,
      getComList: any,
    ) {
      self.isLoading = true;
      try {
        const data = yield api.getLicenseCommodityList(authorization, getComList);
      
        if (data.kind === "ok") {
          parseString(data.LicenseCommodityResultList, { trim: true }, function(_error, result) {
            let response = result.ArrayOfLicenseCommodityDTO.LicenseCommodityDTO;

            if (response === "") {
              self.getCommodityListData = [];
              self.responseSuccess = false;
            } else {
              self.getCommodityListData = response;
              self.responseSuccess = true;
            }
          });
        } else {
          showAlert("LicenseDetail.nocommdata");
        }
      } catch (erro) {
        //showAlert("common.generalerror");
      }
      self.isLoading = false;
    }),

    refreshLicenseList() {
      self.LicenseListData = [];
    },
    refreshCommodityList() {
      self.getCommodityListData = [];
    },
    refreshLicense() {
      self.LicenseList = [];
    },

    setLicenseDetail(detail) {
      self.LicenseDetail = detail;
    },
    setLicenseCommodityDetail(detail) {
      self.LicenseCommodityDetail = detail;
    },

    setLicenseObject(detail) {
      self.LicenseObj = detail;
    },
    setLicenseCommodityObj(detail) {
      self.LicenseCommodityObj = detail;
    },
    setUpdateLicenseObject(detail) {
      self.UpdateLicenseObj = detail;
    },
    setUpdateLicenseCommodityObj(detail) {
      self.UpdateLicenseCommodityObj = detail;
    },
    setLicenseFalse() {
      self.isLicenseSaved = false;
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
      "LicenseList",
      "LicenseDetail",
      "isLicenseSaved",
      "fromHome",
    ]),
  );

type LicenseStoreType = Instance<typeof LicenseModel>;
export interface LicenseStore extends LicenseStoreType {}
type LicenseStoreSnapshotType = SnapshotOut<typeof LicenseModel>;
export interface LicenseStoreSnapshot extends LicenseStoreSnapshotType {}
