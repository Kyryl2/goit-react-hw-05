import { useEffect, useState } from "react";
import SearchBar from "./SearchBar/SearchBar";
import fetchData from "../service/api";

import ImageGallery from "./ImageGallery/ImageGallery";
import Loader from "./Loader/Loader";
import ErrorMessage from "./ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./LoadmoreBtn/LoadMoreBtn";
import ImageModal from "./ImageModal/ImageModal";

const App = () => {
  const [value, setValue] = useState("");
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(false);

  const [loading, setLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [big, setBig] = useState("");
  const [total, setTotal] = useState("");

  useEffect(() => {
    if (!value) {
      return;
    }
    const getData = async () => {
      try {
        setLoading(true);
        setError(false);

        const {
          data: { results, total_pages },
        } = await fetchData(value, page);
        if (results.length) {
          setPhotos((prev) => [...prev, ...results]);
          setTotal(total_pages);
          setLoadMore(true);
        } else {
          setError(true);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [page, value]);

  // const handleSearch = async (query) => {
  //   try {
  //     setPhotos([]);
  //     setError(false);
  //     setLoading(true);
  //     setPage(2);
  //     const {
  //       data: { results, total_pages },
  //     } = await fetchData(query, page);
  //     setTotal(total_pages);
  //     setPhotos(results);
  //     setLoadMore(true);

  //     setValue(query);
  //   } catch (error) {
  //     setError(true);
  //     setLoadMore(false);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleChangePage = () => {
    setPage((prev) => prev + 1);
  };

  const handleSearch = (query) => {
    setValue(query);
    setPhotos([]);
    setPage(1);
  };

  const onCloseModal = () => {
    setIsModal(false);
  };
  const onOpenModal = () => {
    setIsModal(true);
  };
  const handleImageClick = (item) => {
    setBig(item.urls.regular);
    onOpenModal();
  };
  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      {error && <ErrorMessage />}
      {photos.length > 0 && (
        <ImageGallery items={photos} setBig={setBig} onBig={handleImageClick} />
      )}
      {photos.length > 0 && page < total && (
        <LoadMoreBtn onClick={() => handleChangePage()} />
      )}
      {loading && <Loader />}
      {isModal && (
        <ImageModal big={big} onClose={onCloseModal} onOpen={onOpenModal} />
      )}
    </div>
  );
};
export default App;
