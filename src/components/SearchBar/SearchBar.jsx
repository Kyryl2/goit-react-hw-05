import toast, { Toaster } from "react-hot-toast";
import s from "./SearchBar.module.css";
const SearchBar = ({ onSubmit }) => {
  const mySubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const topic = e.target.elements.query.value.trim();
    if (!topic.trim()) {
      toast.error("Будь ласка, введіть, що хочете знайти", {
        position: "top-right",
      });
      return;
    }
    onSubmit(topic);
    form.reset();
  };

  return (
    <header className={s.header}>
      <Toaster />
      <form onSubmit={mySubmit} className={s.form}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="query"
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
};

export default SearchBar;
