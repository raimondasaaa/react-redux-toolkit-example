export const CompanyLogo = () => {
  return (
    <img
      src="./logo.svg"
      draggable="false"
      width={200}
      height={40}
      style={{
        filter: "brightness(0) invert(1) sepia(1) brightness(3)",
      }}
    />
  );
};
