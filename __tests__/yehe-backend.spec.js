"use strict"

const { pactWith } = require("jest-pact")
const { Matchers } = require("@pact-foundation/pact")

const propTypeCompare = require('../src/utils/propTypeCompare');
const equalCompare = require('../src/utils/equalCompare');
const { host, port } = require('../config');
const http = require('../src/utils/http');
const testYeheBackend = require('../src/test/yehe-backend');


expect.extend({
  // 属性的类型对比
  propTypeCompare,
  equalCompare
});

async function normalTask({
  path,
  method,
  params,
  baseURL,
  expectType,
}) {
  const test_data = await http({
    method,
    url: path,
    baseURL: `http://${host}:${port}`
  });
  const prod_data = await http({
    method,
    url: path,
    params,
    baseURL
  });

  expect(test_data).propTypeCompare(prod_data);
}

const getImmutableData = async (fn) => {
  const {
    path,
    method,
    baseURL,
    params,
  } = fn();
  const data = await http({
    method,
    url: path,
    baseURL,
    params
  });
  return data;
};

async function dependenceTask({
  path,
  method,
  params,
  baseURL,
  expectType,
  immutable,
}) {
  const prevData = await getImmutableData(immutable.data);

  const test_data = await http({
    method,
    url: path,
    baseURL: `http://${host}:${port}`,
  });
  const prod_data = await http({
    method,
    url: path,
    baseURL,
    params
  });

  const currentData = await getImmutableData(immutable.data);

  expect(test_data).propTypeCompare(prod_data);
  expect(prevData).equalCompare(currentData, immutable.where);
}

pactWith(
  {
    consumer: "jest",
    provider: "yehe-backend",
    host,
    port
  },
  provider => {
    Object.entries(testYeheBackend).forEach(([fnName, fn]) => {
      const {
        path,
        method,
        params,
        baseURL,
        expectType,
        expectData,
        immutable,
      } = fn();

      describe('接口测试', () => {
        beforeEach(() => {
          const interaction = {
            uponReceiving: `${path}`,
            withRequest: {
              method,
              path
            },
            willRespondWith: {
              status: 200,
              body: expectData
            }
          }
          return provider.addInteraction(interaction)
        })


        test(`${path} 响应数据`, async () => {
          if (immutable) {
            await dependenceTask({
              path,
              method,
              params,
              baseURL,
              expectType,
              expectData,
              immutable,
            })
          } else {
            await normalTask({
              path,
              method,
              params,
              baseURL,
              expectType,
              expectData
            });
          }
        });
      })
    })
  }
)
