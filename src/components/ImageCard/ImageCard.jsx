import s from "./ImageCard.module.css";
const ImageCard = ({ src, alt, item, onBig }) => {
  return (
    <div className={s.wrapper}>
      <img onClick={() => onBig(item)} src={src} alt={alt} className={s.img} />
    </div>
  );
};

export default ImageCard;
