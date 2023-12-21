import httpRequest from "@/utils/httpRequest";

class AuthenService {
  async getLoginUrl() {
    return httpRequest.get<any, { invitationUrl: string }, any>("/agent/get-login-url");
  }

  async loginWithQRCode(timeOut: number) {
    return httpRequest.post("/authen/login/qr-code", {}, { timeout: timeOut * 1000 });
  }

  async getUser() {
    return httpRequest.get("/authen/get-user");
  }

  async logout() {
    return httpRequest.post("/authen/logout");
  }
}

const authenService = new AuthenService();

export default authenService;
