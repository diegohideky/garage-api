import {createConnection, getConnection} from 'typeorm';
import { Car } from '../models/Car';
import { Marker } from '../models/Marker';

const connection = {
  async create(){
    await createConnection();
  },

  async close(){
    await getConnection().close(); 
  },

  async clear(){
    const connection = await getConnection();

    return Promise.all([Marker, Car].map(async (entity) => {
      const repository = connection.getRepository(entity.name);
      return repository.delete({})
    }))
  },
};
export default connection;
