import callApi from '../helpers/apiHelper';

class FighterService {
    #endpoint = 'fighters.json';

    async getFighters() {
        try {
            const apiResult = await callApi(this.#endpoint);
            // console.log(apiResult)
            return apiResult;
        } catch (error) {
            throw error;
        }
    }

    /* eslint-disable class-methods-use-this */
    async getFighterDetails(id) {
        // todo: implement this method
        // endpoint - `details/fighter/${id}.json`;

        try {
            const apiResult = await callApi(`details/fighter/${id}.json`);
            return apiResult;
        } catch (error) {
            throw error;
        }
    }
    /* eslint-disable class-methods-use-this */
}

const fighterService = new FighterService();

export default fighterService;
