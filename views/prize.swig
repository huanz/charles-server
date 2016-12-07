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
    <title>中奖用户列表</title>
    <style>
        table {
            border-collapse: collapse;
        }
        th,td {
            border: 1px solid #eee;
            padding: 5px;
        }
    </style>
</head>
<body>
    <table>
        <tr>
            <th>奖品</th><th>手机号</th>
        </tr>
        {% for prize in list %}
        <tr>
            <td>{{prize.praise}}</td><td><a href="tel:{{prize.phone}}">{{prize.phone}}</a></td>
        </tr>
        {% endfor %}
    </table>
</body>
</html>