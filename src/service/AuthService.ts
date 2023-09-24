import type { AxiosRequestConfig } from "axios";
import { httpUtil } from "@/util/http_util";
import type { LoginRequest } from "@/interfaces/custom";
import type { User } from "@/interfaces/custom";

class AuthService {
  /** Login using custom JSON login */
  loginUser({ email, password, responseToken }: LoginRequest) {
    const url = "/auth/signIn";
    const body = { email, password };
    return httpUtil.post(url, body, { params: { responseToken: responseToken } });
  }

  /** Register submits form to Server */
  registerUser(load: Partial<User>) {
    return httpUtil.post("/auth/signUp", load);
  }
}

export default new AuthService();
