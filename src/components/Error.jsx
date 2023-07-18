function Error({ message = "Something went wrong" }) {
  return (
    <div className="aux-container error-container">
      <p className="error">{message}</p>
      <i className="fa-solid fa-heart-crack"></i>
    </div>
  );
}

export default Error;
