import { post } from "../data/crud";

/** Class used as service for fetching data */
class AuthenticationService {
    /**
     * Create a baseUrl and allDevicesUrl
     */
    constructor() {
        //usualy in production baseUrl is set to ENV variable, because for the different enviroument(QA, QAI and so on) this baseUrl is going to be different
        //TODO set in ENV -> something like this -> window.URLS.DEVICE_BASE_URL

        this.baseUrl = 'http://localhost:5000/auth';
        this.loginUrl = `${this.baseUrl}/login`;
        this.signupUrl = `${this.baseUrl}/signup`;
    }

/**
 * login at http://localhost:5000/auth/login
 * @returns {Promise} with the data from the api at this url
 */
    login() {
        return post(this.loginUrl);
    }

/**
 * signup at http://localhost:5000/auth/signup
 * @returns {Promise} with the data from the api at this url
 */
signup() {
    return post(this.signupUrl);
}
}

export default AuthenticationService;