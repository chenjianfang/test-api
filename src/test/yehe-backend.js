const baseURL = 'http://test.api.qcintl.tencentyun.com/yehe-backend-productintro/v1';

exports.getLangConfig = () => {
  const path = '/GetLangConfig';
  const method = 'GET';
  const expectType = 'prop'; // 1、prop：属性值类型比较
  const expectData = {
    code: 0,
    data: {
      list: [
        {
          "flag":4,
          "isDefault":true,
          "subfix":"fr",
          "desc":"英文",
          "enable":true,
        }
      ]
    }
  };

  return {
    path,
    method,
    baseURL,
    expectType,
    expectData
  }
}

exports.getProduct = () => {
  const path = '/GetProduct';
  const method = 'GET';
  const expectType = 'prop'; // 1、prop：属性值类型比较
  const expectData = {
    code: 0,
    data: {
      list: [
        {
          createTime: "2021-07-14 18:06:16",
          creator: "yuebiaochen",
          depth: "2",
          description: "????",
          extra: "",
          hotrep: "intl.product.cvm",
          icon: "",
          id: 2,
          lang: "13",
          langRelated: "",
          name: "cvm",
          path: "[0]-[1]",
          pid: 1,
          redirectUrl: "https://www.bilibili.com/",
          remark: "",
          status: "1",
          target: "_self",
          type: "item",
          updateTime: "2021-07-14 18:06:16",
          updator: "sonicsun",
          weight: 100
        }
      ]
    }
  };

  return {
    path,
    method,
    baseURL,
    expectType,
    expectData
  }
}

// exports.addProduct = () => {
//   const path = '/AddOrUpdateProduct';
//   const method = 'POST';
//   const params = {
//     depth: 1,
//     description: "",
//     hotrep: "testadd",
//     lang: 1,
//     langRelated: '{\"title_en\":\"testadd\",\"content_en\":\"testadd\"}',
//     name: "testadd",
//     path: "[0]",
//     pid: 0,
//     status: "0",
//     target: "_blank",
//     type: "item",
//     weight: 0,
//   };
//   const expectType = 'prop'; // 1、equal：完全相等
//   const expectData = {
//     code: 0
//   };
//
//   return {
//     path,
//     method,
//     params,
//     baseURL,
//     expectType,
//     expectData
//   }
// }


exports.updateProduct = () => {
  const immutable = {
    data: exports.getProduct,
    where: {
      id: 213
    },
    params: {}
  }

  const path = '/AddOrUpdateProduct';
  const method = 'POST';
  const params = {
    description: "w",
    hotrep: "te",
    id: 213,
    lang: 1,
    langRelated: '{\"title_en\":\"testadd\",\"content_en\":\"testadd\"}',
    name: "testaddca",
    status: "0",
    target: "_blank",
    type: "item",
    weight: 1,
  };
  const expectType = 'prop'; // 1、prop：属性值类型比较
  const expectData = {
    code: 0,
  };

  return {
    path,
    method,
    params,
    baseURL,
    expectType,
    expectData,
    immutable
  }
}