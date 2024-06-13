import bodyParser from 'body-parser';
import cors from 'cors';
import express, { NextFunction, Response } from 'express';
import { Request, expressjwt } from 'express-jwt';
import { each } from 'lodash';
import routes from './src/routes';

const port = 3000;

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api', expressjwt({
  secret: 'helloworld',
  algorithms: ['HS512'],
}).unless({
  path: [/^\/api\/login/]
}))

each(routes, route => {
  app.use(route.getRoute())
})

app.use((req, res) => {
  res.status(404).json({
    success: false,
    msg: '404'
  })
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      success: false,
      msg: err.name
    })
  }
  return res.status(500).json({
    success: false,
    msg: err.toString()
  })
})

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`)}
);
