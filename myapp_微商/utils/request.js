function request(params,isHeader=false){
  return new Promise((resolve,reject)=>{
    wx.request({
      ...params,
      url:'http://localhost:5000'+params.url,
      success:(res)=>{
        if(isHeader){
          resolve(
            {
              list:res.data,
              total:res.header["X-Total-Count"]
            }
          )
        }
        else{
          resolve(res.data)
        }
        
      },
      fail:(err)=>{
        reject(err)
      }
    })
  })
}

module.exports=request