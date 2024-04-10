import React from 'react';

const SearchData = () => {


  const activities = [
    {
      id: 1,
      numePartener:"Nume partener",
      numeUtilizator:"Popescu Adrian",
      message: "Primiti 20% discount la produsul xyz.",
      tipOferta:"Oferta specifică",
      date:"30-12-2023",
      status:"confirmata"
    },
    {
      id: 2,
      numePartener:"Nume partener",
      numeUtilizator:"Popescu Adrian",
      message: " Meniu special de seară la doar 50€ pentru doi.",
      tipOferta:"Oferta specifică",
      date:"30-12-2023",
      status:"confirmata"
    },
    {
      id: 3,
      numePartener:"Nume partener",
      numeUtilizator:"Popescu Adrian",
      message: "Pachet weekend la munte pentru doi la prețul fix de 200€",
      tipOferta:"Oferta cu discount procentual general",
      date:"30-12-2023",
      status:"confirmata"
    },
  ];

  return (
    <table className="table">
      <thead className="thead-light">
        <tr>
          <th scope="col">Titlu oferta</th>
          <th scope="col">Tip oferta</th>
          <th scope="col">Nume partener</th>
          <th scope="col">Nume utilizator</th>
          <th scope="col">status</th>
          <th scope="col">Data</th>
          <th scope="col">Actiune</th>
        </tr>
      </thead>
      <tbody>
        {activities.map((row, index) => (
          <tr key={index} className={row.active ? 'title active' : 'title'}>
            <td className="para">{row.message}</td>
            <td className="para">{row.tipOferta}</td>
            <td className="para">{row.numePartener}</td>
            <td className="para">{row.numeUtilizator}</td>
            <td className="para">{row.status}</td>
            <td className="para">{row.date}</td>
            <td>
              <ul className="view_edit_delete_list mb0">
                <li className="list-inline-item" data-toggle="tooltip" data-placement="top" title="View">
                  <a href="/confirma-tranzactie">
                    <span className="flaticon-view"></span>
                  </a>
                </li>
                <li className="list-inline-item" data-toggle="tooltip" data-placement="top" title="Delete">
                  <a href="#">
                    <span className="flaticon-garbage"></span>
                  </a>
                </li>
              </ul>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SearchData;
