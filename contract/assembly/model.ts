@nearBindgen
export class CreditAccount {
  uid: string;
  accountType: string;
  creditor: string;
}

@nearBindgen
export class Response{
  success: boolean;
  data: Map<string, string>;
  message: string;
}