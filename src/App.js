import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import PostCard from "./postcard";
import UploadPage from "./upload";
import { Route, Switch, Link } from "react-router-dom";

import axios from "axios";

function App() {
  const [posts, setPosts] = React.useState("");
  const style2 = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  React.useEffect(() => {
    axios
      //grab-market-server의 링크로 내가만든서버와 http통신
      .get("http://127.0.0.1:8000/api/listpost/")
      .then((res) => setPosts(res.data))
      .catch(function (error) {
        console.error("에러발생 :", error);
      });
  }, []);

  if (posts.length < 2) {
    //함수종료가 되면 밑에가 실행하지 않는다.
    //통신완료하면 이구문 실행안한다 -->오류피해가기
    return <h1>상품정보를 받고있습니다...</h1>;
  }

  return (
    <div>
      <nav class='navbar navbar-light bg-light'>
        <div class='container-fluid' style={style2}>
          <Link to='/upload'>
            <a class='navbar-brand' href='#'>
              게시판-댓글기능 서버-웹 연습
            </a>
          </Link>
        </div>
      </nav>
      <div class='container gap-3'>
        <Switch>
          <Route exact={true} path='/'></Route>
          <Route exact={true} path='/upload'>
            <UploadPage />
          </Route>
        </Switch>

        {posts.map((post) => {
          return (
            <div>
              <PostCard
                id={post.id}
                title={post.title}
                content={post.content}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
