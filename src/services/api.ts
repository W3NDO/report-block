import { connect, Contract, keyStores, WalletConnection } from "near-api-js";
import React from "react";
import getConfig from "../config";

const nearConfig = getConfig(process.env.NODE_ENV || "development");

export default class ApiService {
  walletConnection: WalletConnection;
  accountId: string | null;
  userType: UserType;
  contract: Contract;

  async initContract() {
    const near = await connect(
      Object.assign(
        { deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() } },
        nearConfig
      )
    );

    this.walletConnection = new WalletConnection(near, null);
    this.accountId = this.walletConnection.getAccountId();

    this.contract = new Contract(
      this.walletConnection.account(),
      nearConfig.contractName,
      {
        viewMethods: ["getFile", "getScore"],
        changeMethods: [
          "accountOpened",
          "accountClosed",
          "paymentReceived",
          "paymentMissed",
          "disputeCreated",
          "disputeUpdated",
        ],
      }
    );
  }

  static UserTypeKey = "blockreport_ut";

  async login(type: UserType, callback?: () => any) {
    this.userType = type;
    localStorage.setItem(ApiService.UserTypeKey, type);

    try {
      this.walletConnection.requestSignIn(nearConfig.contractName);
      if (callback) callback();
    } catch (err) {
      console.log(err);
    }
  }

  logout() {
    this.walletConnection.signOut();
    this.accountId = null;
    localStorage.remove(ApiService.UserTypeKey);
  }

  get isLoggedIn(): boolean {
    if (this.accountId) {
      this.userType = localStorage.getItem(ApiService.UserTypeKey) as UserType;
    }

    return !!this.accountId && !!this.userType;
  }
}

export enum UserType {
  Bureau = "bureau",
  Lender = "lender",
  Consumer = "consumer",
}

export const ApiContext = React.createContext({} as ApiService);
