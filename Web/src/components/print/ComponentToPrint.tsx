import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Button } from "react-bootstrap";
import _ from "lodash";
import colors from "../../config/colors";
import axios from "axios";
import { API } from "../../axios/swr/endpoint";
import configAxios from "../../axios/configAxios";
import PrintableTable from "./PrintableTable";

export const ComponentToPrint = ({ checkedData }: { checkedData: any }) => {
  const contentToPrint = useRef(null);
  const [data, setData] = React.useState<any>([]);
  const handlePrint = useReactToPrint({
    documentTitle: "Print This Document",
    onBeforePrint: () => console.log("before printing..."),
    onAfterPrint: () => console.log("after printing..."),
    removeAfterPrint: true,
  });

  const printCheckBox = async (checkeds: any) => {
    if (!checkeds) {
      return;
    }
    // filter only id that checked is true
    const filterIds = checkeds
      .filter((item: any) => item.click)
      .map((item: any) => item.id);

    // const result = await configAxios("post", "/api/qr/print", checkeds);
    const result = await axios(
      configAxios("post", API.getItemsByIds, {
        ids: filterIds,
      })
    );

    console.log(result);
    //! this function will filter by same categories and list by code id
    const orderFilterData = () => {
      const { data } = result;

      let categories = data.map((item: any) => {
        return {
          categoryName: item.category.name,
          categoryId: item.category.cate_id,
        };
      });

      //filter only unique category id
      categories = _.uniqBy(categories, "categoryId");

      //loop by category and filter by category id
      const filterData = categories.map((category: any) => {
        const listData = data.filter(
          (item: any) => item.category.cate_id === category.categoryId
        );

        return {
          categories: category.categoryName,
          count: listData.length,
          listData: listData,
        };
      });

      return filterData;
    };

    const filterData = orderFilterData();
    await setData(filterData)

    console.log(JSON.stringify(filterData));

    handlePrint(null, () => contentToPrint.current);
  };

  return (
    <>
      <div style={{ display: "", width:"100%" }} className="hidden">
        <div ref={contentToPrint}>
          <PrintableTable data={data} />
        </div>
      </div>
      <Button
        style={{ color: colors.black }}
        className="m-2"
        size="lg"
        variant={"outline-primary"}
        onClick={() => {
          printCheckBox(checkedData);
        }}
      >
        สั่งพิมพ์
      </Button>
    </>
  );
};
