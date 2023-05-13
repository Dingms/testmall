import {get} from "@/utils/http"

export const getList=async()=>{
    let result={}
    let ret=await get('/api/goods/typeList')
    result={code:ret.data.code,data:ret.data.data}
    return result
}