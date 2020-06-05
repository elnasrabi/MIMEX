import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"
import { Api } from "../../services/api";
import { showAlert } from "../../utils/utils";
import { omit } from "ramda";
const parseString = require('react-native-xml2js').parseString;

const api = new Api();
api.setup();
/**
 * Model description here for TypeScript hints.
 */
export const MyListModel = types
  .model("MyList")
  .props({
    isLoading: types.optional(types.boolean, false),
    responseSuccess: types.optional(types.boolean, false),
    getList: types.optional(types.frozen(), [])
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({

    getList: flow(function* getList(authorization: string, getListRequest: any) {
      self.isLoading = true;
      try {
        const data = yield api.getACalculatedRate(authorization, getListRequest);
        if (data.kind === "ok" && data.Status == 200) {
          parseString(data.getaRate, { trim: true }, function (_error, result) {
            let response = result.responses.consignmentMatchingServiceResponse[0].consignmentMatchingConsignment;
            if (response === '') {
              self.getList = [];
              self.responseSuccess = false;
            }
            else {
              self.getList = response;
              self.responseSuccess = true;
            }
          })
        } else {
          showAlert("common.somethingWrong");
        }
      } catch (erro) { }
      self.isLoading = false;
    }),

  })) // eslint-disable-line @typescript-eslint/no-unused-vars

  /**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.
  
  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  */
  .postProcessSnapshot(omit(["isLoading", "responseSuccess"]))

type MyListType = Instance<typeof MyListModel>
export interface MyList extends MyListType { }
type MyListSnapshotType = SnapshotOut<typeof MyListModel>
export interface MyListSnapshot extends MyListSnapshotType { }
