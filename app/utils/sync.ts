import ConsignmentModel from "../models/local-database/consignment-model"
import { useStores } from "../models/root-store"

export default class Sync {
  async initSync() {
    const { consignmentStore, authStore } = useStores()
    const consignment = new ConsignmentModel()
    const savedConsignment = await consignment.getAllSavedConsignment()
    savedConsignment.forEach(element => {
      console.log(element)
      consignmentStore.consignmentSearch(authStore.authorization, "")
    })
  }
}
