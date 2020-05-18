import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"
import { omit } from "ramda"
import { Api } from '../../services/api'
const parseString = require('react-native-xml2js').parseString

/**
 * Model description here for TypeScript hints.
 */
const api = new Api()
api.setup()
export const AuthStoreModel = types
  .model("AuthStore")
  .props({
    isLoggedIn: false,
    isLoading: false,
    shouldUpdate: false,
    hasError: types.optional(types.frozen(), false),
    userData: types.optional(types.frozen(), {})
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    logout() {
      self.isLoggedIn = false
      self.userData = types.optional(types.frozen(), {})
    },
    login: flow(function* login(username: string, password: string) {
      self.isLoading = true
      try {
        const data = yield api.login(username, password)
        if (data.kind === "ok") {
          parseString(data.user, function (_error, result) {
            self.userData = result.responses.userResponse
            self.isLoggedIn = true
          })
        } else {
          self.hasError = true
        }
        self.isLoading = false
      } catch (erro) {
        console.tron.log('erro', erro)
      }
    }),
    resetAuth() {
      self.hasError = false
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

  /**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!

  */
  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))

type AuthStoreType = Instance<typeof AuthStoreModel>
export interface AuthStore extends AuthStoreType { }
type AuthStoreSnapshotType = SnapshotOut<typeof AuthStoreModel>
export interface AuthStoreSnapshot extends AuthStoreSnapshotType { }
