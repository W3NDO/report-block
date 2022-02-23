const ContractMethods = {
  View: {
    GetAccount: "getCreditAccount",
    GetFile: "getCreditFile",
    GetScore: "getCreditScore"
  },
  Change: {
    OpenAccount: "accountOpened",
    UpdateAccount: "accountUpdated",
    CloseAccount: "accountClosed",
    ReceivePayment: "paymentReceived",
    MissPayment: "paymentMissed",
    CreateDispute: "disputeCreated",
    UpdateDispute: "disputeUpdated",
    CloseDispute: "disputeClosed",
  }
};

export default ContractMethods;