<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta http-equiv="Cache-Control" content="no-siteapp" />
    <meta name="referrer" content="always">
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no, minimal-ui">
    <meta name="msapplication-tap-highlight" content="no">
    <title>设置点赞基数</title>
    <style>
        input {
            font-size: 16px;
        }
        .input {
            width: 100px;
            padding: 5px;
            border: 1px solid #333;
            
        }
        .sub {
            padding: 5px;
            background: #333;
            border: none;
            color: #fff;
            display: block;
            margin-top: 10px;
        }
    </style>
</head>
<body>
   <form method="post">
       <p>当前实际点赞数量：{{real}}</p>
       <label for="radix">设置当前点赞基数：</label>
       <input class="input" id="radix" type="number" name="radix" value="{{radix}}">
       <input class="sub" type="submit" value="提交">
   </form>
</body>
</html>