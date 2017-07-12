# easemob-api

## TODO
- 参数处理
- 接口遍历测试


## 错误
- HTTP 返回码（Status Code）	说明（Description）
- 400	（错误请求）服务器不理解请求的语法。
- 401	（未授权）请求要求身份验证。对于需要token的接口，服务器可能返回此响应。
- 403	（禁止）服务器拒绝请求。对于群组/聊天室服务，表示本次调用不符合群组/聊天室操作的正确逻辑，例如调用添加成员接口，添加已经在群组里的用户，或者移除聊天室中不存在的成员等操作。
- 404	（未找到）服务器找不到请求的接口。
- 408	（请求超时）服务器等候请求时发生超时。
- 413	（请求体过大）请求体超过了5kb，拆成更小的请求体重试即可。
- 429	（服务不可用）请求接口超过调用频率限制，即接口被限流。
- 500	（服务器内部错误）服务器遇到错误，无法完成请求。
- 501	（尚未实施）服务器不具备完成请求的功能。例如，服务器无法识别请求方法时可能会返回此代码。
- 502	（错误网关）服务器作为网关或代理，从上游服务器收到无效响应。
- 503	（服务不可用）请求接口超过调用频率限制，即接口被限流。
- 504	（网关超时）服务器作为网关或代理，但是没有及时从上游服务器收到请求。
- HTTP Status Code	Error	Error Description	可能原因
- 400	invalid_grant	invalid username or password	用户名或者密码输入错误
- 400	organization_application_not_found	“Could not find application for easemob-demo/aachatdemoui from URI: easemob-demo/aachatdemoui/users”	找不到aachatdemoui对应的APP，可能是URL写错了
- 400	illegal_argument	“Entity user requires a property named username”	创建用户请求体未提供”username”
- 400	illegal_argument	“password or pin must provided”	创建用户请求体未提供”password”
- 400	json_parse	“Unexpected character (‘=’ (code 61)): was expecting a colon to separate field name and value\n at ”	发送请求时请求体不符合标准的JSON格式，服务器无法正确解析
- 400	illegal_argument	“password or pin must provided”	注册用户时json中提供了password但是值为空字符
- 400	duplicate_unique_property_exists	“Application 4d7e4ba0-dc4a-11e3-90d5-e1ffbaacdaf5Entity user requires that property named username be unique, value of dddd exists”	用户名已存在，dddd这个用户名在该APP下已经存在
- 400	illegal_argument	“newpassword is required”	修改用户密码的请求体没提供newpassword属性
- 400	illegal_argument	“group member username1 doesn’t exist”	批量添加群组时预加入群组的新成员username不存在
- 401	unauthorized	“registration is not open, please contact the app admin”	APP的用户注册模式为授权注册，但是注册用户时请求头没带token
- 401	auth_bad_access_token	“Unable to authenticate due to corrupt access token”	发送请求时使用的token错误。注意：不是token过期
- 401	auth_bad_access_token	“Unable to authenticate”	无效token，符合token的格式，但是该token不是接受请求的系统生成的，系统无法识别该token
- 401 “Unable to authenticate due to expired access token”	token过期
- 404	service_resource_not_found	“Service resource not found”	URL指定的资源不存在
- 413	Request Entity Too Large	“Request Entity Too Large”	请求体过大，比如超过了5kb，拆成几个更小的请求体重试即可
- 429	reach_limit	“This request has reached api limit”	超过接口每秒调用次数，加大调用间隔或者联系商务调整限流大小
- 500	no_full_text_index	“Entity ‘user’ with property named ‘username’ is not full text indexed. You cannot use the ‘contains’ operand on this field”	username不支持全文索引，不可以对该字段进行contains操作
- 500	unsupported_service_operation	“Service operation not supported”	请求方式不被发送请求的URL支持
- 500	web_application	“javax.ws.rs.WebApplicationException”	错误的请求，给一个未提供的API发送了请求