const express = require('express');
const controller = require('../controllers/cache.controller');

const router = express.Router();

router
  .route('/api/cache')
  /**
   * @api {get} /cache Fetch all cache data
   * @apiDescription Fetch all cache data
   * @apiVersion 1.0.0
   * @apiName fetchCache
   * @apiGroup cache
   * 
   * @apiSuccess {JSON} cache data
   *
   */
  .get(controller.fetchCacheData);

router
  .route('/api/cache/:key')
  /**
   * @api {get} /cache Fetch key from cache
   * @apiDescription Fetch key from cache
   * @apiVersion 1.0.0
   * @apiName fetchKey
   * @apiGroup cache
   * 
   * @apiSuccess {JSON} cache data
   *
   */
  .get(controller.fetchKey);

router
  .route('/api/cache')
  /**
   * @api {post} /cache sets a key into cache
   * @apiDescription sets a key into cache
   * @apiVersion 1.0.0
   * @apiName setKey
   * @apiGroup cache
   * 
   * @apiSuccess {JSON} response data
   *
   */
  .post(controller.setKey);

module.exports = router;