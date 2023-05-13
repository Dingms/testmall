import {post} from "@/utils/http"

export const PhoneLogin=async(username)=>{
    let result={}
    let ret=await post('/api/users/phoneLogin',username)
    result={code:ret.data.code,data:ret.data.data}
    return result
}
export const addUser=async(username)=>{
    let result={}
    let ret=await post('/api/users/addUser',username)
    result={code:ret.data.code,data:ret.data.data}
    return result
}
export const passLogin=async(userInfo)=>{
    let result={}
    let ret=await post('/api/users/passLogin',userInfo)
    result={code:ret.data.code,data:ret.data.data}
    return result
}
export const register=async(userInfo)=>{
    let result={}
    let ret=await post('/api/users/register',userInfo)
    result={code:ret.data.code,data:ret.data.data}
    return result
}
