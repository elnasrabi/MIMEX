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
export const ExFormModel = types
  .model("ExFormStore")
  .props({
    signedSaved: false,
    isButtonLoading: false,
    isLoading: false,
    hasError: false,
    isEmptyList: true,
    DocumentCode: types.optional(types.frozen(), 0),
    FormNo: "",
    isExFormSaved: false,
    ExFormList: types.optional(types.frozen(), []),
    DetailSearch: types.optional(types.frozen(), []),
    ExFormDetail: types.optional(types.frozen(), {}),
    ExFormCommodityDetail: types.optional(types.frozen(), {}),
    city: "",
    district: "",
    sync: false,
    locationEnableCanceled: false,
    fromHome: false,
    responseSuccess: types.optional(types.boolean, false),
    getExListData: types.optional(types.frozen(), []),
    getCommodityListData: types.optional(types.frozen(), []),
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    onSigned(value) {
      self.signedSaved = value;
    },
    ExFormSearch: flow(function* ExFormSearch(authorization: string, ExFormRequest: any) {
      self.isButtonLoading = true;
      self.isEmptyList = false;
      try {
        const data = yield api.ExFormSearchByNumber(authorization, ExFormRequest);

        if (data.kind === "ok") {
          parseString(data.ExForm, { trim: true }, function(_error, result) {
            let returnData = result.ArrayOfExFormDTO.ExFormDTO;
            self.DetailSearch = returnData;
            if (returnData === "") {
              self.isEmptyList = true;
              self.ExFormList = [];
            } else {
              self.isEmptyList = false;
              self.ExFormList = returnData;
            }
          });
        } else {
          self.ExFormList = [];
          self.isEmptyList = true;
          showAlert("ExFormList.noData");
        }
        self.isButtonLoading = false;
      } catch (erro) {
        //showAlert("common.generalerror");
      }
    }),
    GetDetails: flow(function* GetDetails(authorization: string, ExFormRequest: any) {
      self.isButtonLoading = true;
      self.isEmptyList = false;
      try {
        const data = yield api.ExFormSearchByNumber(authorization, ExFormRequest);

        if (data.kind === "ok") {
          parseString(data.ExForm, { trim: true }, function(_error, result) {
            let returnData = result.ArrayOfExFormDTO.ExFormDTO;
            self.DetailSearch = returnData;
            if (returnData === "") {
              self.isEmptyList = true;
              self.ExFormList = [];
            } else {
              self.isEmptyList = false;
              self.DetailSearch = returnData;
            }
          });
        } else {
          self.ExFormList = [];
          self.isEmptyList = true;
          showAlert("ExFormList.noData");
        }
        self.isButtonLoading = false;
      } catch (erro) {
        //showAlert("common.generalerror");
      }
    }),
    getExList: flow(function* getExList(authorization: string, getListRequest: any) {
      self.isLoading = true;
      self.responseSuccess = true;
      try {
        const data = yield api.getExList(authorization, getListRequest);

        if (data.kind === "ok" && data.Status == 200) {
          parseString(data.getExList, { trim: true }, function(_error, result) {
            let response = result.ArrayOfExFormDTO.ExFormDTO;
            if (response === "") {
              self.getExListData = [];
              self.responseSuccess = false;
            } else {
              self.getExListData = response;
              self.responseSuccess = true;
            }
          });
        } else {
          showAlert("common.noData");
        }
      } catch (erro) {}
      self.isLoading = false;
    }),
    getExFormsByContract: flow(function* getExFormsByContract(
      authorization: string,
      contractcode: any,
    ) {
      self.isLoading = true;
      self.responseSuccess = true;
      try {
        const data = yield api.getExFormByContractList(authorization, contractcode);

        if (data.kind === "ok" && data.Status == 200) {
          parseString(data.getExList, { trim: true }, function(_error, result) {
            let response = result.ArrayOfExFormDTO.ExFormDTO;
            if (response === "") {
              self.ExFormList = [];
              self.responseSuccess = false;
            } else {
              self.ExFormList = response;
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
      self.getExListData = [];
    },
    getExCommodityList: flow(function* getExCommodityList(
      authorization: string,
      getComListRequest: any,
    ) {
      self.isLoading = true;
      self.responseSuccess = true;
      try {
        const data = yield api.getExFormCommodityList(authorization, getComListRequest);

        if (data.kind === "ok") {
          parseString(data.ExFormCommodityList, { trim: true }, function(_error, result) {
            let response = result.ArrayOfExFormCommodityDTO.ExFormCommodityDTO;

            if (response === "") {
              self.getCommodityListData = [];
              self.responseSuccess = false;
            } else {
              self.getCommodityListData = response;
              self.responseSuccess = true;
            }
          });
        } else {
          showAlert("ExFormDetail.nocommdata");
        }
      } catch (erro) {
        //showAlert("common.generalerror");
      }
      self.isLoading = false;
    }),
    refreshCommodityList() {
      self.getCommodityListData = [];
    },
    refreshExFormList() {
      self.ExFormList = [];
    },
    setExFormDetail(detail) {
      self.ExFormDetail = detail;
    },
    setExFormCommodityDetail(Commoditydetail) {
      self.ExFormCommodityDetail = Commoditydetail;
    },
    setExFormFalse() {
      self.isExFormSaved = false;
    },
    startSyncing() {
      self.sync = true;
    },
    SetDocumentCode(code) {
      self.DocumentCode = code;
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
      "ExFormList",
      "ExFormDetail",
      "isExFormSaved",
      "fromHome",
    ]),
  );

type ExFormStoreType = Instance<typeof ExFormModel>;
export interface ExFormStore extends ExFormStoreType {}
type ExFormStoreSnapshotType = SnapshotOut<typeof ExFormModel>;
export interface ExFormStoreSnapshot extends ExFormStoreSnapshotType {}
