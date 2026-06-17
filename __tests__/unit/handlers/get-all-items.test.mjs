// Import getAllItemsHandler function from get-all-items.mjs
import { getAllItemsHandler } from "../../../src/handlers/get-all-items.mjs";
// Import dynamodb from aws-sdk
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { mockClient } from "aws-sdk-client-mock";

// This includes all tests for getAllItemsHandler()
describe("Test getAllItemsHandler", () => {
  const ddbMock = mockClient(DynamoDBDocumentClient);

  beforeEach(() => {
    ddbMock.reset();
  });

  it("should return ids", async () => {
    const items = [{ id: "id1" }, { id: "id2" }];

    // Return the specified value whenever the spied scan function is called
    ddbMock.on(ScanCommand).resolves({
      Items: items,
    });

    const event = {
      httpMethod: "GET",
    };

    // Invoke helloFromLambdaHandler()
    const result = await getAllItemsHandler(event);

    // Verify the response structure
    expect(result.statusCode).toBe(200);
    expect(result.headers["Access-Control-Allow-Headers"]).toBe("Content-Type");
    expect(result.headers["Access-Control-Allow-Origin"]).toBe("*");
    expect(result.headers["Access-Control-Allow-Methods"]).toBe("GET");
    
    // Parse the body to check the response structure
    const bodyParsed = JSON.parse(result.body);
    expect(bodyParsed).toHaveProperty("message");
    expect(bodyParsed).toHaveProperty("items");
    expect(bodyParsed).toHaveProperty("timestamp");
    expect(bodyParsed.items).toEqual(items);
  });
});
