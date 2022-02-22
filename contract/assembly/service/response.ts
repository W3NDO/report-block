export default class Response{
    status: string;
    data?: object
    

    res(status: boolean, data?: any ){
        if (status == false){
            return {
                "status": "failure"
            }
        } else {
            return {
                "status": "success",
                "data": data
            }
        }
    }
}
