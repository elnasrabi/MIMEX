import { Instance, SnapshotOut, types, flow } from "mobx-state-tree";
import { Api } from '../../services/api';
import { omit } from "ramda";
import { showAlert } from "../../utils/utils";
const parseString = require('react-native-xml2js').parseString;

const api = new Api();
api.setup();

/**
 * Model description here for TypeScript hints.
 */
export const GetARateModel = types
  .model("GetARateModel")
  .props({
    isButtonLoading: types.optional(types.boolean, false),
    geteARateList: types.optional(types.frozen(), []),
    responseSuccess: types.optional(types.boolean, false),
    preventRefresh: types.optional(types.boolean, false)
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({

    updatePreventrefersh(value) {
      self.preventRefresh = value
    },

    getARate: flow(function* getARate(authorization: string, getARateRequest: any) {
      self.isButtonLoading = true;
      try {
        const data = yield api.getACalculatedRate(authorization, getARateRequest);
        if (data.kind === "ok" && data.Status == 200) {
          parseString(data.getaRate, { trim: true }, function (_error, result) {
            let response = result.responses.consignmentRateTimeServiceResponses[0];
            if (response === '') {
              self.geteARateList = [];
              self.responseSuccess = false;
            }
            else {
              self.geteARateList = response.consignmentRateTimeServiceResponse[0].consignmentRateTimeGroups[0].consignmentRateTimes;
              self.responseSuccess = true;
            }
          })
        } else {
          showAlert("common.somethingWrong");
        }
      } catch (erro) { }
      self.isButtonLoading = false;
    }),

  })) // eslint-disable-line @typescript-eslint/no-unused-vars

  /**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.
  
  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  */
  .postProcessSnapshot(omit(["isButtonLoading", "geteARateList", "responseSuccess", "preventRefresh"]))

type GetARateModelType = Instance<typeof GetARateModel>
export interface GetARateModel extends GetARateModelType { }
type GetARateModelSnapshotType = SnapshotOut<typeof GetARateModel>
export interface GetARateModelSnapshot extends GetARateModelSnapshotType { }
