const Activities = ({ actiuni }) => {
  return (
    <>
      {actiuni.map((activity, index) => (
        <div
          key={activity.id}
          className={`grid ${
            index === actiuni.length - 1 ? "mb0" : ""
          } d-flex justify-content-between`}
        >
          <ul
            className={`list-unstyled ${
              index === actiuni.length - 1 ? "pb0 mb0 bb_none" : ""
            }`}
          >
            <li className="list-inline-item">
              <div className="icon">
                <span className="flaticon-calendar"></span>
              </div>
            </li>
            <li className="list-inline-item">
              <p>
                {activity.firstUploadDate} {activity.firstUploadTime} -{" "}
                {activity.actionText}
              </p>
            </li>
          </ul>
          {/* Butonul adăugat aici */}
        </div>
      ))}
    </>
  );
};

export default Activities;
