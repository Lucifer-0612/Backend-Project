//this file is used to standardiz the format of response of request and error. we need to send everytime
const asyncHandler = (requestHandler)=> {
(req,res,next)=>{
    Promise.resolve(requestHandler(req,res,next)).catch((err)=> next(err))
    {

    }
}
}

export {asyncHandler}