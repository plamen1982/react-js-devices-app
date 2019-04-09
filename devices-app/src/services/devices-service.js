import { get, post, remove } from "../data/crud";

/** Class used as service for fetching data */
class DevicesService {
    /**
     * Create a baseUrl and allDevicesUrl
     */
    constructor() {
        //usualy in production baseUrl is set to ENV variable, because for the different enviroument(QA, QAI and so on) this baseUrl is going to be different
        //TODO set in ENV -> something like this -> window.URLS.DEVICE_BASE_URL

        this.baseUrl = 'http://localhost:5000';
        this.allDevicesUrl = `${this.baseUrl}/device/all`;
        this.createDeviceUrl = `${this.baseUrl}/device/create`;
        this.editDeviceUrl = `${this.baseUrl}/device/edit`;
        this.borrowDeviceUrl = `${this.baseUrl}/device/submit`;
        this.borrowDevicesByUserUrl = `${this.baseUrl}/device/user`;
        this.getUserByBorrowedDeviceUrl = `${this.baseUrl}/device`;
        this.deleteDeviceByIdUrl = `${this.baseUrl}/device/delete`;
        this.removeDeviceByIdUrl = `${this.baseUrl}/device/return`;
    }
/**
 * create device at url http://localhost:5000/device/create
 * @returns {Promise} with the data from the api at this url
 */
    createDevice(createDeviceObject) {
        return post(this.createDeviceUrl, createDeviceObject);
    }

/**
 * edit device at url http://localhost:5000/device/edit/:id
 * @returns {Promise} with the data from the api at this url
 */
editDevice(editDeviceObject, id) {
    return post(`${this.editDeviceUrl}/${id}`, editDeviceObject);
}

/**
 * edit device at url http://localhost:5000/barrow/submit/:deviceId
 * @returns {Promise} with the data from the api at this url
 */
borrowDevice(deviceId) {
    return post(`${this.borrowDeviceUrl}/${deviceId}`);
}

/**
 * edit device at url http://localhost:5000/barrow/submit/:deviceId
 * @returns {Promise} with the data from the api at this url
 */
borrowDevicesByUser() {
    return get(this.borrowDevicesByUserUrl);
}
/**
 * get all devices from url http://localhost:5000/device/all
 * @returns {Promise} with the data from the api at this url
 */
    getAllDevices() {
        return get(this.allDevicesUrl);
    }

    getUserByBorrowedDevice(deviceId) {
        return get(`${this.getUserByBorrowedDeviceUrl}/${deviceId}`)
    } 

    deleteDeviceById(deviceId) {
        return remove(`${this.deleteDeviceByIdUrl}/${deviceId}`)
    }

    returnDeviceById(deviceId) {
        return remove(`${this.removeDeviceByIdUrl}/${deviceId}`)
    }
}

export default DevicesService;