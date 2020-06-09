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
    getTownData: types.optional(types.frozen(), []),
    getState: types.optional(types.string, ''),
    getCountry: types.optional(types.string, ''),
    responseSuccess: types.optional(types.boolean, false),
    preventRefresh: types.optional(types.boolean, false)
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({

    updatePreventrefersh(value) {
      self.preventRefresh = value;
    },

    getTownApi: flow(function* getTownApi(townPostalCode: any) {
      self.isButtonLoading = true;
      try {
        const data = yield api.getTownAPI(townPostalCode);
        if (data.kind === 'ok' && data.Status == 200) {
          let response = data.getTownData.results[0]
          if (data.getTownData.status == 'OK') {
            self.getTownData = response.postcode_localities
            self.getState = response.address_components[response.address_components.length - 2].short_name
            self.getCountry = response.address_components[response.address_components.length - 1].short_name
          }
          else {
            self.getTownData = []
          }
        } else {
          showAlert("common.somethingWrong");
        }
      } catch (erro) { }
      self.isButtonLoading = false;
    }),

    getARate: flow(function* getARate(authorization: string, getARateRequest: any) {
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
    }),

  })) // eslint-disable-line @typescript-eslint/no-unused-vars

  /**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.
  
  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  */
  .postProcessSnapshot(omit(["isButtonLoading", "geteARateList", "responseSuccess", "preventRefresh", "getState", "getCountry", "getTownData"]))

type GetARateModelType = Instance<typeof GetARateModel>
export interface GetARateModel extends GetARateModelType { }
type GetARateModelSnapshotType = SnapshotOut<typeof GetARateModel>
export interface GetARateModelSnapshot extends GetARateModelSnapshotType { }
