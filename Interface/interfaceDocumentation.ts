/**,
 * @swagger
 * /api/demo:
 *    get:
 *      tags:
 *      - 测试
 *      summary: 测试接口
 *      produces:
 *      - application/json
 *      parameters:
 *      - name: typesOf
 *        in: query
 *        description: 类型
 *        required: false
 *        type: integer
 *        maximum:
 *        minimum: 1
 *        format:
 *      - name: howMany
 *        in: query
 *        description: 数量
 *        required: false
 *        type: integer
 *        maximum:
 *        minimum: 1
 *        format:
 *      responses:
 *        200:
 *          description: successful operation
 *          schema:
 *            ref: #/definitions/Order
 *        400:
 *          description: Invalid ID supplied
 *        404:
 *          description: Order not found
 * /api/videoToMP4:
 *    get:
 *      tags:
 *      - 格式转换
 *      summary: 视频转.mp4
 *      produces:
 *      - application/json
 *      parameters:
 *      - name: videoUrl
 *        in: query
 *        description: 视频链接
 *        required: false
 *        type: integer
 *        maximum:
 *        minimum: 1
 *        format:
 *      responses:
 *        200:
 *          description: successful operation
 *          schema:
 *            ref: #/definitions/Order
 *        400:
 *          description: Invalid ID supplied
 *        404:
 *          description: Order not found
 * */