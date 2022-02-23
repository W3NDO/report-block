import ContractMethods from "../utils/contract-methods";
import fieldsPrompt from "../utils/fields-prompt";
import ApiService from "./api.service";

export default class BureauService {
  constructor(private api: ApiService) {}

  async openAccount(): Promise<Response | void> {
    const fields = fieldsPrompt([
      "accountId",
      "uid",
      "accountType",
      "creditor",
    ]);
    if (!fields) return;

    try {
      const result = await this.api.contract[
        ContractMethods.Change.OpenAccount
      ](fields);
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  async getFile(): Promise<Response | void> {
    const fields = fieldsPrompt(["accountId"]);
    if (!fields) return;

    try {
      const result = await this.api.contract[ContractMethods.View.GetAccount](
        fields
      );
      return result as Response;
    } catch (err) {
      console.log(err);
    }
  }
}

export interface Response {
  success: boolean;
  data: object;
  message: string;
}
