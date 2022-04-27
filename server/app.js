import express from 'express';
import morgan from 'morgan';
import fileUpload from 'express-fileupload';
import path, { join } from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import userRoutes from './routes/users.routes.js';
import { response } from 'express';

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  fileUpload({
    tempFileDir: './upload',
    useTempFiles: true,
  })
);

app.use(express.static(path.join(__dirname, '../client/build')));
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '../client/build/index.html'));
});

// Routes
app.use('/api', userRoutes);

export { app };
