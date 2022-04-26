import { DataSource } from 'typeorm';
import { dbConfig } from '../config/index.js';

const AppDataSource = new DataSource(dbConfig);

export default AppDataSource;