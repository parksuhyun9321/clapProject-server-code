/** api 리스폰스 */
class ResultResponse {
    /**
     * 
     * @param {number} resultCode 200 : 성공
     * @param {*} data request, response 데이터
     * @param {string} errorMsg 에러메세지 
     */
    constructor(resultCode, data, errorMsg) {
        this.resultCode = resultCode;
        this.data = data;
        this.errorMsg = errorMsg ;
    }
}

module.exports = ResultResponse