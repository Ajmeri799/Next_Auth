import conf from "@/conf/conf";
import { Client, Account, ID } from "appwrite";
export class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }
  async createAccount({
    email,
    password,
    firstName,
    lastName,
  }: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        `${firstName}${lastName}`
      );
      if (userAccount) {
        // return this.login({ email, password });
        return console.log("registered");
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }
  async login({ email, password }: { email: string; password: string }) {
    try {
      await this.logout();
      const session = await this.account.createEmailPasswordSession(
        email,
        password
      );
      return session;
    } catch (error) {
      throw error;
    }
  }
  async getCurrentUser() {
    try {
      const user = await this.account.get();
      console.log("Current user:", user);
      return user;
    } catch (error) {
      console.log("Appwrite serive :: getCurrentUser :: error", error);
    }
    return null;
  }
  async logout() {
    try {
      await this.account.deleteSessions();
      console.log("User logged out");
    } catch (error) {
      console.log("Appwrite serive :: Logout :: error", error);
    }
  }
}
const authService = new AuthService();
export default authService;
