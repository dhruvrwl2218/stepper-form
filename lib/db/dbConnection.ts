import mongoose from 'mongoose';

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  // Check if we have a connection to the database or if it's currently connecting
  if (connection.isConnected) {
    console.log('Already connected to the database');
    return;
  }

  try {
    // Attempt to connect to the database
    const db = await mongoose.connect(process.env.MONGO_URI || '', {});

    connection.isConnected = db.connections[0].readyState;

    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);

    // Graceful exit in case of a connection error
    process.exit(1);
  }
}

export default dbConnect;


// import mongoose, { Connection } from 'mongoose';

// const MONGO_URI : string = process.env.MONGO_URI || '.' ;
// console.log(MONGO_URI)
// if(!MONGO_URI){
//     console.log("no uri..")
//    throw new Error('Define the mongo uri variable');
// }

// let cached = global.mongoose;

// if(!cached){
//     cached = global.mongoose = { conn : null ,promise : null};
// }

// async function dbConnect(){
//     if(cached.conn){
//         return cached.conn;
//     }

//     if(!cached.promise){    
//         const opts = {
//             bufferCommands :false,
//         }
//         console.log(MONGO_URI)
//         cached.promise = mongoose.connect(MONGO_URI, opts).then((mongooseInstance) => {
//         return mongooseInstance.connection as Connection;
//         })
//     }
//     cached.conn = await cached.promise;
//     return cached.conn;
// }
// export default dbConnect;