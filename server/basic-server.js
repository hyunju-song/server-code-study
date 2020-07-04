
const express = require('express');
const app = express();
const router = require('./request-handler')

app.use(router)

//const PORT = 3000;
//process.env.NODE_ENV === 'production' ? 3000: 3002
app.listen(3000,() => {
    //console.log(`server listen on 3000`)
})



