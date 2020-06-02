import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"
import { Api } from '../../services/api'
import { omit } from "ramda"
import { showAlert } from "../../utils/utils"
// const parseString = require('react-native-xml2js').parseString
const parseString = require('react-native-xml2js').parseString

/**
 * Model description here for TypeScript hints.
 */
const api = new Api()
api.setup()
/**
 * Model description here for TypeScript hints.
 */
export const ConsignmentStoreModel = types
  .model("ConsignmentStore")
  .props({
    signedSaved: false,
    isButtonLoading: false,
    hasError: false,
    isEmptyList: true,
    consignmentList: types.optional(types.frozen(), []),
    consignmentDetail: types.optional(types.frozen(), {})
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    onSigned(value) {
      self.signedSaved = value
    },
    consignmentSearch: flow(function* consignmentSearch(authorization: string, consignmentRequest: any) {
      self.isButtonLoading = true
      try {
        const data = yield api.consignmentSearchByNumber(authorization, consignmentRequest)
        if (data.kind === "ok") {
          parseString(data.consignment, { trim: true }, function (_error, result) {
            if (result.responses.consignmentMatchingServiceResponse[0] === "") {
              self.isEmptyList = true
              self.consignmentList = []
            } else {
              self.isEmptyList = false
              self.consignmentList = result.responses.consignmentMatchingServiceResponse
            }
            // console.log(result.responses.consignmentMatchingServiceResponse)
          })
        } else {
          showAlert("common.somethingWrong")
        }
        self.isButtonLoading = false
      } catch (erro) { }
    }),
    setConsignmentDetail(detail) {
      self.consignmentDetail = detail
    }

  })) // eslint-disable-line @typescript-eslint/no-unused-vars

  /**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.
  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  */
  .postProcessSnapshot(omit(["signedSaved", "isButtonLoading", "hasError", "isEmptyList", "consignmentList", "consignmentDetail"]))

type ConsignmentStoreType = Instance<typeof ConsignmentStoreModel>
export interface ConsignmentStore extends ConsignmentStoreType { }
type ConsignmentStoreSnapshotType = SnapshotOut<typeof ConsignmentStoreModel>
export interface ConsignmentStoreSnapshot extends ConsignmentStoreSnapshotType { }
