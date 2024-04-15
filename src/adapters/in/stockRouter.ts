import express, { Request, Response } from "express";
import StockService from "../../domain/stockLogic";
import StockDynamoDb from "../out/stockDynamoRepo";
import { CurrencyHandler } from "../out/currencyConverter";

const stockRouter = express.Router();
const stockService = new StockService(new StockDynamoDb(), new CurrencyHandler());

// Sample hello route
// Get all users
stockRouter.get("/:stockId", async (req: Request, res: Response) => {
  const stockId = req.params.stockId;
  console.log(`inside stock router, getting stock for stockId :: ${stockId}`);

  const stockResult = await stockService.getStockWithCurrencies(stockId);

  res.status(200).json(stockResult);
});

export default stockRouter;