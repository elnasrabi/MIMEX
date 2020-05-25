import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"
import { Api } from '../../services/api'
// const parseString = require('react-native-xml2js').parseString
const parseString = require('react-native-xml2js').parseString

/**
 * Model description here for TypeScript hints.
 */
const api = new Api()
api.setup()

export const HomeStoreModel = types
  .model("HomeStore")
  .props({
    barCodeData: types.optional(types.frozen(), {}),
    isButtonLoading: false,
    hasError: false,
    isEmptyList: true,
    consignmentList: types.optional(types.frozen(), []),
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    onCodeScanned(data) {
      self.barCodeData = data
    },
    consignmentSearch: flow(function* consignmentSearch(authorization: string, consignmentRequest: any) {
      self.isButtonLoading = true
      try {
        const data = yield api.consignmentSearchByNumber(authorization, consignmentRequest)
        if (data.kind === "ok") {
          parseString(data.consignment, { trim: true }, function (_error, result) {
            if (self.consignmentList[0] === "") {
              self.isEmptyList = true
              self.consignmentList = []
            } else {
              self.isEmptyList = false
              self.consignmentList = result.responses.consignmentMatchingServiceResponse
            }
            // console.log(result.responses.consignmentMatchingServiceResponse)
          })
        } else {
          self.hasError = true
        }
        self.isButtonLoading = false
      } catch (erro) {
        // console.tron.log('erro', erro)
      }
    }),
    resetConsignment() {
      self.hasError = false
      self.isButtonLoading = false
      self.isEmptyList = true
    },

  })) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
* Un-comment the following to omit model attributes from your snapshots (and from async storage).
* Useful for sensitive data like passwords, or transitive state like whether a modal is open.

* Note that you'll need to import `omit` from ramda, which is already included in the project!
*  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
*/

type HomeStoreType = Instance<typeof HomeStoreModel>
export interface HomeStore extends HomeStoreType { }
type HomeStoreSnapshotType = SnapshotOut<typeof HomeStoreModel>
export interface HomeStoreSnapshot extends HomeStoreSnapshotType { }
