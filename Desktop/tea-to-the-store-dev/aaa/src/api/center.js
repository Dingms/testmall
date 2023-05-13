import { post } from "@/utils/http"
export const selectUser=async(userInfo)=>{
    let result={}
    let ret=await post('/api/users/selectUser',userInfo)
    result={code:ret.data.code,data:ret.data.data}
    return result
}
