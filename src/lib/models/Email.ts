import type BaseModel from "$lib/models/BaseModel";

export default interface Email extends BaseModel {
  fromAddress?: string;
  fromName?: string;
  toAddress: string;
  subject: string;
  html: string;
  status: "pending" | "sent" | "failed";
  details?: string;
}
