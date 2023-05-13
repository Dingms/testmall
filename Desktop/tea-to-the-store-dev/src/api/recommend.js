import {get} from "@/utils/http"

export const getRecommend=async()=>{
    let result={}
    let ret=await get('/api/recommend')
    result={code:ret.data.code,data:ret.data.data}
    return result
}