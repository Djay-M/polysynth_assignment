const axios = require('axios');
const { chainLink } = require('../../config/vars');

exports.fetchPrices = async () => {
    const options = {
        method: 'GET',
        url: `${chainLink.endpoint}`,
        params: {
            fsyms: chainLink.blockchains,
            tsyms: chainLink.currency,
        }
    };
    const { data: response } = await axios(options);
    return response
}