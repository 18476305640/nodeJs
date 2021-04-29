const http = require('http');
const router = require('router');
const url = require('url');
const ejs = require('ejs');
http.createServer(function (request, response) {
    //1、尝试读取资源
    var rstatic = router.static(request, response, 'state');
    if(!rstatic) {
        console.log("-------------");
        try {
            console.log("-------s-----");

            let path_arr = url.parse(request.url).pathname.replace("/");
            console.log(path_arr);
            var suffix = path_arr[path_arr.length-1]
            console.log('suffix',suffix);
            router.mapper[suffix](request, response);
        }catch(error) {
            router.mapper['error'](request, response);
        }
    }
    
    //2、路由
    if (!rstatic) {
        let path = url.parse(request.url).pathname;
        if (path == '/login') {
            ejs.renderFile('./views/login.ejs', {}, (err, data) => {
                response.writeHead(200, { "Content-type": "text/html;charset='utf-8'" });
                response.end(data);
            });

        } else if (path == '/logon') {
            response.writeHead(200, { "Content-type": "text/html;charset='utf-8'" });
            response.end("注册页面");
        } else if (path == '/dologin') {

            response.writeHead(200, { "Content-type": "text/html;charset='utf-8'" });
            // let postData = '';
            // request.on('data', chunk => {
            //     postData += chunk;
            // })
            // request.on('end', () => {
            //     console.log('post数据：', postData);
            // })

            var query = url.parse(request.url,true).query;
            console.log('get',query.user,query.pass);
            response.end(method);

         
        } else {
            response.writeHead(404, { "Content-type": "text/html;charset='utf-8'" });
            response.end('404页面不存在')
        }
    }




}).listen(3005); console.log("server url: http://127.0.0.1:3005")




const http = require('http');
const router = require('router');
const url = require('url');
const ejs = require('ejs');
http.createServer(function (request, response) {
    //1、尝试读取资源
    var rstatic = router.static(request, response, 'state');
    //2、无对应资源时，尝试路由
    if(!rstatic) {
        try {
            let pathname = url.parse(request.url).pathname.replace("/","");
            router.mapper[pathname](request, response);
        }catch(error) {
            router.mapper['error'](request, response);
        }
    }

}).listen(3005); console.log("server url: http://127.0.0.1:3005")