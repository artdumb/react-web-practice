import "bootstrap/dist/css/bootstrap.css";
import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function UploadPage() {
  const history = useHistory();

  const [Title, setTitle] = useState("");
  const [Content, setContent] = useState("");

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://127.0.0.1:8000/api/post/", {
        method: "POST",
        body: JSON.stringify({
          content: Title,
          title: Content,
        }),
      });
      let resJson = await res.json();
      if (res.status === 200) {
      } else {
      }
    } catch (err) {
      console.log(err);
    }
  };
  const style1 = {
    backgroundColor: "LightGray",
  };
  return (
    <div style={style1}>
      <h1>게시물 업로드</h1>
      <form onSubmit={handleSubmit}>
        <p>
          <input
            type='text'
            name='titlee'
            placeholder='제목입력'
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type='text'
            name='contentt'
            placeholder='내용입력'
            onChange={(e) => setContent(e.target.value)}
          />
          <input
            type='submit'
            value='글등록'
            onClick={function () {
              //history.pusy로 경로이동가능
              history.push("/");
              history.go(0);
            }}
          ></input>
        </p>
        <p></p>
      </form>
    </div>
  );
}

export default UploadPage;
