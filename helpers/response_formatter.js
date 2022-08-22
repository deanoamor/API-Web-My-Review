module.exports = {

    response : function (status, message , data) {
        if(data){
            return {
                status: status,
                message: message,
                data: data
            };
        }else{
            return {
                status: status,
                message: message
            };
        }
        
    },
    
}