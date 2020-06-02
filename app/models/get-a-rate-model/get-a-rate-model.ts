import { Instance, SnapshotOut, types, flow, getParent } from "mobx-state-tree"
import { Api } from '../../services/api'
import { omit } from "ramda"
import { showAlert } from "../../utils/utils"
const parseString = require('react-native-xml2js').parseString


const api = new Api()
api.setup()
/**
 * Model description here for TypeScript hints.
 */
export const GetARateModelModel = types
  .model("GetARateModel")
  .props({
    isButtonLoading: types.optional(types.boolean, false),
    isEmptyList: types.optional(types.boolean, true),
    geteARateList: types.optional(types.frozen(), []),
    responseSuccess: types.optional(types.boolean, false),
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({

    getARate: flow(function* getARate(authorization: string, getARateRequest: any) {
      self.isButtonLoading = true
      try {
        const data = yield api.getACalculatedRate(authorization, getARateRequest)
        if (data.kind === "ok" && data.Status == 200) {
          parseString(data.getaRate, { trim: true }, function (_error, result) {
            if (result.responses.consignmentRateTimeServiceResponses[0] === '') {
              self.isEmptyList = false
              self.geteARateList = []
              self.responseSuccess = false
            }
            else {
              self.isEmptyList = false
              self.geteARateList = result.responses.consignmentRateTimeServiceResponses[0].consignmentRateTimeServiceResponse[0].consignmentRateTimeGroups[0].consignmentRateTimes
              self.responseSuccess = true
            }
          })
        } else {
          showAlert("common.somethingWrong")
        }
      } catch (erro) {
        // console.tron.log('erro', erro)
      }
      self.isButtonLoading = false
    }),

  })) // eslint-disable-line @typescript-eslint/no-unused-vars

  /**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.
  
  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  */
  .postProcessSnapshot(omit(["isButtonLoading", "isEmptyList", "geteARateList", "responseSuccess"]))

type GetARateModelType = Instance<typeof GetARateModelModel>
export interface GetARateModel extends GetARateModelType { }
type GetARateModelSnapshotType = SnapshotOut<typeof GetARateModelModel>
export interface GetARateModelSnapshot extends GetARateModelSnapshotType { }
