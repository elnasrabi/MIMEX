import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"
import { omit } from "ramda"
import { Api } from '../../services/api'
import UserDataModel from "../local-database/user-data-modal"
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
    isLoginLoading: false,
    isForgotLoading: false,
    shouldUpdate: false,
    hasLoginError: types.optional(types.frozen(), false),
    hasForgotError: types.optional(types.frozen(), false),
    userData: types.optional(types.frozen(), {}),
    authorization: types.optional(types.frozen(), "")
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    logout() {
      self.isLoggedIn = false
      self.userData = types.optional(types.frozen(), {})
    },
    login: flow(function* login(username: string, password: string) {
      self.isLoginLoading = true
      self.hasLoginError = false
      try {
        const data = yield api.login(username, password)
        if (data.kind === "ok") {
          parseString(data.user, async function (_error, result) {
            self.userData = result.responses.userResponse
            self.isLoggedIn = true
            const model = new UserDataModel()
            const offlineConsignment = await model.getUserData(self.userData[0].loginName[0])
            console.log(offlineConsignment)
            if (offlineConsignment.length > 0 && offlineConsignment[0].loginName === self.userData[0].loginName[0]) {
              model.addUserData(true, self.userData)
            } else {
              model.addUserData(false, self.userData)
            }
          })
          self.authorization = data.authorization
        } else {
          self.hasLoginError = true
        }
        self.isLoginLoading = false
      } catch (erro) {
        // console.tron.log('erro', erro)
      }
    }),
    forgotPassword: flow(function* forgotPassword(email: string) {
      // self.isForgotLoading = true
      // try {
      //   const data = yield api.forgotPassword(email)
      //   if (data.kind === "ok") {
      //     parseString(data.user, function (_error, result) {
      //       self.userData = result.responses.userResponse
      //       self.isLoggedIn = true
      //     })
      //   } else {
      //     self.hasForgotError = true
      //   }
      //   self.isForgotLoading = false
      // } catch (erro) {
      //   // console.tron.log('erro', erro)
      // }
    })
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

  /**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!

  */
  .postProcessSnapshot(omit(["hasForgotError", "isForgotLoading", "isLoginLoading", "hasLoginError"]))

type AuthStoreType = Instance<typeof AuthStoreModel>
export interface AuthStore extends AuthStoreType { }
type AuthStoreSnapshotType = SnapshotOut<typeof AuthStoreModel>
export interface AuthStoreSnapshot extends AuthStoreSnapshotType { }
