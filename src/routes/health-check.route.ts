import { NextFunction, Request, Response, Router } from 'express';

const router = Router();
//Endpoint for healthchecking server
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    status: 'ok',
  });
});

router.post('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    status: 'ok',
  });
});

export default router;
