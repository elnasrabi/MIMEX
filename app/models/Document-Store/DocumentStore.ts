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
export const DocumentModel = types
  .model("DocumentStore")
  .props({
    signedSaved: false,
    isButtonLoading: false,
    isLoading: false,
    hasError: false,
    isEmptyList: true,
    FormNo: "",
    DocumentCode: types.optional(types.frozen(), 0),
    isDocumentSaved: false,
    DocumentList: types.optional(types.frozen(), []),
    DocumentDetail: types.optional(types.frozen(), {}),
    DocumentName: types.optional(types.frozen(), "Untitled"),
    DocumentCommodityDetail: types.optional(types.frozen(), {}),
    city: "",
    district: "",
    sync: false,
    locationEnableCanceled: false,
    fromHome: false,
    responseSuccess: types.optional(types.boolean, false),
    getDocumentListData: types.optional(types.frozen(), []),
    getCommodityListData: types.optional(types.frozen(), []),
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    DocumentSearch: flow(function* DocumentSearch(authorization: string, DocumentRequest: any) {
      self.isButtonLoading = true;
      self.isEmptyList = false;
      try {
        const data = yield api.DocumentSearchByNumber(authorization, DocumentRequest);

        if (data.kind === "ok") {
          parseString(data.Document, { trim: true }, function(_error, result) {
            let returnData = result.ArrayOfSuppoertedDocumentDTO.SuppoertedDocumentDTO;
            if (returnData === "") {
              self.isEmptyList = true;
              self.DocumentList = [];
            } else {
              self.isEmptyList = false;
              self.DocumentList = returnData;
            }
          });
        } else {
          self.DocumentList = [];
          self.isEmptyList = true;
        }
        self.isButtonLoading = false;
      } catch (erro) {
        showAlert("DocumentList.noData");
      }
    }),

    getDocumentList: flow(function* getDocumentList(authorization: string, getListRequest: any) {
      self.isLoading = true;
      self.responseSuccess = true;
      try {
        const data = yield api.getDocumentList(authorization);
        if (data.kind === "ok") {
          parseString(data.getDocumentList, { trim: true }, function(_error, result) {
            let response = result.ArrayOfSuppoertedDocumentDTO.SuppoertedDocumentDTO;
            if (response === "") {
              self.getDocumentListData = [];
              self.responseSuccess = false;
            } else {
              self.getDocumentListData = response;
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
      self.getDocumentListData = [];
    },

    DocumentSearchByCode: flow(function* DocumentSearch(
      authorization: string,
      DocumentRequest: any,
    ) {
      self.isButtonLoading = true;
      self.isEmptyList = false;
      try {
        const data = yield api.DocumentSearchByCode(authorization, DocumentRequest);

        if (data.kind === "ok") {
          parseString(data.Document, { trim: true }, function(_error, result) {
            let returnData = result.ArrayOfSuppoertedDocumentDTO.SuppoertedDocumentDTO;
            if (returnData === "") {
              self.isEmptyList = true;
              self.DocumentList = [];
            } else {
              self.isEmptyList = false;
              self.DocumentList = returnData;
            }
          });
        } else {
          self.DocumentList = [];
          self.isEmptyList = true;
          showAlert("DocumentList.noData");
        }
        self.isButtonLoading = false;
      } catch (erro) {
        //showAlert("common.generalerror");
      }
    }),

    setDocumentDetail(detail) {
      self.DocumentDetail = detail;
    },
    setDocumentName(detail) {
      self.DocumentName = detail;
    },
    setDocumentCommodityDetail(Commoditydetail) {
      self.DocumentCommodityDetail = Commoditydetail;
    },
    setDocumentFalse() {
      self.isDocumentSaved = false;
    },
    setDocumentCode(code) {
      self.DocumentCode = code;
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
      "DocumentList",
      "DocumentDetail",
      "isDocumentSaved",
      "fromHome",
    ]),
  );

type DocumentStoreType = Instance<typeof DocumentModel>;
export interface DocumentStore extends DocumentStoreType {}
type DocumentStoreSnapshotType = SnapshotOut<typeof DocumentModel>;
export interface DocumentStoreSnapshot extends DocumentStoreSnapshotType {}
