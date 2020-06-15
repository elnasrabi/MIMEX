import { Instance, SnapshotOut, types } from "mobx-state-tree";
import { Api } from "../../services/api";
import { omit } from "ramda";
// const parseString = require('react-native-xml2js').parseString

/**
 * Model description here for TypeScript hints.
 */
const api = new Api();
api.setup();

export const HomeStoreModel = types
  .model("HomeStore")
  .props({
    barCodeData: types.optional(types.frozen(), {}),
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    onCodeScanned(data) {
      self.barCodeData = data;
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

  /**
   * Un-comment the following to omit model attributes from your snapshots (and from async storage).
   * Useful for sensitive data like passwords, or transitive state like whether a modal is open.
   * Note that you'll need to import `omit` from ramda, which is already included in the project!
   *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
   */
  .postProcessSnapshot(omit(["barCodeData"]));

type HomeStoreType = Instance<typeof HomeStoreModel>;
export interface HomeStore extends HomeStoreType {}
type HomeStoreSnapshotType = SnapshotOut<typeof HomeStoreModel>;
export interface HomeStoreSnapshot extends HomeStoreSnapshotType {}
