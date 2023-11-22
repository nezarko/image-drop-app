const Suspence = ({ show }) => {
  return (
    <>
      {show && (
        <div className="suscpence">
          <h3>Loading</h3>
        </div>
      )}
    </>
  );
};

export default Suspence;
