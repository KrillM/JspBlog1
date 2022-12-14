let index = {
    init: function(){
        $("#btn-save").on("click", ()=>{
            this.save();
        });
        $("#btn-update").on("click", ()=>{ // function(){} , ()=>{} this를 바인딩하기 위해서!!
            this.update();
        });
    },
    save: function(){
        // alert('자바스크립트 테스트');
        let data={
            username: $("#username").val(),
            email: $("#email").val(),
            password: $("#password").val()
        };
        // console.log(data); 값이 제대로 들어오는지 확인
        //크롬에서 f12->console로 들어가면 확인 가능!

        // ajax 호출시 default가 비동기 호출
        // ajax통신을 이용해 3개의 데이터를 json으로 변경하여 insert 요청
        // ajax가 통신을 성공하고 json을 리턴해주면 server가 자동으로 자바오브젝트로 변환해준다
        $.ajax({
            type:"POST",
            url:"/auth/joinProc",
            data:JSON.stringify(data), // http body 데이터
            contentType:"application/json; charset=utf-8", // body 데이터가 어떤 타입인지(MINE)
            dataType:"json" // 요청을 서버로해서 응답이 왔을때 기본적으로 모든 것이 문자열(생긴세 json이라면) => javascript 오브젝트로 변경
        }).done(function(resp){
            if(resp.status === 500){
                alert("이미 가입된 회원입니다");
            }else{
                alert("회원가입이 완료되었습니다");
                location.href = "/";
            }
        }).fail(function(error){
            alert(JSON.stringify(error));
        });
    },
    update: function(){
        let data = {
            id: $("#id").val(),
            username: $("#username").val(),
            password: $("#password").val(),
            email: $("#email").val()
        };

        $.ajax({
            type: "PUT",
            url: "/user",
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        }).done(function(resp){
            alert("회원수정이 완료되었습니다.");
            location.href = "/";
        }).fail(function(error){
            alert(JSON.stringify(error));
        });

    }
}
index.init();