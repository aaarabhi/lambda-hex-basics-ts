import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";
import { Repository } from "../../port/repository";
import { Stock } from "../../domain/types";

const DB_TABLE: string = process.env.DB_TABLE || "stock";

const client: DynamoDBClient = new DynamoDBClient({});
const docClient: DynamoDBDocumentClient = DynamoDBDocumentClient.from(client);

export default class StockDynamoDb implements Repository {
    public async getStockData(stockID: string = "AMZN"): Promise<Stock> {
        let params = {
            TableName: DB_TABLE,
            Key: {
                'STOCK_ID': stockID
            }
        }
    
        const command = new GetCommand(params);
    
        try {
            const stockData = await docClient.send(command);
            return {
                id: stockData.Item?.STOCK_ID,
                value: stockData.Item?.VALUE
            }
        }
        catch (err) {
            console.log(err)
            throw err
        }
    }
}