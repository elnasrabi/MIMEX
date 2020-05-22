import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const ConsignmentStoreModel = types
  .model("ConsignmentStore")
  .props({
    barCodeData: types.optional(types.frozen(), {})
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    onCodeScanned(data) {
      self.barCodeData = data
    }

  })) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
* Un-comment the following to omit model attributes from your snapshots (and from async storage).
* Useful for sensitive data like passwords, or transitive state like whether a modal is open.

* Note that you'll need to import `omit` from ramda, which is already included in the project!
*  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
*/

type ConsignmentStoreType = Instance<typeof ConsignmentStoreModel>
export interface ConsignmentStore extends ConsignmentStoreType { }
type ConsignmentStoreSnapshotType = SnapshotOut<typeof ConsignmentStoreModel>
export interface ConsignmentStoreSnapshot extends ConsignmentStoreSnapshotType { }
