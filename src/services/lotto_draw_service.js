import axios from 'axios';
class LottoDrawService {
    constructor() {
        this.request = axios.create({baseURL: 'http://localhost:3000/api/v1/'})
    }

    getLottoDraws = async () => {
        return this.request.get(`draw_reports`).then(result=>
            result.data).catch(error=>error.error)
    }

    postLottoDraw = async (files) => {
        let data = new FormData()
        for(let a = 0; a < files.length;a++){
            data.append(`files[${a}]`, files[a])
        }

        return this.request.post(`draw_reports`, data, {headers: {'Content-Type': 'multipart/form-data'}}).then(response=>{
                return response.data
        }).catch((error)=>{
            return error.error
        })
    }
}

export default LottoDrawService

