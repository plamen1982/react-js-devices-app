import { get } from "../data/crud";

class DevicesService {
    constructor() {
        //usualy in production baseUrl is set to ENV variable, because for the different enviroument(QA, QAI and so on) this baseUrl is going to be different
        // - TODO set in ENV -> something like this -> window.URLS.DEVICE_BASE_URL
        this.baseUrl = 'http://localhost:5000/device';
        this.allDevicesUrl = `${this.baseUrl}/all`;
    }

    getTopRatedDevices() {

    }

    getAllDevices() {
        return get(this.allDevicesUrl);
    }

}

export default DevicesService;