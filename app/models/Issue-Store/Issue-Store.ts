import { flow, Instance, SnapshotOut, types } from "mobx-state-tree";
import { omit } from "ramda";
import { Api } from "../../services/api";
import { showAlert } from "../../utils/utils";
import issuedbModel from "../local-database/Issue-model";
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
export const IssueModel = types
  .model("IssueStore")
  .props({
    isButtonLoading: false,
    isLoading: false,
    hasError: false,
    isEmptyList: true,
    isIssueSaved: false,
    isIssueDeleted: false,
    IssueList: types.optional(types.frozen(), []),
    IssueListData: types.optional(types.frozen(), []),
    IssueDetail: types.optional(types.frozen(), {}),
    fromHome: false,
    sync: false,
    responseSuccess: types.optional(types.boolean, false),
    responseHelpSuccess: types.optional(types.boolean, false),
    getListData: types.optional(types.frozen(), []),
    getHelpListData: types.optional(types.frozen(), []),
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    IssueSearch: flow(function* IssueSearch(IssueNo: string, LoginName: any, password: string) {
      self.isButtonLoading = true;
      self.responseSuccess = true;
      try {
        const data = yield api.IssueSearchByNumber(IssueNo, LoginName, password);

        if (data.kind === "ok") {
          parseString(data.Issue, { trim: true }, function(_error, result) {
            let response = result.ArrayOfvIssue.vIssue;
            if (response === "") {
              self.IssueListData = [];
              self.responseSuccess = false;
            } else {
              self.IssueListData = response;
              self.responseSuccess = true;
            }
          });
        } else {
          showAlert("common.noData");
        }
        self.isButtonLoading = false;
      } catch (erro) {
        //showAlert("common.generalerror");
      }
    }),
    getIssueList: flow(function* getIssueList(loginName: string, password: string) {
      self.isLoading = true;
      self.responseSuccess = true;
      try {
        const data = yield api.getIssueList(loginName, password);

        if (data.kind === "ok" && data.Status == 200) {
          parseString(data.IssueList, { trim: true }, function(_error, result) {
            let response = result.ArrayOfvIssue.vIssue;
            if (response === "") {
              self.getListData = [];
              self.responseSuccess = false;
            } else {
              self.getListData = response;
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
    getHelpList: flow(function* getHelpList(isbank: string) {
      self.isLoading = true;
      self.responseHelpSuccess = true;
      try {
        const data = yield api.getHelpList(isbank);

        if (data.kind === "ok" && data.Status == 200) {
          parseString(data.HelpList, { trim: true }, function(_error, result) {
            let response = result.ArrayOfHelpDTO.HelpDTO;
            if (response === "") {
              self.getHelpListData = [];
              self.responseHelpSuccess = false;
            } else {
              self.getHelpListData = response;
              self.responseHelpSuccess = true;
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
      self.getListData = [];
    },
    refreshHelpList() {
      self.getHelpListData = [];
    },

    saveIssue: flow(function* saveIssue(IssueRequest: any) {
      self.isButtonLoading = true;
      self.isIssueSaved = true;
      try {
        const data = yield api.saveIssue(IssueRequest);
        if (data.kind === "ok") {
          parseString(data.Issue, { trim: true }, function(_error, result) {
            self.isIssueSaved = true;
          });
        } else {
          showAlert("common.noData");
          self.isIssueSaved = false;
        }
        self.isButtonLoading = false;
      } catch (erro) {
        showAlert("common.generalerror");
        self.isButtonLoading = false;
      }
    }),

    DeleteIssue: flow(function* DeleteIssue(IssueCode: any) {
      self.isButtonLoading = true;
      self.isIssueDeleted = true;
      try {
        const data = yield api.DeleteIssue(IssueCode);
        if (data.kind === "ok") {
          parseString(data.Issue, { trim: true }, function(_error, result) {
            self.isIssueDeleted = true;
          });
        } else {
          showAlert("common.noData");
          self.isIssueDeleted = false;
        }
        self.isButtonLoading = false;
      } catch (erro) {
        showAlert("common.generalerror");
        self.isButtonLoading = false;
      }
    }),
    saveIssueOffline: flow(function* saveIssueOffline(
      authorization: string,
      IssueRequest: any,
      id: string,
    ) {
      self.sync = true;
      try {
        const data = yield api.saveIssue(IssueRequest);
        if (data.kind === "ok") {
          const modal = new issuedbModel();
          modal.deleteIssue(id);
          parseString(data.Issue, { trim: true }, function(_error, result) {});
        } else {
          showAlert("common.noData");
        }
        self.sync = false;
      } catch (erro) {
        showAlert("common.generalerror");
        self.sync = false;
      }
    }),

    setIssueDetail(detail) {
      self.IssueDetail = detail;
    },
    setIssueFalse() {
      self.isIssueSaved = false;
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
      "IssueList",
      "IssueDetail",
      "isIssueSaved",
      "fromHome",
    ]),
  );

type IssueStoreType = Instance<typeof IssueModel>;
export interface IssueStore extends IssueStoreType {}
type IssueStoreSnapshotType = SnapshotOut<typeof IssueModel>;
export interface IssueStoreSnapshot extends IssueStoreSnapshotType {}
