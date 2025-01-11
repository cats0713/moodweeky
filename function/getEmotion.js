const axios = require('axios')

const getEmotion = async (content) => {
    try {
        return axios.post('http://localhost:8000/predict', {
            secretkey: "kpzzy",
            sentence: content
        })
    } catch (err) {
        console.log(err)
        return 'err'
    }
}

module.exports = {
    getEmotion
}