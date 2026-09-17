import { Router, type IRouter } from "express";

import healthRouter from "./health";
import agentRouter from "./agent";
import authRouter from "./auth";
import sectionsRouter from "./sections";

const router: IRouter = Router();

router.use(healthRouter);
router.use(agentRouter);
router.use(authRouter);
router.use(sectionsRouter);

export default router;
