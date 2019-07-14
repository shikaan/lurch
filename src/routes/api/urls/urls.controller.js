import request from "request-promise";

export default class URLsController {
    async findAll() {
        // TODO: this has to be fixed in Wayne
        return JSON.parse(await request.get(`${process.env.WAYNE_URL}/api/urls`))
    }

    async save(body) {
        return await request.post(`${process.env.WAYNE_URL}/api/urls`, {json: body})
    }
}
