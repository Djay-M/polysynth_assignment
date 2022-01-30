const { 
  fetchLRUCache,
  fetchKey,
  setKey,
 } = require('../../utils/cache/lruCaching');

exports.fetchCacheData = async (req, res, next) => {
    try {
      const cache = await fetchLRUCache();
      return res.status(200).json({
        code: 200,
        message: 'fetched the cache data successfully',
        cache,
      });
    } catch (error) {
      return next(error);
    }
};

exports.fetchKey = async (req, res, next) => {
  try {
    const key = req.params.key
    if(!key){
      return res.status(401).json({
        code: 401,
        message: 'please provide the key in req.params',
      });
    }
    const cache = await fetchKey(key);
    return res.status(200).json({
      code: 200,
      message: cache ? 'fetched the key from cache successfully' : 'No data found for the key in cache',
      cache,
    });
  } catch (error) {
    return next(error);
  }
};

exports.setKey = async (req, res, next) => {
  try {
    const { key, value } = req.body
    if(!key || !value){
      return res.status(401).json({
        code: 401,
        message: 'please provide required parameter key and value in req.body',
      });
    }
    await setKey(key, value);
    return res.status(200).json({
      code: 200,
      message: 'updated the cache successfully',
      data: {
        key,
        value,
      }
    });
  } catch (error) {
    return next(error);
  }
};