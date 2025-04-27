import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(
        'mongodb+srv://renatodequeirozmarcondes:0yjor0zx9cc8VzRq@cluster0.fm8ft1w.mongodb.net/todo?retryWrites=true&w=majority&appName=Cluster0',
      ),
  },
];
