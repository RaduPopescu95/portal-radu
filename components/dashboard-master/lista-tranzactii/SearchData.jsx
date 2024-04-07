import React from 'react';

const SearchData = () => {
  const rowsData = [
    { title: 'List London', date: 'December 30, 2019' },
    { title: 'Property List New York', date: 'December 30, 2019' },
    { title: 'London 3 beds', date: 'December 30, 2019', active: true },
    { title: 'Paris $100-$100', date: 'December 30, 2019' },
    { title: 'Free', date: 'December 30, 2019' },
    { title: '$300-$900', date: 'December 30, 2019' },
  ];

  return (
    <table className="table">
      <thead className="thead-light">
        <tr>
          <th scope="col">Titlu oferta</th>
          <th className="dn-lg" scope="col">Tip oferta</th>
          <th scope="col"></th>
          <th className="dn-lg" scope="col">status</th>
          <th scope="col"></th>
          <th scope="col">Data</th>
          <th scope="col">Actiune</th>
        </tr>
      </thead>
      <tbody>
        {rowsData.map((row, index) => (
          <tr key={index} className={row.active ? 'title active' : 'title'}>
            <th scope="row">{row.title}</th>
            <td className="dn-lg"></td>
            <td className="dn-lg"></td>
            <td></td>
            <td></td>
            <td className="para">{row.date}</td>
            <td>
              <ul className="view_edit_delete_list mb0">
                <li className="list-inline-item" data-toggle="tooltip" data-placement="top" title="View">
                  <a href="#">
                    <span className="flaticon-view"></span>
                  </a>
                </li>
                <li className="list-inline-item" data-toggle="tooltip" data-placement="top" title="Edit">
                  <a href="#">
                    <span className="flaticon-edit"></span>
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
