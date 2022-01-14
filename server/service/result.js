//封装结果数据
class Result{
    static SUCCESS = {
        code: 200,
        msg: 'OK'
    }
    static ERROR = {
        code: 500,
        msg: '服务端异常',
    }
    static success(data){
        return {
            code: this.SUCCESS.code,
            msg: this.SUCCESS.msg,
            data: data
        }
    }
    static error(errorType){
        if (!errorType || !errorType.code) {
            return Result.error(this.ERROR);
        }
        // 传入了自定义的失败状态
        return {
            code: errorType.code,
            msg: errorType.msg,
            data: null
        }
    }
}

module.exports = Result