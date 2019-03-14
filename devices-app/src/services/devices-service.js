class DevicesService {
    constructor() {
        //usualy in production baseUrl is set to ENV variable, because for the different enviroument(QA, QAI and so on) this baseUrl is going to be different
        // - TODO set in ENV -> something like this -> window.URLS.BOOK_BASE_URL
        this.baseUrl = 'http://localhost:5000/device';
    }
    getTopRatedDevices() {}
    getAllDevices() {}
}