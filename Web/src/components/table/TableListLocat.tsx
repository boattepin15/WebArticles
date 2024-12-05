import _ from "lodash";
import { useNavigate } from "react-router-dom";
import { Table, Button, Card } from "react-bootstrap";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { GetKanitFont } from "../../config/fonts";
import { useEffect, useState } from "react";
import colors from "../../config/colors";
import Swal from "sweetalert2";
import axios from "axios";
import configAxios from "../../axios/configAxios";
import { API } from "../../axios/swr/endpoint";
import checkToken from "../../config/checkToken";
/*
Faculty
Department
Building
Location
*/

function TableListLocat(props: any) {
  const { itemList, editPage, isPage } = props;
  const navigate = useNavigate();

  const navigatePage = (idItem?: any, item?: any) => {
    navigate(editPage, { state: { id: idItem, item: item } });
  };

  const handleDelete = async (id: any, name: string) => {
    const result = await Swal.fire({
      title: 'ยืนยันการลบ?',
      text: `คุณต้องการลบ ${name} ใช่หรือไม่?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'ลบ',
      cancelButtonText: 'ยกเลิก'
    });

    if (result.isConfirmed) {
      try {
        let deleteAPI = '';
        if (isPage === "f") {
          deleteAPI = API.deleteFaculty;
        } else if (isPage === "d") {
          deleteAPI = API.deleteDepartment;
        } else if (isPage === "b") {
          deleteAPI = API.deleteBuilding;
        } else if (isPage === "l") {
          deleteAPI = API.deleteLocation;
        }
        
        const res = await axios(configAxios("post", deleteAPI, { id }));
        if (res.data.status === 1) {
          Swal.fire('สำเร็จ', 'ลบข้อมูลเรียบร้อยแล้ว', 'success');
          window.location.reload();
        }
      } catch (error: any) {
        checkToken(error.response?.data?.status, error.request?.status, navigate);
      }
    }
  };

  const [getProfile, setGetProfile] = useState<any>({});
  // console.log(getProfile.departmentDId);

  useEffect(() => {
    let profile: any = localStorage.getItem("Profile");
    profile = JSON.parse(profile);
    setGetProfile(profile);
  }, []);

  return (
    <div style={{ margin: 30 }}>
      <Card
        style={{
          width: "100%",
          // height: 250,
          display: "flex",
          overflow: "auto",
        }}
      >
        <Card.Header>
          <div className="d-flex justify-content-end">
            รายการที่แสดง {itemList.length} รายการทั้งหมด {itemList.length}
          </div>
        </Card.Header>
        <Table
          style={{ paddingTop: 50, textAlign: "center", fontSize: 20 }}
          responsive="sm"
          // striped
          bordered
          hover
        >
          {/*  */}
          <thead style={{ ...GetKanitFont("KanitMedium") }}>
            <tr>
              <th>แก้ไข</th>
              <th>ลำดับ</th>
              <th>ชื่อ(ไทย)</th>
              <th>ชื่อ(อังกฤษ)</th>
              {isPage == "d" && (
                <>
                  <th>ชื่อ(คณะ)</th>
                </>
              )}
              {isPage == "b" && (
                <>
                  <th>ชื่อ(คณะ)</th>
                  <th>ชื่อ(สาขา)</th>
                </>
              )}
              {isPage == "l" && (
                <>
                  <th>ชื่อ(คณะ)</th>
                  <th>ชื่อ(สาขา)</th>
                  <th>ชื่อ(ตึก)</th>
                  <th>ชั้น</th>
                </>
              )}
            </tr>
          </thead>
          {/*  */}
          <tbody style={{ fontSize: 18 }}>
            {_.map(itemList, (item, idx: string) => {
              return (
                <tr key={idx}>
                  <td>
                    <div className="d-flex gap-2 justify-content-center">
                      <Button
                        variant="warning"
                        onClick={() => {
                          let getId: any;
                          if (isPage === "f") {
                            getId = item.f_id;
                          } else if (isPage === "d") {
                            getId = item.d_id;
                          } else if (isPage === "b") {
                            getId = item.b_id;
                          } else if (isPage === "l") {
                            getId = item.l_id;
                          }

                          navigatePage(getId, item);
                        }}
                      >
                        <AiFillEdit color={colors.black} size={20} />
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(
                          isPage === "f" ? item.f_id : 
                          isPage === "d" ? item.d_id : 
                          isPage === "b" ? item.b_id : 
                          item.l_id,
                          item.nameTH
                        )}
                      >
                        <AiFillDelete color={colors.white} size={20} />
                      </Button>
                    </div>
                  </td>
                  <td>{idx + 1}</td>
                  <td>{item.nameTH}</td>
                  <td>{item.nameEN}</td>
                  {isPage == "d" && (
                    <>
                      <td>{item.faculty.nameTH}</td>
                    </>
                  )}
                  {isPage == "b" && (
                    <>
                      <td>{item.faculty.nameTH}</td>
                      <td>{item.department.nameTH}</td>
                    </>
                  )}
                  {isPage == "l" && (
                    <>
                      <td>{item.faculty.nameTH}</td>
                      <td>{item.department.nameTH}</td>
                      <td>{item.building.nameTH}</td>
                      <td>{item.floor}</td>
                    </>
                  )}
                </tr>
              );
            })}
          </tbody>
          {/*  */}
        </Table>
        <Card.Footer>
          <div className="d-flex justify-content-end">
            {itemList.length} / {itemList.length}
          </div>
        </Card.Footer>
      </Card>
    </div>
  );
}

export default TableListLocat;
