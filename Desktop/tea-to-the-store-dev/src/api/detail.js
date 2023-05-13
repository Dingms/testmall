import {get} from "@/utils/http"

export const getDetail=async(id)=>{
    let result={}
    let ret=await get('/api/detail?id='+id)
    result={code:ret.data.code,data:ret.data.data}
    return result
}