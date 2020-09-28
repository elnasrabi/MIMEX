import ConsignmentModel from "../models/local-database/ImForm-model";
import { useStores } from "../models/root-store";

export default class Sync {
  async initSync() {
    const { ImFormStore, authStore } = useStores();
    const consignment = new ConsignmentModel();
    const savedConsignment = await consignment.getAllSavedConsignment();
    savedConsignment.forEach(element => {
      ImFormStore.consignmentSearch(authStore.authorization, "");
    });
  }
}
