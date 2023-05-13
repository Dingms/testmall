import {get,post} from "@/utils/http"
export const selectCart=async(token)=>{
    let result={}
    let ret=await get('/api/users/cartList?token='+token)
    result={code:ret.data.code,data:ret.data.data}
    return result
}
export const removeCartItem=async(data)=>{
    let result={}
    let ret=await post('/api/removeCartItem',data)
    result={code:ret.data.code,data:ret.data.data}
    return result
}
export const changeNum=async(data)=>{
    let result={}
    let ret=await post('/api/changeNum',data)
    result={code:ret.data.code,data:ret.data.data}
    return result
}