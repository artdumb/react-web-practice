import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import axios from "axios";
function PostCard(props) {
  const [comment, setComment] = React.useState("");
  const [reviews, setReview] = React.useState("");

  React.useEffect(() => {
    axios
      //grab-market-server의 링크로 내가만든서버와 http통신
      .get("http://127.0.0.1:8000/api/review/" + props.id)
      .then((res) => setReview(res.data))
      .catch(function (error) {
        console.error("에러발생 :", error);
      });
  }, [comment, reviews]);

  console.log(reviews);

  //------------------서버에 post 요청보내기----------------------
  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://127.0.0.1:8000/api/review/" + props.id, {
        method: "POST",
        body: JSON.stringify({
          comment: comment,
          post_id: props.id,
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
  return (
    <div class='row'>
      <div class='card'>
        <div class='card-header'>{props.title}</div>
        <div class='card-body'>
          <h5 class='card-title'> {props.content}</h5>
          <hr></hr>
          <ul class='list-group list-group-flush'>
            {reviews.length < 2 ? (
              <p>댓글이 없습니다.</p>
            ) : (
              reviews.map((review) => {
                return <li class='list-group-item'>{review.comment}</li>;
              })
            )}
          </ul>
          <form onSubmit={handleSubmit}>
            <p>
              <input
                type='text'
                name='comment'
                placeholder='댓글을 입력'
                onChange={(e) => setComment(e.target.value)}
              />
              <input type='submit' value='댓글 등록'></input>
            </p>
            <p></p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
