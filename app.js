var http = require('http');
var path = require('path');
var morgan = require('morgan');
var express = require('express');
var bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000

var app = express();

//ログ出力
app.use(morgan("combined"));

//staticフォルダを仮想パス「/static」でアクセス可能とする
app.use("/static", express.static(path.join(__dirname, "static")));

//body-parserミドルウェアをExpressにセット（Formから）取得した値を使用するため）
app.use(bodyParser.urlencoded({extended: false}));

//templatesフォルダ以下で、ejsファイルを利用するための定義
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'ejs');

//トップページアクセス時の処理
app.get("/", function(req, res){
    //index.ejsファイルを読み込みブラウザに返却
    return res.render("index");
});

//トップページからpost時の処理
app.post("/" ,function(req, res){
    console.log(req.body);

    const db = require('./db/db.js');

    db.pool.connect((err, client) => {
        if (err) {
            console.log(err);
            // res.send(err);
        } else {
        client.query('SELECT * FROM t_inspection', (err, result) => {
            console.log(result.rows);
            console.log(result.rows[1].inspection_date);
            // res.send(result.rows)
        });
        }
    });

    //result.ejsファイルにフォームから取得したbody.usernameとbody.messageをパラメータとして渡す
    return res.render("result",{username: req.body.username, message: req.body.message});
});

//WEBサーバ起動（PORTは5000）
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));

// var server = http.createServer(app);
// server.listen(3000);
