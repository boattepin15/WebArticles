import React from "react";

const PrintableTable = ({ data }: any) => {
  return (
    <div className="p-4 font-serif w-full">
      <div
        className="text-center mb-4"
        style={{
          width: "100%",
        }}
      >
        <img
          src="/logo.png"
          alt="University Logo"
          className="h-12 mx-auto mb-2"
        />
        <h1 className="text-xl font-bold">มหาวิทยาลัยเทคโนโลยีธรรมศาสตร์</h1>
        <h2 className="text-lg font-bold mt-2">
          ทะเบียนครุภัณฑ์ / เครื่องมือ / อุปกรณ์
        </h2>
        <h3 className="mt-1">ประจำห้องปฏิบัติการ ห้อง 321 อาคาร 3</h3>
        <h3>ผู้รับผิดชอบ อาจารย์ประสาน เนืองทาน</h3>
        <h3>ประจำภาคเรียนที่ 2 ปีการศึกษา 2565</h3>
      </div>

      <table className="w-full border-collapse border border-gray-800" style={{
          width: "100%",
        }}>
        <thead>
          <tr>
            <th className="border border-gray-800 p-1 w-16 text-center" rowSpan={2}>
              ลำดับที่
            </th>
            <th className="border border-gray-800 p-1 text-center" rowSpan={2}>
              รายการ
            </th>
            <th className="border border-gray-800 p-1 w-20 text-center" rowSpan={2}>
              จำนวน
            </th>
            <th className="border border-gray-800 p-1 text-center text-center" colSpan={2}>
              สภาพ
            </th>
            <th className="border border-gray-800 p-1 w-32 text-center" rowSpan={2}>
              หมายเหตุ
            </th>
          </tr>
          <tr>
            <th className="border border-gray-800 p-1 w-20 text-center">ปกติ</th>
            <th className="border border-gray-800 p-1 w-20 text-center">ชำรุด</th>
          </tr>
        </thead>
        <tbody>
          {data.map((category: any, categoryIndex: number) => (
            <React.Fragment key={categoryIndex}>
              <tr>
                <td className="border border-gray-800 p-2 text-center">
                  {categoryIndex + 1}
                </td>
                <td className="border border-gray-800 p-2 font-bold">
                  {category.categories}
                </td>
                <td className="border border-gray-800 p-2 text-center">
                  {category.count}
                </td>
                <td className="border border-gray-800 p-2"></td>
                <td className="border border-gray-800 p-2"></td>
                <td className="border border-gray-800 p-2"></td>
              </tr>
              {category.listData.map((item: any, itemIndex: number) => (
                <tr key={`${categoryIndex}-${itemIndex}`}>
                  <td className="border border-gray-800 p-2"></td>
                  <td className="border border-gray-800 p-2 pl-4">
                    {item.code}
                  </td>
                  <td className="border border-gray-800 p-2"></td>
                  <td className="border border-gray-800 p-2 text-center">
                    {item.status_item ? "✓" : ""}
                  </td>
                  <td className="border border-gray-800 p-2 text-center">
                    {!item.status_item ? "✓" : ""}
                  </td>
                  <td className="border border-gray-800 p-2">
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <div className="text-right mt-2 text-sm">
        <p>FM31-02</p>
        <p>หน้าที่ 1/1</p>
        <p>ISSUE : 1</p>
        <p>วันที่บังคับใช้ : 1 มิ.ย. 54</p>
      </div>
    </div>
  );
};

export default PrintableTable;
