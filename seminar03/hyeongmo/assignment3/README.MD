# 3차 과제

# Level1
Blog 테이블을 만들고(칼럼은 각자 생각)
CRUD를 구현할 것.
[GET]/blogs [POST]/blogs [PUT]/blogs [DELETE]/blogs
# Level2
Article 테이블을 만들고(칼럼은 각자 생각해서 구현할 것)
CRUD를 구현할 것.
이때 article에는 blogIdx 칼럼 포함
[GET]/blogs/${blogIdx}/articles
[POST]/blogs/${blogIdx}/articles
[PUT]/blogs/${blogIdx}/articles
[DELETE]/blogs/${blogIdx}/articles
# Level3
Comment 테이블을 만들고(칼럼은 각자 생각)
CRUD를 구현할 것.
이때 comment에는 articleIdx 칼럼 포함
[GET]/blogs/${blogIdx}/articles/${articleIdx}/comments
[POST]/blogs/${blogIdx}/articles/${articleIdx}/comments
[PUT]/blogs/${blogIdx}/articles/${articleIdx}/comments
[DELETE]/blogs/${blogIdx}/articles/${articleIdx}/comments
ec2 서버 주소 및 github repository 주소로 제출 (api 주소는 지켜주세요!)