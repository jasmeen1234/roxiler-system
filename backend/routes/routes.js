import express from 'express'
import {productController}  from "../controller/productController.js"
import { transationController } from '../controller/transationsController.js';
import { statisticsController } from '../controller/statisticsController.js';
import { barchartController } from '../controller/barchartController.js';
import { piechartController } from '../controller/piechartController.js';
import { combinedController } from '../controller/combinedController.js';
const router=express.Router();

router.get("/api/products",productController);
router.get("/api/transations",transationController);
router.get("/api/statistics",statisticsController);
router.get("/api/barchart",barchartController);
router.get("/api/piechart",piechartController);
router.get("/api/combined",combinedController);
export default router;