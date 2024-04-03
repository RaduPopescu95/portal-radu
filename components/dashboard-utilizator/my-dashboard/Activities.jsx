const Activities = () => {
  const activities = [
    {
      id: 1,
      numePartener:"Nume partener",
      message: "Primiti 20% discount la produsul xyz.",
    },
    {
      id: 2,
      numePartener:"Nume partener",
      message: " Meniu special de seară la doar 50€ pentru doi.",
    },
    {
      id: 3,
      numePartener:"Nume partener",
      message: "Pachet weekend la munte pentru doi la prețul fix de 200€",
    },
  ];

  return (
    <>
      {activities.map((activity, index) => (
        <div key={activity.id} className={`grid ${index === activities.length - 1 ? 'mb0' : ''} d-flex justify-content-between`}>
        <ul className={`list-unstyled ${index === activities.length - 1 ? 'pb0 mb0 bb_none' : ''}`}>
          <li className="list-inline-item">
            <div className="icon">
              <span className="flaticon-profit"></span>
            </div>
          </li>
          <li className="list-inline-item">
            <h3>{activity.numePartener}</h3>
            <p>{activity.message}</p>
          </li>
        </ul>
        {/* Butonul adăugat aici */}
        <button type="button" className="btn btn-primary btn-smaller-height d-flex align-items-center justify-content-center">Adauga bon/factura</button>
      </div>
      ))}
    </>
  );
};

export default Activities;
