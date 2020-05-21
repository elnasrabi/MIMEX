import { AuthStoreModel } from "../../models/auth-store"
import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { HomeStoreModel } from "../home-store"
import { ConsignmentStoreModel } from "../consignment-store"

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  authStore: types.optional(AuthStoreModel, {}),
  homeStore: types.optional(HomeStoreModel, {}),
  consignmentStore: types.optional(ConsignmentStoreModel, {}),

})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> { }

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> { }
