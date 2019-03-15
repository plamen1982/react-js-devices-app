import { get, post, put } from "../data/crud";

/** Class used as service for fetching data */
class DevicesService {
    /**
     * Create a baseUrl and allDevicesUrl
     */
    constructor() {
        //usualy in production baseUrl is set to ENV variable, because for the different enviroument(QA, QAI and so on) this baseUrl is going to be different
        //TODO set in ENV -> something like this -> window.URLS.DEVICE_BASE_URL

        this.baseUrl = 'http://localhost:5000/device';
        this.allDevicesUrl = `${this.baseUrl}/all`;
        this.createDeviceUrl = `${this.baseUrl}/create`
        this.editDeviceUrl = `${this.baseUrl}/edit`
    }
/**
 * create device at url http://localhost:5000/device/create
 * @returns {Promise} with the data from the api at this url
 */
    createDevice(createDeviceObject) {
        return post(this.createDeviceUrl, createDeviceObject)
    }

/**
 * edit device at url http://localhost:5000/device/edit/:id
 * @returns {Promise} with the data from the api at this url
 */
editDevice(editDeviceObject) {
    const { id } = editDeviceObject;
    return post(`${this.editDeviceUrl}/${id}`, editDeviceObject);
}

/**
 * get all devices from url http://localhost:5000/device/all
 * @returns {Promise} with the data from the api at this url
 */
    getAllDevices() {
        return get(this.allDevicesUrl);
    }

}

export default DevicesService;