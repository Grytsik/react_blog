export default function UserPhotos({ props, className }) {
  return (
    <>
      <img
        className={className}
        src={props.author.img}
        alt={props.author.name}
      />
    </>
  );
}
