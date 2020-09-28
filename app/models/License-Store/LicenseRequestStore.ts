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
export const LicenseRequestModel = types
  .model("LicenseRequestStore")
  .props({
    isButtonLoading: false,
    isLoading: false,
    hasError: false,
    isEmptyList: true,
    isLicenseSaved: true,
    isLicenseDeleted: true,
    isLicenseEditable: types.optional(types.frozen(), 1),
    LicenseRequestListData: types.optional(types.frozen(), []),
    LicenseRequestList: types.optional(types.frozen(), []),
    getCommodityListData: types.optional(types.frozen(), []),
    LicenseRequestDetail: types.optional(types.frozen(), {}),
    LicenseRequestCommodityDetail: types.optional(types.frozen(), {}),
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
    LicenseSearch: flow(function* LicenseSearch(authorization: string, Licenserequestcode: any) {
      self.isButtonLoading = true;
      try {
        const data = yield api.LicenseRequestSearchByNumber(authorization, Licenserequestcode);

        if (data.kind === "ok") {
          parseString(data.LicenseRequest, { trim: true }, function(_error, result) {
            let response = result.ArrayOfLicenseRequestDTO.LicenseRequestDTO;

            if (response === "") {
              self.LicenseRequestList = [];
              self.responseSuccess = false;
            } else {
              self.LicenseRequestList = response;
              self.responseSuccess = true;
              self.isLicenseEditable = response.IsTraderEditable[0];
            }
          });
        } else {
          self.LicenseRequestList = [];
          showAlert("common.noData");
          self.responseSuccess = false;
        }
        self.isButtonLoading = false;
      } catch (erro) {
        //showAlert("common.generalerror");
      }
    }),
    getLicenseRequestList: flow(function* getLicenseRequestList(
      authorization: any,
      getlistRequest: any,
    ) {
      self.isLoading = true;
      try {
        const data = yield api.getLicenseRequestList(authorization, getlistRequest);

        if (data.kind === "ok" && data.Status == 200) {
          parseString(data.getLicenseRequestList, { trim: true }, function(_error, result) {
            let response = result.ArrayOfLicenseRequestDTO.LicenseRequestDTO;
            if (response === "") {
              self.getListData = [];
              self.responseSuccess = false;
            } else {
              self.LicenseRequestListData = response;
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
    getLicenseRequestCommodityList: flow(function* getLicenseRequestCommodityList(
      authorization: string,
      getComListRequest: any,
    ) {
      self.isLoading = true;
      try {
        const data = yield api.getLicenseRequestCommodityList(authorization, getComListRequest);

        if (data.kind === "ok") {
          parseString(data.LicenseRequestCommodityResultList, { trim: true }, function(
            _error,
            result,
          ) {
            let response = result.ArrayOfLicenseRequestCommodityDTO.LicenseRequestCommodityDTO;

            if (response === "") {
              self.getCommodityListData = [];
              self.responseSuccess = false;
            } else {
              self.getCommodityListData = response;
              self.responseSuccess = true;
            }
          });
        } else {
          showAlert("LicenseRequestDetail.nocommdata");
        }
      } catch (erro) {
        //showAlert("common.generalerror");
      }
      self.isLoading = false;
    }),

    refreshLicenseRequestList() {
      self.LicenseRequestListData = [];
    },
    refreshCommodityList() {
      self.getCommodityListData = [];
    },
    refreshLicenseRequest() {
      self.LicenseRequestList = [];
    },

    NewLicenseRequest: flow(function* NewLicenseRequest(Licenseobj: any, Licensecommobj: any) {
      self.isButtonLoading = true;

      try {
        const data = yield api.NewLicenseRequest(Licenseobj, Licensecommobj);

        if (data.kind === "ok") {
          self.isLicenseSaved = true;
        } else {
          showAlert("common.somethingWrong");
          self.isLicenseSaved = false;
        }
        self.isButtonLoading = false;
      } catch (erro) {
        showAlert("common.generalerror");
        self.isButtonLoading = false;
      }
    }),

    DeleteLicenseRequest: flow(function* DeleteLicenseRequest(Licenserequestcode: any) {
      self.isButtonLoading = true;

      try {
        const data = yield api.DeleteLicenseRequest(Licenserequestcode);

        if (data.kind === "ok") {
          self.isLicenseDeleted = true;
        } else {
          showAlert("common.somethingWrong");
          self.isLicenseDeleted = false;
        }
        self.isButtonLoading = false;
      } catch (erro) {
        showAlert("common.generalerror");
        self.isButtonLoading = false;
      }
    }),

    UpdateLicenseRequest: flow(function* UpdateLicenseRequest(
      Licenseobj: any,
      Licensecommobj: any,
    ) {
      self.isButtonLoading = true;

      try {
        const data = yield api.UpdateLicenseRequest(Licenseobj, Licensecommobj);

        if (data.kind === "ok") {
          self.isLicenseSaved = true;
        } else {
          showAlert("common.somethingWrong");
          self.isLicenseSaved = false;
        }
        self.isButtonLoading = false;
      } catch (erro) {
        showAlert("common.generalerror");
        self.isButtonLoading = false;
      }
    }),

    setLicenseDetail(detail) {
      self.LicenseRequestDetail = detail;
    },
    setLicenseRequestCommodityDetail(detail) {
      self.LicenseRequestCommodityDetail = detail;
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

type LicenseStoreType = Instance<typeof LicenseRequestModel>;
export interface LicenseRequestStore extends LicenseStoreType {}
type LicenseStoreSnapshotType = SnapshotOut<typeof LicenseRequestModel>;
export interface LicenseStoreSnapshot extends LicenseStoreSnapshotType {}
