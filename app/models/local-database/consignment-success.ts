// models/Movie.js
import { Model } from "@nozbe/watermelondb"
import { field } from "@nozbe/watermelondb/decorators"

export default class ConsignmentSuccess extends Model {
  static table = "consignmentSuccess";

  @field("customerName") customerName;
  @field("userName") userName;
  @field("consignmentNumber") consignmentNumber;
  @field("itemsCount") itemsCount;
  @field("status") status;
  @field("image") image;
  @field("signBy") signBy;
  @field("signImage") signImage;
  @field("date") date;
  @field("synced") synced;

  // async addConsignment(body) {
  //   return this.collections.get("consignmentSuccess").create(consignmentSuccess => {
  //     consignmentSuccess.status = body.status
  //     consignmentSuccess.image = body.image
  //     consignmentSuccess.signBy = body.signBy
  //     consignmentSuccess.signImage = body.signImage
  //     consignmentSuccess.date = body.date
  //   })
  // }
}
