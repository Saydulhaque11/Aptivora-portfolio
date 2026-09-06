import { Router, type IRouter } from "express";
import healthRouter from "./health";
import contactRouter from "./contact";
import agentRouter from "./agent";

const router: IRouter = Router();

router.use(healthRouter);
router.use(contactRouter);
router.use(agentRouter);

export default router;
