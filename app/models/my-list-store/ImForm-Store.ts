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
export const ImFormModel = types
  .model("ImFormStore")
  .props({
    signedSaved: false,
    isButtonLoading: false,
    isLoading: false,
    hasError: false,
    isEmptyList: true,
    FormNo: "",
    isIMFormSaved: false,
    IMFormList: types.optional(types.frozen(), []),
    IMFormDetail: types.optional(types.frozen(), {}),
    IMFormCommodityDetail: types.optional(types.frozen(), {}),
    city: "",
    district: "",
    sync: false,
    locationEnableCanceled: false,
    fromHome: false,
    responseSuccess: types.optional(types.boolean, false),
    getImListData: types.optional(types.frozen(), []),
    getCommodityListData: types.optional(types.frozen(), []),
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    onSigned(value) {
      self.signedSaved = value;
    },
    IMFormSearch: flow(function* ImFormSearch(authorization: string, ImFormRequest: any) {
      self.isButtonLoading = true;
      self.isEmptyList = false;
      try {
        const data = yield api.ImFormSearchByNumber(authorization, ImFormRequest);

        if (data.kind === "ok") {
          parseString(data.ImForm, { trim: true }, function(_error, result) {
            let returnData = result.ArrayOfImFormDTO.ImFormDTO;
            if (returnData === "") {
              self.isEmptyList = true;
              self.IMFormList = [];
            } else {
              self.isEmptyList = false;
              self.IMFormList = returnData;
            }
          });
        } else {
          showAlert("ImFormList.noData");
        }
        self.isButtonLoading = false;
      } catch (erro) {
        //showAlert("common.generalerror");
      }
    }),
    getImList: flow(function* getImList(authorization: string, getListRequest: any) {
      self.isLoading = true;
      self.responseSuccess = true;
      try {
        const data = yield api.getImList(authorization, getListRequest);

        if (data.kind === "ok" && data.Status == 200) {
          parseString(data.getImList, { trim: true }, function(_error, result) {
            let response = result.ArrayOfImFormDTO.ImFormDTO;
            if (response === "") {
              self.getImListData = [];
              self.responseSuccess = false;
            } else {
              self.getImListData = response;
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
    getImFormByOperationList: flow(function* getImFormByOperationList(
      authorization: string,
      operationcode: any,
    ) {
      self.isLoading = true;
      self.responseSuccess = true;
      try {
        const data = yield api.getImFormByOperationList(authorization, operationcode);

        if (data.kind === "ok" && data.Status == 200) {
          parseString(data.getImList, { trim: true }, function(_error, result) {
            let response = result.ArrayOfImFormDTO.ImFormDTO;
            if (response === "") {
              self.IMFormList = [];
              self.responseSuccess = false;
            } else {
              self.IMFormList = response;
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
      self.getImListData = [];
    },
    getImCommodityList: flow(function* getImCommodityList(
      authorization: string,
      getComListRequest: any,
    ) {
      self.isLoading = true;
      self.responseSuccess = true;
      try {
        const data = yield api.getImFormCommodityList(authorization, getComListRequest);

        if (data.kind === "ok") {
          parseString(data.ImFormCommodityList, { trim: true }, function(_error, result) {
            let response = result.ArrayOfImFormCommodityDTO.ImFormCommodityDTO;

            if (response === "") {
              self.getCommodityListData = [];
              self.responseSuccess = false;
            } else {
              self.getCommodityListData = response;
              self.responseSuccess = true;
            }
          });
        } else {
          showAlert("ImFormDetail.nocommdata");
        }
      } catch (erro) {
        //showAlert("common.generalerror");
      }
      self.isLoading = false;
    }),
    refreshCommodityList() {
      self.getCommodityListData = [];
    },

    refreshImFormList() {
      self.IMFormList = [];
    },
    setImFormDetail(detail) {
      self.IMFormDetail = detail;
    },
    setImFormCommodityDetail(Commoditydetail) {
      self.IMFormCommodityDetail = Commoditydetail;
    },
    setImFormFalse() {
      self.isIMFormSaved = false;
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
      "IMFormList",
      "IMFormDetail",
      "isIMFormSaved",
      "fromHome",
    ]),
  );

type ImFormStoreType = Instance<typeof ImFormModel>;
export interface ImFormStore extends ImFormStoreType {}
type ImFormStoreSnapshotType = SnapshotOut<typeof ImFormModel>;
export interface ImFormStoreSnapshot extends ImFormStoreSnapshotType {}
