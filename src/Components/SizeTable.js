import React from "react";
import "../Style/SizeTable.css";

const SizeTable = () => {
  return (
    <div className="size-table">
      <h3 style={{ fontFamily: "Noto Sans Hebrew", direction: "rtl" }}>
        טבלת מידות:
      </h3>
      <table>
        <thead>
          <tr>
            <th style={{ fontFamily: "Noto sans Hebrew" }}>גודל</th>
            <th style={{ fontFamily: "Noto sans Hebrew" }}>אורך</th>
            <th style={{ fontFamily: "Noto sans Hebrew" }}>רוחב</th>
            <th style={{ fontFamily: "Noto sans Hebrew" }}>גובה</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1:64</td>
            <td>5 - 7.5cm</td>
            <td>2 - 2.5cm</td>
            <td>1.25 - 2cm</td>
          </tr>
          <tr>
            <td>1:32</td>
            <td>12.5 - 15cm</td>
            <td>3.75 - 5cm</td>
            <td>2.5 - 3.75cm</td>
          </tr>
          <tr>
            <td>1:24</td>
            <td>17.5 - 20cm</td>
            <td>6.25 - 7.5cm</td>
            <td>5 - 6.25cm</td>
          </tr>
          <tr>
            <td>1:18</td>
            <td>22.5 - 27.5cm</td>
            <td>8.75 - 11.25cm</td>
            <td>7.5 - 8.75cm</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SizeTable;
