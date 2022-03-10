import axios from 'axios'

const instance  =  axios.create({
    baseURL:process.env.REACT_APP_BASE_URL,
    // timeout:3000
});

// instance.interceptors.request.use((req)=>{
//     // console.log(req)
//     return req;
// },(err)=>{
//     // console.log(err.message);
//     return Promise.reject(err);
// })

// instance.interceptors.response.use((res)=>{
//     if(res.status===201)
//     // {console.log(res.resText)
//     // console.log("from post interceptors")}
//     return res;
// },(err)=>{
//     return Promise.reject(err);
// })

export default instance;