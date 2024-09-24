import React from "react";
import moment from "moment";

const PrintableInventoryTable = ({ data }: { data: any[] }) => {
  return (
    <div className="font-serif w-full text-sm p-1">
      <table className="w-full border-collapse border border-gray-800">
        <thead>
          <tr>
            <th
              className="border border-gray-800 font-bold text-center"
              colSpan={12}
            >
              รายการครุภัณฑ์ ประจำปีงบประมาณ 2567
            </th>
          </tr>
          <tr>
            <th className="border border-gray-800 text-center" colSpan={12}>
              สาขาวิชาวิศวกรรมคอมพิวเตอร์ มหาวิทยาลัยเทคโนโลยีราชมงคลอีสาน
              วิทยาเขตขอนแก่น
            </th>
          </tr>
          <tr>
            <th className="border border-gray-800 text-center" colSpan={12}>
              ณ วันที่ 30 กันยายน 2567
            </th>
          </tr>
          <tr>
            <th className="border text-center" rowSpan={2}>
              ที่
            </th>
            <th className="border text-center" rowSpan={2}>
              หน่วยงาน
            </th>
            <th className="border text-center" rowSpan={2}>
              วันที่ซื้อ
            </th>
            <th className="border text-center" rowSpan={2}>
              หมายเลขครุภัณฑ์
            </th>
            <th className="border text-center" rowSpan={2}>
              รายการ
            </th>
            <th className="border text-center" rowSpan={2}>
              จำนวน/หน่วยนับ
            </th>
            <th className="border text-center" rowSpan={2}>
              ราคาต่อหน่วย
            </th>
            <th className="border text-center" rowSpan={2}>
              ราคารวม
            </th>
            <th className="border text-center" colSpan={2}>
              สภาพ
            </th>
            <th className="border text-center" rowSpan={2}>
              สถานที่เก็บ/ใช้งาน
            </th>
            <th className="border text-center" rowSpan={2}>
              หมายเหตุ
            </th>
          </tr>
          <tr>
            <th className="border text-center">ปกติ</th>
            <th className="border text-center">ชำรุด</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: any, index: number) => {
            return (
              <>
                <tr key={index}>
                  <th
                    className="border text-center text-center font-bold"
                    colSpan={12}
                  >
                    {item.branch}
                  </th>
                </tr>
                {item.list.map((itemData: any, indexData: number) => (
                  <tr key={indexData}>
                    <td className="border border-gray-800">{indexData + 1}</td>
                    <td className="border border-gray-800">
                      {itemData.department}
                    </td>
                    <td className="border border-gray-800">
                      {moment(itemData.purchaseDate).format("DD/MM/YYYY")}
                    </td>
                    <td className="border border-gray-800">
                      {itemData.inventoryNumber}
                    </td>
                    <td className="border border-gray-800">
                      {itemData.name}
                    </td>
                    <td className="border border-gray-800 text-center">
                      {itemData.quantity} {itemData.unit}
                    </td>
                    <td className="border border-gray-800 text-right">
                      {itemData.unitPrice.toLocaleString("th-TH", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="border border-gray-800 text-right">
                      {itemData.totalPrice.toLocaleString("th-TH", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="border border-gray-800 text-center">
                      {itemData.condition ? "✓" : ""}
                    </td>
                    <td className="border border-gray-800 text-center">
                      {!itemData.condition ? "✓" : ""}
                    </td>
                    <td className="border border-gray-800">
                      {itemData.location}
                    </td>
                    <td className="border border-gray-800">{itemData.notes}</td>
                  </tr>
                ))}
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PrintableInventoryTable;
