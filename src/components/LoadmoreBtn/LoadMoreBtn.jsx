function LoadMoreBtn({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="button"
      style={{ display: "block", margin: "0 auto" }}
    >
      Load more
    </button>
  );
}

export default LoadMoreBtn;
