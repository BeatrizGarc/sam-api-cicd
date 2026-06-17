import assert from "node:assert";
import axios from "axios";

const URL = process.env.ApiUrl;

let d1 = { id: "1", name: "test1" };
let d2 = { id: "2", name: "test2" };

let r1 = await axios.post(URL, d1);

let r2 = await axios.post(URL, d2);

let res = await axios(URL);

// La respuesta GET tiene estructura {message, items, timestamp}
let expected = [d2, d1];
console.log("Response from GET /:", JSON.stringify(res.data, null, 2));
assert.deepStrictEqual(res.data.items, expected);

let URLItem1 = `${URL}1`;
let res1 = await axios(URLItem1);
console.log("Response from GET /1:", JSON.stringify(res1.data, null, 2));
assert.deepStrictEqual(res1.data, d1);

let URLItem2 = `${URL}2`;
let res2 = await axios(URLItem2);
console.log("Response from GET /2:", JSON.stringify(res2.data, null, 2));
assert.deepStrictEqual(res2.data, d2);

console.log("✅ Todos los tests de integración pasaron!");
