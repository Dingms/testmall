import axios from "axios";
const instance=axios.create({
    timeout:10000
})
export const get=(url,config={})=>instance.get(url,config)
export const post=(url,data={},config={})=>instance.post(url,data,config)